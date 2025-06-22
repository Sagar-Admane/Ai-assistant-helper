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
exports.aiHelper = aiHelper;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "../../.env"
});
function aiHelper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { from, subject, body } = req.body;
        try {
            const openai = new openai_1.default({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPENAI_KEY
            });
            const prompt = `
You are an AI email assistant. Analyze the following email content and return structured data.

You must return:
1. A short summary of the email.
2. A category (e.g., "Work", "Personal", "Spam", "Finance", "Meeting", etc.).
3. A suggested action (choose only from: "Reply", "Add to Calendar", "Ignore").

---

🗓️ If action is "Add to Calendar":
Also extract the following:
- "startDateTime": Start time of the event in ISO 8601 format (e.g., "2025-06-10T14:00:00").
- "endDateTime": End time of the event in ISO 8601 format.

✉️ If action is "Reply":
Also extract:
- "subject": Suggested subject line for the reply.
- "body": Suggested body message for the reply.
- "to": The sender of the original email (use 'From' field of the email metadata but just extract the email address).
- "from": Always "sagaradmane6@gmail.com"

⚠️ If action is "Ignore", then only include summary, category, and action — no additional fields.

---

Respond strictly in raw JSON. Do **not** include any explanation, code block syntax (like triple backticks), or markdown.
Respond in english without any extra explanation or anything.

---

Email Metadata:
- From: ${from}
- Subject: ${subject}

Email Body:
${body}
`;
            const completion = yield openai.chat.completions.create({
                model: "deepseek/deepseek-r1-0528:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            });
            const resp = completion.choices[0].message.content;
            console.log(resp);
            const cleanResp = resp === null || resp === void 0 ? void 0 : resp.replace(/```json|```/g, "").trim();
            console.log(cleanResp);
            const newResp = JSON.parse(cleanResp);
            const response = {
                summary: newResp.summary,
                category: newResp.category,
                action: newResp.action,
                to: newResp.to,
                from: newResp.from,
                body: newResp.body,
            };
            if (newResp.action === "Add to Calendar") {
                response.startDateTime = new Date(newResp.startDateTime).toISOString();
                response.endDateTime = new Date(newResp.endDateTime).toISOString();
            }
            if (newResp.action === "Reply") {
                response.subject = newResp.subject;
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    });
}
