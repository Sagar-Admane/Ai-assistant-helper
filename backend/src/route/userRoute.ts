import express, { RequestHandler } from "express"
import { login, signup } from "../controller/userController";

const router = express.Router();

router.post("/login", login as RequestHandler)

router.post("/signup", signup as RequestHandler)

export default router;