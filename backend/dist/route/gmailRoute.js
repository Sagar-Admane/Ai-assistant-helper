"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const gmailController_1 = require("../controller/gmailController");
const router = express_1.default.Router();
router.get("/login", authController_1.login);
router.get("/oauth2callback", authController_1.oauthCallback);
router.get("/emails", gmailController_1.fetchEmail);
exports.default = router;
