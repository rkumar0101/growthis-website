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

function validateBrief(x: unknown) {
  if (!x || typeof x !== "object") return false;
  const o = x as any;
  if (typeof o.summary !== "string") return false;
  if (!isStringArray(o.scope)) return false;
  if (typeof o.nextStep !== "string") return false;

  const optionalArrays = ["recommendedPages", "risksAssumptions", "openQuestions"] as const;
  for (const k of optionalArrays) {
    if (o[k] !== undefined && !isStringArray(o[k])) return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    enforceJsonBodySize(req, 25_000);

    const origin = req.headers.get("origin");
    const originCheck = checkAllowedOrigin(origin);
    if (!originCheck.ok) {
      return NextResponse.json({ ok: false, error: originCheck.reason }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(`brief:${ip}`, 12, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as any;

    const goal = safeText(body.goal, 80);
    const businessType = safeText(body.businessType, 80);
    const pages = safeText(body.pages, 220);
    const integrations = safeText(body.integrations, 220);
    const contentReady = safeText(body.contentReady, 80);
    const timeline = safeText(body.timeline, 60);
    const budget = safeText(body.budget, 60);
    const constraints = safeText(body.constraints, 260);

    const prompt = [
      "You are GrowthAlis. Create a structured project brief.",
      "",
      "OUTPUT RULES:",
      "- Output MUST be valid JSON (no markdown, no extra text).",
      "- JSON shape must be exactly:",
      `{`,
      `  "summary": string,`,
      `  "scope": string[],`,
      `  "recommendedPages": string[] (optional),`,
      `  "risksAssumptions": string[] (optional),`,
      `  "openQuestions": string[] (optional),`,
      `  "nextStep": string`,
      `}`,
      "- Be realistic. No guaranteed results claims.",
      "- Keep it concise and implementation-ready.",
      "",
      "INPUT:",
      `Goal: ${goal}`,
      `Business type: ${businessType}`,
      `Pages/features: ${pages}`,
      `Integrations: ${integrations}`,
      `Content readiness: ${contentReady}`,
      `Timeline: ${timeline}`,
      `Budget band: ${budget}`,
      `Constraints: ${constraints}`,
    ].join("\n");

    const data = await callGeminiForJson({
      model: "gemini-2.5-flash",
      prompt,
      maxOutputTokens: 900,
    });

    if (!validateBrief(data)) {
      throw new Error("AI response format mismatch. Please try again.");
    }

    await logToolRunToSheets({
      type: "tool_run",
      tool: "brief-builder",
      createdAt: new Date().toISOString(),
      inputSummary: safeText(`${goal} | ${businessType} | ${timeline} | ${budget}`, 240),
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