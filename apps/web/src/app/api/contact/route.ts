import { verifyRecaptcha } from "@/lib/forms/recaptcha";
import { sendContactMail } from "@/lib/forms/send-mail";
import type { FormErrorResponse, FormSuccessResponse } from "@/lib/forms/types";
import { validateContactBody } from "@/lib/forms/validate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "VALIDATION" } satisfies FormErrorResponse,
      { status: 400 },
    );
  }

  const validated = validateContactBody(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION", fields: validated.fields } satisfies FormErrorResponse,
      { status: 400 },
    );
  }

  const { data } = validated;
  const recaptchaOk = await verifyRecaptcha(data.recaptchaToken, "contact");
  if (!recaptchaOk) {
    return NextResponse.json(
      { ok: false, error: "RECAPTCHA" } satisfies FormErrorResponse,
      { status: 403 },
    );
  }

  const sent = await sendContactMail(data);
  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "SERVER" } satisfies FormErrorResponse,
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true } satisfies FormSuccessResponse);
}
