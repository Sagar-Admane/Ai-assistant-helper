import express, { RequestHandler } from "express";
import { login, oauthCallback } from "../controller/authController";
import { fetchEmail } from "../controller/gmailController";

const router = express.Router();

router.get("/login", login)

router.get("/oauth2callback", oauthCallback as RequestHandler)

router.get("/emails", fetchEmail as RequestHandler);

export default router