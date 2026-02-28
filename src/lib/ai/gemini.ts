type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
};

export type GeminiJsonCallOptions = {
  model?: string; // default gemini-2.5-flash
  prompt: string;
  maxOutputTokens?: number;
};

async function postGemini(model: string, body: Record<string, unknown>) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY.");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini error: ${res.status} ${text}`.slice(0, 500));
  }

  return (await res.json()) as GeminiGenerateContentResponse;
}

export async function callGeminiForJson(opts: GeminiJsonCallOptions) {
  const model = opts.model ?? "gemini-2.5-flash";

  const baseBody: Record<string, unknown> = {
    contents: [{ role: "user", parts: [{ text: opts.prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: opts.maxOutputTokens ?? 900,
      temperature: 0.4,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  // Try once
  const data1 = await postGemini(model, baseBody);
  const raw1 = data1?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!raw1) throw new Error("Empty response from Gemini.");

  try {
    return JSON.parse(raw1) as unknown;
  } catch {
    // Retry with stricter instruction (rare but possible)
    const retryPrompt =
      opts.prompt +
      "\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no extra text.";

    const data2 = await postGemini(model, {
      ...baseBody,
      contents: [{ role: "user", parts: [{ text: retryPrompt }] }],
    });

    const raw2 = data2?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!raw2) throw new Error("Empty response from Gemini (retry).");

    try {
      return JSON.parse(raw2) as unknown;
    } catch {
      throw new Error("Gemini returned invalid JSON.");
    }
  }
}