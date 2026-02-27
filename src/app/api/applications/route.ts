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
  if (!originAllowed(request)) {
    return Response.json({ ok: false, error: "Forbidden origin." }, { status: 403 });
  }

  // Slightly stricter for applications
  const rl = enforceRateLimit({
    request,
    bucket: "applications",
    limit: 4,
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

  const parsed = await parseJsonBody(request, { maxChars: 80_000 });
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const payload = parsed.data;

  if (isHoneypotTripped(payload)) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[/api/applications] Honeypot tripped. Dropping submission.");
    }
    return Response.json({ ok: true });
  }

  const safePayload = sanitizePayload(payload);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[/api/applications] payload:", safePayload);
  }

  const result = await forwardToSheetsWebhook({
    kind: "applications",
    payload: safePayload,
    request,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: result.status });
  }

  return Response.json({ ok: true });
}