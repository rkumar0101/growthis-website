export type AllowedOriginResult = { ok: true } | { ok: false; reason: string };

export function checkAllowedOrigin(origin: string | null): AllowedOriginResult {
  const allowlist = process.env.GA_ALLOWED_ORIGINS?.trim();
  if (!allowlist) return { ok: true };

  if (!origin) return { ok: false, reason: "Missing Origin header." };

  const allowed = allowlist
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (allowed.includes(origin)) return { ok: true };
  return { ok: false, reason: "Origin not allowed." };
}

export function safeText(input: unknown, maxLen: number): string {
  const s = String(input ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

export function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (!xf) return "unknown";
  return xf.split(",")[0]?.trim() || "unknown";
}

/**
 * Best-effort in-memory rate limit (works per server instance).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const current = hits.get(key);

  if (!current || now > current.resetAt) {
    const resetAt = now + windowMs;
    hits.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  hits.set(key, current);
  return { ok: true, remaining: limit - current.count, resetAt: current.resetAt };
}

export function enforceJsonBodySize(req: Request, maxBytes: number) {
  const len = Number(req.headers.get("content-length") || "0");
  if (Number.isFinite(len) && len > maxBytes) {
    throw new Error("Payload too large.");
  }
}