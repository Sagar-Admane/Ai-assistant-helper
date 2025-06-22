"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeWithEmail = analyzeWithEmail;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_KEY,
});
function analyzeWithEmail(emailText) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield openai.chat.completions.create({
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
            const result = JSON.parse(raw);
            return result;
        }
        catch (error) {
            console.error("AI analysis error:", error);
            throw new Error("Failed to analyze email with AI.");
        }
    });
}
