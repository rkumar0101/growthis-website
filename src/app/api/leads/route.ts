import { forwardToSheetsWebhook } from "@/lib/sheetsWebhook";
import {
  enforceRateLimit,
  isHoneypotTripped,
  originAllowed,
  parseJsonBody,
  sanitizePayload,
} from "@/lib/apiProtection";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Optional origin check (enable by setting GA_ALLOWED_ORIGINS)
  if (!originAllowed(request)) {
    return Response.json({ ok: false, error: "Forbidden origin." }, { status: 403 });
  }

  // Rate limit: 8 requests per 10 minutes per IP+UA (best-effort)
  const rl = enforceRateLimit({
    request,
    bucket: "leads",
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (!rl.ok) {
    return Response.json(
      { ok: false, error: rl.error },
      {
        status: rl.status,
        headers: rl.retryAfterSec ? { "Retry-After": String(rl.retryAfterSec) } : undefined,
      }
    );
  }

  const parsed = await parseJsonBody(request, { maxChars: 50_000 });
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const payload = parsed.data;

  // Honeypot: silently accept but do not store
  if (isHoneypotTripped(payload)) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[/api/leads] Honeypot tripped. Dropping submission.");
    }
    return Response.json({ ok: true });
  }

  const safePayload = sanitizePayload(payload);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[/api/leads] payload:", safePayload);
  }

  const result = await forwardToSheetsWebhook({
    kind: "leads",
    payload: safePayload,
    request,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: result.status });
  }

  return Response.json({ ok: true });
}