import express, { RequestHandler } from "express"
import { aiHelper } from "../controller/aiController";

const router = express.Router();

router.post("/ai-helper", aiHelper as RequestHandler );

export default router