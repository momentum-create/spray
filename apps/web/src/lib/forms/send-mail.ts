import { calcOwlGoggleOrder } from "@/lib/owl-goggle-commerce";
import type {
  ContactFormRequest,
  MaintenanceRequestFormRequest,
  OwlGoggleReserveFormRequest,
} from "./types";

function contactTo(): string {
  return process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL_TO ?? "";
}

function fromAddress(): string {
  return process.env.EMAIL_FROM ?? "noreply@spray166.com";
}

function formatLines(lines: string[]): string {
  return lines.join("\n");
}

export async function sendContactMail(data: ContactFormRequest): Promise<boolean> {
  const to = contactTo();
  if (!to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] dev mode — no CONTACT_TO_EMAIL", data);
      return true;
    }
    return false;
  }

  const subject = `[SPRAY] お問い合わせ (${data.locale}) — ${data.subject}`;
  const body = formatLines([
    `名前: ${data.name}`,
    `メール: ${data.email}`,
    data.phone ? `電話: ${data.phone}` : "",
    `件名: ${data.subject}`,
    "",
    data.message,
  ]);

  return sendViaResend(to, subject, body);
}

export async function sendMaintenanceMail(
  data: MaintenanceRequestFormRequest,
): Promise<boolean> {
  const to = contactTo();
  if (!to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[maintenance] dev mode — no CONTACT_TO_EMAIL", data);
      return true;
    }
    return false;
  }

  const subject = `[SPRAY] メンテ依頼 (${data.locale})`;
  const body = formatLines([
    `名前: ${data.name}`,
    `メール: ${data.email}`,
    `電話: ${data.phone}`,
    `種別: ${data.boardType}`,
    data.boardSize ? `サイズ: ${data.boardSize}` : "",
    "",
    data.requestDetail,
  ]);

  return sendViaResend(to, subject, body);
}

export async function sendOwlGoggleReserveMail(
  data: OwlGoggleReserveFormRequest,
): Promise<boolean> {
  const to = contactTo();
  if (!to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[owl-goggle-reserve] dev mode — no CONTACT_TO_EMAIL", data);
      return true;
    }
    return false;
  }

  const order = calcOwlGoggleOrder(data.model, data.quantity);
  const subject = `[SPRAY] OWLゴーグル予約・決済へ (${data.locale}) — ${data.model} x${data.quantity}`;
  const body = formatLines([
    `名前: ${data.name}`,
    `メール: ${data.email}`,
    `電話: ${data.phone}`,
    `モデル: ${data.model}`,
    `バックル: ${data.buckle}`,
    `数量: ${data.quantity}（${order.units}本）`,
    `受取: ${data.fulfillment}`,
    `小計: ¥${order.subtotal.toLocaleString("ja-JP")}`,
    `送料: ¥${order.shipping.toLocaleString("ja-JP")}`,
    `合計: ¥${order.total.toLocaleString("ja-JP")}`,
    data.note ? `メモ: ${data.note}` : "",
    "",
    "— 公式ストア決済画面へ遷移予定",
  ]);

  return sendViaResend(to, subject, body);
}

async function sendViaResend(to: string, subject: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[mail] dev — would send:", { to, subject, text });
      return true;
    }
    return false;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [to],
      subject,
      text,
    }),
  });

  return res.ok;
}
