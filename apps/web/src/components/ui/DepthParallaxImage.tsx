"use client";

import { useEffect, useRef, useState } from "react";

type DepthParallaxImageProps = {
  /** メイン画像（カラー写真） */
  src: string;
  /** 深度マップ（白=近い／黒=遠い、グレースケール）。未指定なら輝度から擬似深度を生成。 */
  depthSrc?: string;
  alt?: string;
  /** ラッパー要素の className */
  className?: string;
  /** 視差の最大変位量（UV比、0.02〜0.06 が自然） */
  strength?: number;
  /** カーソル追従の滑らかさ（0〜1、小さいほどぬるり） */
  smoothing?: number;
  /** object-cover の縦方向フォーカル位置 0〜1 (CSS object-position の Y%) */
  focalY?: number;
  /** object-cover の横方向フォーカル位置 0〜1 */
  focalX?: number;
  /** カーソルが画像内のみ反応するか。false の場合はビューポート全体で反応。 */
  scopeToElement?: boolean;
};

const VERT_SRC = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_image;
uniform sampler2D u_depth;
uniform bool u_hasDepth;
uniform vec2 u_mouse;
uniform float u_strength;
uniform float u_imageAspect;
uniform float u_canvasAspect;
uniform float u_focalX;
uniform float u_focalY;

vec2 coverUv(vec2 uv) {
  if (u_canvasAspect > u_imageAspect) {
    float visible = u_imageAspect / u_canvasAspect;
    uv.y = (uv.y - u_focalY) * visible + u_focalY;
  } else {
    float visible = u_canvasAspect / u_imageAspect;
    uv.x = (uv.x - u_focalX) * visible + u_focalX;
  }
  return uv;
}

float sampleDepth(vec2 uv) {
  if (u_hasDepth) {
    return texture(u_depth, uv).r;
  }
  // 擬似深度: 輝度ベース（明るい部分を「近い」と見なす）
  vec3 c = texture(u_image, uv).rgb;
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 uv = coverUv(v_uv);

  // 反復的にサンプル位置を精緻化（軽量2回）
  float d = sampleDepth(uv) - 0.5;
  vec2 par = u_mouse * u_strength * d;
  vec2 uv1 = uv - par;

  float d2 = sampleDepth(coverUv(v_uv + (uv1 - uv))) - 0.5;
  vec2 par2 = u_mouse * u_strength * d2;
  vec2 uv2 = uv - par2;

  outColor = texture(u_image, uv2);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile error: " + log);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  const prog = gl.createProgram();
  if (!prog) throw new Error("Failed to create program");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error("Program link error: " + log);
  }
  return prog;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function createTextureFromImage(
  gl: WebGL2RenderingContext,
  image: HTMLImageElement,
) {
  const tex = gl.createTexture();
  if (!tex) throw new Error("Failed to create texture");
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    image,
  );
  return tex;
}

