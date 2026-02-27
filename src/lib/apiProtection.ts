import "server-only";

type Bucket = "leads" | "applications";

const DEFAULT_MAX_BODY_CHARS = 50_000; // ~50KB
const DEFAULT_MAX_STRING_LEN = 2_000;
const DEFAULT_MAX_KEYS = 60;
const DEFAULT_MAX_ARRAY = 60;
const DEFAULT_MAX_DEPTH = 4;

function getHeader(headers: Headers, name: string) {
  return headers.get(name) ?? headers.get(name.toLowerCase()) ?? "";
}

export function getClientIp(headers: Headers) {
  const xff = getHeader(headers, "x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "";
  return (
    getHeader(headers, "x-real-ip") ||
    getHeader(headers, "cf-connecting-ip") ||
    getHeader(headers, "x-client-ip") ||
    ""
  );
}

export function originAllowed(request: Request) {
  const list = (process.env.GA_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (list.length === 0) return true;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  return list.includes(origin);
}

export async function parseJsonBody(request: Request, opts?: { maxChars?: number }) {
  const maxChars = opts?.maxChars ?? DEFAULT_MAX_BODY_CHARS;

  const raw = await request.text();
  if (raw.length > maxChars) {
    return {
      ok: false as const,
      status: 413,
      error: `Request body too large. Limit is ~${maxChars} chars.`,
    };
  }

  try {
    const data = raw ? JSON.parse(raw) : null;
    return { ok: true as const, data };
  } catch {
    return { ok: false as const, status: 400, error: "Invalid JSON body." };
  }
}

export function isHoneypotTripped(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  const obj = payload as Record<string, unknown>;

  // Accept multiple common honeypot field names (we’ll add one in UI later)
  const candidates = ["website", "companyWebsite", "url", "_hp", "hp"];
  for (const key of candidates) {
    const v = obj[key];
    if (typeof v === "string" && v.trim().length > 0) return true;
  }

  return false;
}

export function sanitizePayload(input: unknown): unknown {
  function walk(value: unknown, depth: number): unknown {
    if (depth > DEFAULT_MAX_DEPTH) return null;

    if (value === null) return null;

    const t = typeof value;

    if (t === "string") return (value as string).slice(0, DEFAULT_MAX_STRING_LEN);
    if (t === "number" || t === "boolean") return value;

    if (Array.isArray(value)) {
      return value.slice(0, DEFAULT_MAX_ARRAY).map((v) => walk(v, depth + 1));
    }

    if (t === "object") {
      const obj = value as Record<string, unknown>;
      const entries = Object.entries(obj).slice(0, DEFAULT_MAX_KEYS);
      const out: Record<string, unknown> = {};
      for (const [k, v] of entries) {
        out[String(k).slice(0, 80)] = walk(v, depth + 1);
      }
      return out;
    }

    // bigint, symbol, function, undefined → string fallback
    return String(value);
  }

  return walk(input, 0);
}

type RateState = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __gaRateLimit: Map<string, RateState> | undefined;
}

/**
 * Best-effort rate limit (works well locally + on long-lived servers).
 * On serverless, it still helps, but won’t be perfectly consistent across instances.
 */
export function enforceRateLimit(params: {
  request: Request;
  bucket: Bucket;
  limit: number;
  windowMs: number;
}) {
  const headers = params.request.headers;
  const ip = getClientIp(headers) || "unknown";
  const ua = getHeader(headers, "user-agent").slice(0, 80) || "ua";
  const key = `ga:${params.bucket}:${ip}:${ua}`;

  const now = Date.now();
  const windowMs = params.windowMs;

  if (!globalThis.__gaRateLimit) globalThis.__gaRateLimit = new Map();
  const store = globalThis.__gaRateLimit;

  const cur = store.get(key);

  if (!cur || now > cur.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }

  if (cur.count >= params.limit) {
    const retryAfterSec = Math.max(1, Math.ceil((cur.resetAt - now) / 1000));
    return {
      ok: false as const,
      status: 429,
      error: "Too many requests. Please try again shortly.",
      retryAfterSec,
    };
  }

  cur.count += 1;
  store.set(key, cur);

  return { ok: true as const };
}