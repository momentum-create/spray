export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.ALLOW_RECAPTCHA_BYPASS === "true"
    ) {
      return true;
    }
    return false;
  }

  if (!token) return false;

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await res.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  if (!data.success) return false;

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  if (typeof data.score === "number" && data.score < minScore) return false;
  if (data.action && data.action !== expectedAction) return false;

  return true;
}
