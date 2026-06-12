"use client";

import { useState } from "react";
import Script from "next/script";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { trackEvent } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/forms/use-recaptcha";
import type { ContactSubject, FormResponse } from "@/lib/forms/types";

type Props = { locale: Locale; copy: Copy };

export function ContactForm({ locale, copy }: Props) {
  const a = copy.about.access;
  const f = copy.form;
  const tel = copy.footer.tel;
  const telLink = copy.footer.telLink;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const token = await getRecaptchaToken("contact");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        subject: fd.get("subject"),
        message: fd.get("message"),
        locale,
        privacyAccepted: fd.get("privacyConsent") === "on",
        recaptchaToken: token,
        website: fd.get("website"),
      }),
    });

    const data = (await res.json()) as FormResponse;
    if (data.ok) {
      setStatus("success");
      trackEvent("form_submit_contact", { locale });
      return;
    }
    setStatus("error");
    setErrorMsg(f.contact.fail);
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded border border-spray-border bg-spray-surface p-6">
        <h2 className="text-lg font-bold text-spray-text">{f.contact.successTitle}</h2>
        <p className="mt-2 text-spray-muted">{f.contact.success}</p>
      </div>
    );
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <section id="contact" className="scroll-mt-24">
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <h2 className="text-xl font-bold">{a.formTitle}</h2>
      <p className="mt-2 text-sm text-spray-muted">{a.formLead}</p>
      <p className="mt-4 text-sm">
        {a.phoneStrip}{" "}
        <a href={telLink} className="btn-shop-outline inline-flex min-h-11 items-center px-3">
          {tel}
        </a>
      </p>
      {status === "error" ? (
        <p role="alert" className="mt-4 rounded border border-red-500/50 p-3 text-sm text-red-400">
          {errorMsg || f.errors.generic}
        </p>
      ) : null}
      <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden
        />
        <div>
          <label className="text-sm text-spray-muted" htmlFor="contact-name">
            {f.contact.name} *
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="contact-email">
            {f.contact.email} *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="contact-phone">
            {f.contact.phone}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="contact-subject">
            {f.contact.subject} *
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue="other"
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          >
            {(Object.entries(f.contact.subjects) as [ContactSubject, string][]).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="contact-message">
            {f.contact.message} *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 py-2 text-base text-white"
          />
        </div>
        <label className="flex gap-2 text-sm text-spray-muted">
          <input type="checkbox" name="privacyConsent" required className="mt-1" />
          <span>
            <LocaleLink href="/legal/privacy" locale={locale} className="text-spray-blue hover:underline">
              {copy.footer.legal.privacy}
            </LocaleLink>
            {locale === "ja" ? "に同意する" : ""}
          </span>
        </label>
        <p className="text-xs text-spray-muted">{f.recaptcha.notice}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="btn-park w-full min-h-11 disabled:opacity-50"
        >
          {status === "submitting" ? f.submitting : f.submit}
        </button>
        <p className="text-xs text-spray-muted">
          {a.formNote}{" "}
          <LocaleLink href="/maintenance/request" locale={locale} className="text-spray-blue hover:underline">
            {a.formLinkMaintenance}
          </LocaleLink>
        </p>
      </form>
    </section>
  );
}
