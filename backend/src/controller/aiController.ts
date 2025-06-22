import { Request, Response } from "express";
import OpenAI from "openai";
import env from "dotenv"

env.config({
    path : "../../.env"
})

async function aiHelper(req : Request, res : Response){
    const {from,subject,body} = req.body;

    try {
        const openai = new OpenAI({
            baseURL : "https://openrouter.ai/api/v1",
            apiKey : process.env.OPENAI_KEY
        })

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


        const completion = await openai.chat.completions.create({
            model : "deepseek/deepseek-r1-0528:free",
            messages : [
                {
                    role : "user",
                    content : prompt
                }
            ]
        });

        const resp = completion.choices[0].message.content;
        console.log(resp);
        const cleanResp = resp?.replace(/```json|```/g, "").trim();
        console.log(cleanResp);

        const newResp = JSON.parse(cleanResp!);

        const response : any = {
            summary : newResp.summary,
            category : newResp.category,
            action : newResp.action,
            to : newResp.to,
            from : newResp.from,
            body : newResp.body,
        };

        if(newResp.action === "Add to Calendar"){
            response.startDateTime = new Date(newResp.startDateTime).toISOString();
            response.endDateTime = new Date(newResp.endDateTime).toISOString();
        }

        if(newResp.action === "Reply"){
            response.subject = newResp.subject;
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error});
    }

}

export {aiHelper}