import { OpenAI } from "openai";
import env from "dotenv";

env.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_KEY,
});

export interface AnalysisResult {
  summary: string;
  category: string;
  action: string;
}

async function analyzeWithEmail(emailText: string): Promise<AnalysisResult> {
  try {
    const prompt = `
You're an AI assistant. Analyze the following email text and provide:
- A short summary
- A category (e.g. "Work", "Personal", "Spam", "Finance", "Meeting")
- A suggested action (e.g. "Reply", "Add to Calendar", "Ignore")

Respond in JSON like:
{
  "summary": "...",
  "category": "...",
  "action": "..."
}

Email content:
""" 
${emailText}
"""
`;

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-prover-v2:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful email summarizer and categorizer.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    let raw = response.choices[0].message.content || "{}";
    raw = raw.replace(/```json|```/g, "").trim();
    const result: AnalysisResult = JSON.parse(raw);

    return result;
  } catch (error) {
    console.error("AI analysis error:", error);
    throw new Error("Failed to analyze email with AI.");
  }
}

export {analyzeWithEmail}