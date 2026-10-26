import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Gemini's OpenAI-compatible endpoint is used server-side only.
// Google currently documents gemini-3.8-flash as a stable Flash model.
export const AI_MODEL = process.env["AI_MODEL"] || "gemini-3.8-flash";
export const AI_BASE_URL =
  process.env["AI_BASE_URL"] ||
  "https://generativelanguage.googleapis.com/v1beta/openai/";

export function createAiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "gemini-compatible",
    baseURL: AI_BASE_URL,
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
