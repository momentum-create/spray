import type {
  ApiLocale,
  BoardType,
  ContactFormRequest,
  ContactSubject,
  MaintenanceRequestFormRequest,
  OwlGoggleBuckle,
  OwlGoggleFulfillment,
  OwlGoggleModel,
  OwlGoggleReserveFormRequest,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

export function validateContactBody(
  body: unknown,
): { ok: true; data: ContactFormRequest } | { ok: false; fields: Record<string, string> } {
  const b = body as Record<string, unknown>;
  const fields: Record<string, string> = {};

  const name = trim(b.name);
  const email = trim(b.email);
  const message = trim(b.message);
  const subject = trim(b.subject) as ContactSubject;
  const locale = trim(b.locale) as ApiLocale;
  const website = trim(b.website);

  if (website) fields.website = "invalid";
  if (!name || name.length > 80) fields.name = "required";
  if (!email || !EMAIL_RE.test(email)) fields.email = "email";
  if (!message || message.length < 10 || message.length > 4000) fields.message = "required";
  if (!["visit", "product", "school", "other"].includes(subject)) fields.subject = "required";
  if (locale !== "ja" && locale !== "en") fields.locale = "required";
  if (b.privacyAccepted !== true) fields.privacyAccepted = "privacy";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: trim(b.phone) || undefined,
      subject,
      message,
      locale,
      privacyAccepted: true,
      recaptchaToken: trim(b.recaptchaToken),
    },
  };
}

export function validateMaintenanceBody(
  body: unknown,
):
  | { ok: true; data: MaintenanceRequestFormRequest }
  | { ok: false; fields: Record<string, string> } {
  const b = body as Record<string, unknown>;
  const fields: Record<string, string> = {};

  const name = trim(b.name);
  const email = trim(b.email);
  const phone = trim(b.phone);
  const requestDetail = trim(b.requestDetail);
  const boardType = trim(b.boardType) as BoardType;
  const locale = trim(b.locale) as ApiLocale;
  const website = trim(b.website);

  if (website) fields.website = "invalid";
  if (!name) fields.name = "required";
  if (!email || !EMAIL_RE.test(email)) fields.email = "email";
  if (!phone || phone.length < 10) fields.phone = "required";
  if (!requestDetail || requestDetail.length < 10) fields.requestDetail = "required";
  if (!["snowboard", "skateboard", "both"].includes(boardType)) fields.boardType = "required";
  if (locale !== "ja" && locale !== "en") fields.locale = "required";
  if (b.privacyAccepted !== true) fields.privacyAccepted = "privacy";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      boardType,
      boardSize: trim(b.boardSize) || undefined,
      requestDetail,
      locale,
      privacyAccepted: true,
      recaptchaToken: trim(b.recaptchaToken),
    },
  };
}

export function validateOwlGoggleReserveBody(
  body: unknown,
):
  | { ok: true; data: OwlGoggleReserveFormRequest }
  | { ok: false; fields: Record<string, string> } {
  const b = body as Record<string, unknown>;
  const fields: Record<string, string> = {};

  const name = trim(b.name);
  const email = trim(b.email);
  const phone = trim(b.phone);
  const model = trim(b.model) as OwlGoggleModel;
  const buckle = trim(b.buckle) as OwlGoggleBuckle;
  const fulfillment = trim(b.fulfillment) as OwlGoggleFulfillment;
  const locale = trim(b.locale) as ApiLocale;
  const website = trim(b.website);
  const quantityRaw = Number(b.quantity);
  const quantity = Number.isFinite(quantityRaw) ? Math.floor(quantityRaw) : 0;

  if (website) fields.website = "invalid";
  if (!name) fields.name = "required";
  if (!email || !EMAIL_RE.test(email)) fields.email = "email";
  if (!phone || phone.length < 10) fields.phone = "required";
  if (!["flow", "vent", "both"].includes(model)) fields.model = "required";
  if (!["with", "without"].includes(buckle)) fields.buckle = "required";
  if (!["pickup", "ship"].includes(fulfillment)) fields.fulfillment = "required";
  if (quantity < 1 || quantity > 10) fields.quantity = "required";
  if (locale !== "ja" && locale !== "en") fields.locale = "required";
  if (b.privacyAccepted !== true) fields.privacyAccepted = "privacy";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      model,
      buckle,
      quantity,
      fulfillment,
      note: trim(b.note) || undefined,
      locale,
      privacyAccepted: true,
      recaptchaToken: trim(b.recaptchaToken),
    },
  };
}
