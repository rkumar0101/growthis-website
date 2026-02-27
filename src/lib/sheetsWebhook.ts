import "server-only";

type Kind = "leads" | "applications";

function getHeader(headers: Headers, name: string) {
  return headers.get(name) ?? headers.get(name.toLowerCase()) ?? "";
}

function getClientIp(headers: Headers) {
  const xff = getHeader(headers, "x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "";
  return (
    getHeader(headers, "x-real-ip") ||
    getHeader(headers, "cf-connecting-ip") ||
    getHeader(headers, "x-client-ip") ||
    ""
  );
}

function getReferrer(headers: Headers) {
  return getHeader(headers, "referer") || getHeader(headers, "referrer") || "";
}

type WebhookOk = { ok: true };
type WebhookErr = { ok: false; error?: string };
type WebhookResp = WebhookOk | WebhookErr;

export async function forwardToSheetsWebhook(params: {
  kind: Kind;
  payload: unknown;
  request: Request;
}) {
  const url = process.env.GA_SHEETS_WEBHOOK_URL;
  const token = process.env.GA_SHEETS_WEBHOOK_TOKEN;

  if (!url || !token) {
    return {
      ok: false as const,
      status: 500,
      error: "Missing GA_SHEETS_WEBHOOK_URL or GA_SHEETS_WEBHOOK_TOKEN env vars.",
    };
  }

  const headers = params.request.headers;

  const body = {
    token,
    kind: params.kind,
    timestamp: new Date().toISOString(),
    ip: getClientIp(headers),
    userAgent: getHeader(headers, "user-agent"),
    referrer: getReferrer(headers),
    payload: params.payload ?? {},
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const raw = await res.text().catch(() => "");

    // Apps Script often returns 200 even on errors, so we must inspect JSON body.
    let json: WebhookResp | null = null;
    try {
      json = raw ? (JSON.parse(raw) as WebhookResp) : null;
    } catch {
      json = null;
    }

    // If it isn't valid JSON, treat as failure (helps catch HTML error pages).
    if (!json) {
      return {
        ok: false as const,
        status: 502,
        error: `Sheets webhook returned non-JSON response. First 200 chars: ${raw.slice(0, 200)}`,
      };
    }

    // If JSON says ok:false, surface that error.
    if (json.ok !== true) {
      return {
        ok: false as const,
        status: 502,
        error: json.error || "Sheets webhook responded ok:false (no error message).",
      };
    }

    // Also keep the HTTP check (rarely useful, but fine)
    if (!res.ok) {
      return {
        ok: false as const,
        status: 502,
        error: `Sheets webhook HTTP error: ${res.status} ${res.statusText}`,
      };
    }

    return { ok: true as const };
  } catch (err) {
    return {
      ok: false as const,
      status: 502,
      error: `Sheets webhook error: ${String(err instanceof Error ? err.message : err)}`,
    };
  }
}