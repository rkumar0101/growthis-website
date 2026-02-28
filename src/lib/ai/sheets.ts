export type ToolLogEvent = {
  type: "tool_run";
  tool: "brief-builder" | "outcome-recommender" | "website-audit";
  createdAt: string;
  inputSummary: string;
  outputSummary: string;
};

export async function logToolRunToSheets(event: ToolLogEvent): Promise<void> {
  const url = process.env.GA_SHEETS_WEBHOOK_URL;
  const token = process.env.GA_SHEETS_WEBHOOK_TOKEN;

  if (!url || !token) return;

  // Best-effort: do not break user flows if Sheets fails
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, type: "tool_run", payload: event }),
    });
  } catch {
    // ignore
  }
}