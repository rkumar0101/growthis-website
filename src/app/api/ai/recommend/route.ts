import { NextResponse } from "next/server";
import { callGeminiForJson } from "@/lib/ai/gemini";
import {
  checkAllowedOrigin,
  enforceJsonBodySize,
  getClientIp,
  rateLimit,
  safeText,
} from "@/lib/ai/guardrails";
import { logToolRunToSheets } from "@/lib/ai/sheets";

export const runtime = "nodejs";

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}

function validateReco(x: unknown) {
  if (!x || typeof x !== "object") return false;
  const o = x as any;
  if (typeof o.recommendedPath !== "string") return false;
  if (!isStringArray(o.reasons)) return false;
  if (typeof o.disclaimer !== "string") return false;
  if (!o.bestCTA || typeof o.bestCTA !== "object") return false;
  if (typeof o.bestCTA.label !== "string" || typeof o.bestCTA.href !== "string") return false;
  if (o.whatHappensNext !== undefined && !isStringArray(o.whatHappensNext)) return false;
  return true;
}

export async function POST(req: Request) {
  try {
    enforceJsonBodySize(req, 20_000);

    const origin = req.headers.get("origin");
    const originCheck = checkAllowedOrigin(origin);
    if (!originCheck.ok) {
      return NextResponse.json({ ok: false, error: originCheck.reason }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(`reco:${ip}`, 15, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as any;

    const outcome = safeText(body.outcome, 80);
    const industry = safeText(body.industry, 80);
    const currentState = safeText(body.currentState, 160);
    const url = safeText(body.url, 120);
    const budget = safeText(body.budget, 60);

    const prompt = [
      "You are GrowthAlis. Recommend the best-fit service/solution path.",
      "",
      "OUTPUT RULES:",
      "- Output MUST be valid JSON only.",
      "- JSON shape:",
      `{`,
      `  "recommendedPath": string,`,
      `  "reasons": string[], (max 3 items)`,
      `  "whatHappensNext": string[] (optional, max 4 items),`,
      `  "bestCTA": { "label": string, "href": string },`,
      `  "disclaimer": string`,
      `}`,
      "- No guaranteed results claims.",
      "- If URL is provided, do NOT claim you fetched it. It's context only.",
      `- bestCTA.href must be one of: "/contact", "/services", "/solutions", "/tools/brief-builder", "/tools/website-audit"`,
      "",
      "INPUT:",
      `Outcome: ${outcome}`,
      `Industry: ${industry}`,
      `Current state: ${currentState}`,
      `URL (context only): ${url}`,
      `Budget band: ${budget}`,
    ].join("\n");

    const data = await callGeminiForJson({
      model: "gemini-2.5-flash",
      prompt,
      maxOutputTokens: 700,
    });

    if (!validateReco(data)) {
      throw new Error("AI response format mismatch. Please try again.");
    }

    await logToolRunToSheets({
      type: "tool_run",
      tool: "outcome-recommender",
      createdAt: new Date().toISOString(),
      inputSummary: safeText(`${outcome} | ${industry} | ${budget}`, 240),
      outputSummary: safeText(JSON.stringify(data), 800),
    });

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: safeText(e?.message ?? "Something went wrong.", 200) },
      { status: 500 }
    );
  }
}