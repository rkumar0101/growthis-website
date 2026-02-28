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

function validateAudit(x: unknown) {
  if (!x || typeof x !== "object") return false;
  const o = x as any;
  if (typeof o.headline !== "string") return false;
  if (!isStringArray(o.topIssues)) return false;
  if (!isStringArray(o.quickFixes)) return false;
  if (!isStringArray(o.priorityPlan)) return false;
  if (typeof o.disclaimer !== "string") return false;
  if (o.nextStep !== undefined && typeof o.nextStep !== "string") return false;
  return true;
}

export async function POST(req: Request) {
  try {
    enforceJsonBodySize(req, 12_000);

    const origin = req.headers.get("origin");
    const originCheck = checkAllowedOrigin(origin);
    if (!originCheck.ok) {
      return NextResponse.json({ ok: false, error: originCheck.reason }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(`audit:${ip}`, 8, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as any;

    const url = safeText(body.url, 140);
    const goal = safeText(body.goal, 60);

    const prompt = [
      "You are GrowthAlis. Produce a heuristic website audit.",
      "",
      "CRITICAL RULE:",
      "- You did NOT fetch or measure the site. Do NOT claim scores, metrics, or tool results as facts.",
      "",
      "OUTPUT RULES:",
      "- Output MUST be valid JSON only.",
      "- JSON shape:",
      `{`,
      `  "headline": string,`,
      `  "topIssues": string[] (max 3),`,
      `  "quickFixes": string[] (max 6),`,
      `  "priorityPlan": string[] (max 6),`,
      `  "nextStep": string (optional),`,
      `  "disclaimer": string`,
      `}`,
      "",
      "INPUT:",
      `URL (context only): ${url}`,
      `Goal: ${goal}`,
    ].join("\n");

    const data = await callGeminiForJson({
      model: "gemini-2.5-flash",
      prompt,
      maxOutputTokens: 750,
    });

    if (!validateAudit(data)) {
      throw new Error("AI response format mismatch. Please try again.");
    }

    await logToolRunToSheets({
      type: "tool_run",
      tool: "website-audit",
      createdAt: new Date().toISOString(),
      inputSummary: safeText(`${url} | ${goal}`, 240),
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