"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oaauth2client = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const oaauth2client = new googleapis_1.google.auth.OAuth2({
    clientId: CLIENT_ID,
    clientSecret: SECRET,
    redirectUri: REDIRECT_URI
});
exports.oaauth2client = oaauth2client;
