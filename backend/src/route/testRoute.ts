import express from "express"
import { analyzeWithEmail } from "../utils/aiHelper";

const router = express.Router();

router.get("/", (async () => {
  const text = `
    Hi Sagar,

    Just a reminder that your meeting with the client is scheduled for tomorrow at 11am.
    Please review the attached presentation before the call.

    Regards,
    Team Lead
  `;

  const result = await analyzeWithEmail(text);
  console.log("AI Analysis:", result);
}))

export default router;