"use client";

export const CONSENT_STORAGE_KEY = "spray_cookie_consent";

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export function setConsent(value: ConsentValue): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
  if (value === "granted") {
    loadGa4();
  }
}

export function loadGa4(): void {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (!id || typeof window === "undefined") return;
  if (document.querySelector(`script[data-ga4="${id}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.dataset.ga4 = id;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (getConsent() !== "granted") return;
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string): void {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (!id || getConsent() !== "granted") return;
  window.gtag?.("config", id, { page_path: path });
}