export function DepthParallaxImage({
  src,
  depthSrc,
  alt = "",
  className,
  strength = 0.05,
  smoothing = 0.08,
  focalY = 0.5,
  focalX = 0.5,
  scopeToElement = false,
}: DepthParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackImgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    let disposed = false;
    let frameId = 0;
    let program: WebGLProgram | null = null;
    let imageTex: WebGLTexture | null = null;
    let depthTex: WebGLTexture | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;
    let imageAspect = 1;
    let hasDepth = false;

    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const setupGeometry = () => {
      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      const quad = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program!, "a_pos");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.bindVertexArray(null);
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const render = () => {
      if (disposed) return;
      currentMouse.x += (targetMouse.x - currentMouse.x) * smoothing;
      currentMouse.y += (targetMouse.y - currentMouse.y) * smoothing;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imageTex);
      gl.uniform1i(gl.getUniformLocation(program!, "u_image"), 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, depthTex ?? imageTex);
      gl.uniform1i(gl.getUniformLocation(program!, "u_depth"), 1);
      gl.uniform1i(gl.getUniformLocation(program!, "u_hasDepth"), hasDepth ? 1 : 0);

      gl.uniform2f(
        gl.getUniformLocation(program!, "u_mouse"),
        currentMouse.x,
        currentMouse.y,
      );
      gl.uniform1f(gl.getUniformLocation(program!, "u_strength"), strength);
      gl.uniform1f(
        gl.getUniformLocation(program!, "u_imageAspect"),
        imageAspect,
      );
      gl.uniform1f(
        gl.getUniformLocation(program!, "u_canvasAspect"),
        canvas.width / canvas.height,
      );
      gl.uniform1f(gl.getUniformLocation(program!, "u_focalX"), focalX);
      gl.uniform1f(gl.getUniformLocation(program!, "u_focalY"), focalY);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (reduceMotion) return;
      if (scopeToElement) {
        const r = wrapper.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        targetMouse.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
        targetMouse.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
      } else {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetMouse.x = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
        targetMouse.y = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
      }
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    (async () => {
      try {
        const image = await loadImage(src);
        if (disposed) return;
        imageAspect = image.naturalWidth / image.naturalHeight;

        let depthImage: HTMLImageElement | null = null;
        if (depthSrc) {
          try {
            depthImage = await loadImage(depthSrc);
          } catch {
            depthImage = null;
          }
        }
        if (disposed) return;

        program = createProgram(gl);
        setupGeometry();
        imageTex = createTextureFromImage(gl, image);
        if (depthImage) {
          depthTex = createTextureFromImage(gl, depthImage);
          hasDepth = true;
        }
        resize();
        setReady(true);
        if (!reduceMotion) {
          window.addEventListener("pointermove", onPointerMove, { passive: true });
        }
        // 静止状態でも1フレーム描画、reduceMotionでない場合はループ
        if (reduceMotion) {
          // 一度だけ描画して終了
          requestAnimationFrame(() => {
            if (!disposed) {
              gl.clearColor(0, 0, 0, 0);
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.useProgram(program);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, imageTex);
              gl.uniform1i(gl.getUniformLocation(program!, "u_image"), 0);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, depthTex ?? imageTex);
              gl.uniform1i(gl.getUniformLocation(program!, "u_depth"), 1);
              gl.uniform1i(gl.getUniformLocation(program!, "u_hasDepth"), hasDepth ? 1 : 0);
              gl.uniform2f(gl.getUniformLocation(program!, "u_mouse"), 0, 0);
              gl.uniform1f(gl.getUniformLocation(program!, "u_strength"), 0);
              gl.uniform1f(gl.getUniformLocation(program!, "u_imageAspect"), imageAspect);
              gl.uniform1f(gl.getUniformLocation(program!, "u_canvasAspect"), canvas.width / canvas.height);
              gl.uniform1f(gl.getUniformLocation(program!, "u_focalX"), focalX);
              gl.uniform1f(gl.getUniformLocation(program!, "u_focalY"), focalY);
              gl.bindVertexArray(vao);
              gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
          });
        } else {
          frameId = requestAnimationFrame(render);
        }
      } catch (err) {
        console.error("[DepthParallaxImage]", err);
        setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
      if (imageTex) gl.deleteTexture(imageTex);
      if (depthTex) gl.deleteTexture(depthTex);
      if (vbo) gl.deleteBuffer(vbo);
      if (vao) gl.deleteVertexArray(vao);
      if (program) gl.deleteProgram(program);
    };
  }, [src, depthSrc, strength, smoothing, focalX, focalY, scopeToElement]);

  return (
    <div ref={wrapperRef} className={className ?? "absolute inset-0"}>
      {/* WebGL が使えない・読み込み失敗時に表示される静的フォールバック */}
      {(failed || !ready) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={fallbackImgRef}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `${focalX * 100}% ${focalY * 100}%` }}
        />
      )}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: failed ? 0 : 1, transition: "opacity 200ms ease" }}
      />
    </div>
  );
}
