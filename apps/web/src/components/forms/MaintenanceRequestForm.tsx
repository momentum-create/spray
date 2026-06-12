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

export function MaintenanceRequestForm({ locale, copy }: Props) {
  const r = copy.maintenance.request;
  const f = copy.form;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const token = await getRecaptchaToken("maintenance_request");

    const res = await fetch("/api/maintenance-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        boardType: fd.get("boardType"),
        boardSize: fd.get("boardSize"),
        requestDetail: fd.get("requestDetail"),
        locale,
        privacyAccepted: fd.get("privacyConsent") === "on",
        recaptchaToken: token,
        website: fd.get("website"),
      }),
    });

    const data = (await res.json()) as FormResponse;
    if (data.ok) {
      setStatus("success");
      trackEvent("form_submit_maintenance", { locale });
      return;
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded border border-spray-border bg-spray-surface p-6">
        <p className="text-spray-text">{r.success}</p>
      </div>
    );
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <>
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <p className="text-sm text-spray-muted">{r.phoneNote}</p>
      <p className="mt-2 text-sm text-spray-muted">{r.priceNote}</p>
      <p className="mt-2 text-sm text-spray-muted">{f.maintenance.leadTime}</p>
      {status === "error" ? (
        <p role="alert" className="mt-4 rounded border border-red-500/50 p-3 text-sm text-red-400">
          {f.maintenance.fail}
        </p>
      ) : null}
      <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <input type="text" name="website" tabIndex={-1} className="sr-only" aria-hidden />
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-name">
            {f.maintenance.name} *
          </label>
          <input
            id="maint-name"
            name="name"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-email">
            {f.maintenance.email} *
          </label>
          <input
            id="maint-email"
            name="email"
            type="email"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-phone">
            {f.maintenance.phone} *
          </label>
          <input
            id="maint-phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-type">
            {f.maintenance.boardType} *
          </label>
          <select
            id="maint-type"
            name="boardType"
            required
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          >
            <option value="snowboard">{f.maintenance.boardTypes.snowboard}</option>
            <option value="skateboard">{f.maintenance.boardTypes.skateboard}</option>
            <option value="both">{f.maintenance.boardTypes.both}</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-size">
            {f.maintenance.boardSize}
          </label>
          <input
            id="maint-size"
            name="boardSize"
            className="mt-1 w-full min-h-11 rounded border border-spray-border bg-black px-3 text-base text-white"
          />
        </div>
        <div>
          <label className="text-sm text-spray-muted" htmlFor="maint-detail">
            {f.maintenance.requestDetail} *
          </label>
          <textarea
            id="maint-detail"
            name="requestDetail"
            required
            minLength={10}
            rows={5}
            className="mt-1 w-full rounded border border-spray-border bg-black px-3 py-2 text-base text-white"
          />
        </div>
        <label className="flex gap-2 text-sm text-spray-muted">
          <input type="checkbox" name="privacyConsent" required className="mt-1" />
          <span>{f.privacy.label}</span>
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="btn-park w-full min-h-11 disabled:opacity-50"
        >
          {status === "submitting" ? f.submitting : f.maintenance.submit}
        </button>
        <p className="text-xs text-spray-muted">
          {r.linkContact}{" "}
          <LocaleLink href="/about/access#contact" locale={locale} className="text-spray-blue hover:underline">
            /about/access
          </LocaleLink>
        </p>
      </form>
    </>
  );
}
