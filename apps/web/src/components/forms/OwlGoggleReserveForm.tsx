"use client";

import { useState } from "react";
import Script from "next/script";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { trackEvent } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/forms/use-recaptcha";
import type { FormResponse } from "@/lib/forms/types";

type Props = { locale: Locale; copy: Copy };

export function OwlGoggleReserveForm({ locale, copy }: Props) {
  const o = copy.owlGoggle.form;
  const f = copy.form;
  const tel = copy.footer.tel;
  const telLink = copy.footer.telLink;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const token = await getRecaptchaToken("owl_goggle_reserve");

    const res = await fetch("/api/owl-goggle-reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        model: fd.get("model"),
        buckle: fd.get("buckle"),
        quantity: Number(fd.get("quantity")),
        fulfillment: fd.get("fulfillment"),
        note: fd.get("note"),
        locale,
        privacyAccepted: fd.get("privacyConsent") === "on",
        recaptchaToken: token,
        website: fd.get("website"),
      }),
    });

    const data = (await res.json()) as FormResponse;
    if (data.ok) {
      setStatus("success");
      trackEvent("form_submit_owl_goggle_reserve", { locale });
      return;
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded border border-spray-border bg-spray-surface p-6">
        <p className="text-spray-text">{f.owlGoggle.success}</p>
      </div>
    );
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const inputClass =
    "mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white";

  return (
    <>
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <p className="text-sm text-white/70">
        {o.phoneCta}:{" "}
        <a href={telLink} className="font-bold text-white underline">
          {tel}
        </a>
      </p>
      {status === "error" ? (
        <p role="alert" className="mt-4 rounded border border-red-500/50 p-3 text-sm text-red-300">
          {f.owlGoggle.fail}
        </p>
      ) : null}
      <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
        <input type="text" name="website" tabIndex={-1} className="sr-only" aria-hidden />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/70" htmlFor="og-name">
              {f.contact.name} *
            </label>
            <input id="og-name" name="name" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm text-white/70" htmlFor="og-phone">
              {f.contact.phone} *
            </label>
            <input id="og-phone" name="phone" type="tel" required className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-sm text-white/70" htmlFor="og-email">
            {f.contact.email} *
          </label>
          <input id="og-email" name="email" type="email" required className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/70" htmlFor="og-model">
              {o.model} *
            </label>
            <select id="og-model" name="model" required className={inputClass}>
              <option value="flow">{o.models.flow}</option>
              <option value="vent">{o.models.vent}</option>
              <option value="both">{o.models.both}</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-white/70" htmlFor="og-buckle">
              {o.buckle} *
            </label>
            <select id="og-buckle" name="buckle" required className={inputClass}>
              <option value="with">{o.buckles.with}</option>
              <option value="without">{o.buckles.without}</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/70" htmlFor="og-qty">
              {o.quantity} *
            </label>
            <select id="og-qty" name="quantity" required defaultValue="1" className={inputClass}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-white/70" htmlFor="og-fulfillment">
              {o.fulfillment} *
            </label>
            <select id="og-fulfillment" name="fulfillment" required className={inputClass}>
              <option value="pickup">{o.fulfillments.pickup}</option>
              <option value="ship">{o.fulfillments.ship}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-white/70" htmlFor="og-note">
            {o.note}
          </label>
          <textarea
            id="og-note"
            name="note"
            rows={3}
            placeholder={o.notePlaceholder}
            className={`${inputClass} resize-y`}
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            name="privacyConsent"
            required
            className="mt-1 min-h-4 min-w-4 accent-spray-orange"
          />
          <span>
            {f.privacy.label}{" "}
            <LocaleLink href="/legal/privacy" locale={locale} className="underline">
              {copy.footer.privacy}
            </LocaleLink>
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-park min-h-12 w-full sm:w-auto"
        >
          {status === "submitting" ? f.submitting : f.owlGoggle.submit}
        </button>
        <p className="text-xs text-white/50">{f.recaptcha.notice}</p>
      </form>
    </>
  );
}
