import { verifyRecaptcha } from "@/lib/forms/recaptcha";
import { sendOwlGoggleReserveMail } from "@/lib/forms/send-mail";
import type { FormErrorResponse, FormSuccessResponse } from "@/lib/forms/types";
import { validateOwlGoggleReserveBody } from "@/lib/forms/validate";
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

  const validated = validateOwlGoggleReserveBody(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION", fields: validated.fields } satisfies FormErrorResponse,
      { status: 400 },
    );
  }

  const { data } = validated;
  const recaptchaOk = await verifyRecaptcha(data.recaptchaToken, "owl_goggle_reserve");
  if (!recaptchaOk) {
    return NextResponse.json(
      { ok: false, error: "RECAPTCHA" } satisfies FormErrorResponse,
      { status: 403 },
    );
  }

  const sent = await sendOwlGoggleReserveMail(data);
  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "SERVER" } satisfies FormErrorResponse,
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true } satisfies FormSuccessResponse);
}
