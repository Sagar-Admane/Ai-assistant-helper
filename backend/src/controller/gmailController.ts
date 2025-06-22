import { Request, Response } from "express";
import { google } from "googleapis";
import { oaauth2client } from "../config/googleClient";
import { loadToken } from "../utils/tokenStore";

const gamil = google.gmail({version : "v1", auth : oaauth2client});

function extractEmailBody(payload: any): string {
  if (!payload) return "(No content)";

  const decode = (data: string) =>
    Buffer.from(data, 'base64').toString('utf-8');

  // Case 1: direct body
  if (payload.body?.data) {
    return decode(payload.body.data);
  }

  // Case 2: nested parts
  if (payload.parts && payload.parts.length > 0) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decode(part.body.data);
      }
      // Look deeper recursively
      const nested = extractEmailBody(part);
      if (nested !== "(No content)") return nested;
    }
  }

  return "(No content)";
}


async function fetchEmail(req : Request, res : Response){
    try {
        const tokens = loadToken();
        if(!tokens){
            return res.status(401).send("no token found, Please authenticate first");
        }

        oaauth2client.setCredentials(tokens);

        const response = await gamil.users.messages.list({
            userId : "me",
            maxResults : 10
        });

        const messages = response.data.messages || [];

        const emailDetails = await Promise.all(
            messages.map(async (msg) => {
                const details = await gamil.users.messages.get({
                    userId : "me",
                    id : msg.id!,
                });

                const payload = details.data.payload;
                const headers = payload?.headers || [];
                const subject = headers.find(h => h.name === "Subject")?.value || ("No Subject");
                const from = headers.find(h => h.name === "From")?.value || "(Unknown Sender)";

                const body = extractEmailBody(payload); 

                return {id : msg.id, subject, from, body};
                // res.status(200).json({id : msg.id, subject, from, body});
            })
        );

        // res.json(emailDetails);
        res.status(200).json({emailDetails});
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to fetch emails");
    }
}

export {fetchEmail};