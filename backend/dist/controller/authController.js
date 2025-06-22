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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.oauthCallback = oauthCallback;
const googleClient_1 = require("../config/googleClient");
const tokenStore_1 = require("../utils/tokenStore");
const googleapis_1 = require("googleapis");
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
];
function login(req, res) {
    const authUrl = googleClient_1.oaauth2client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    res.redirect(authUrl);
}
function oauthCallback(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        if (!code)
            return res.status(400).send('No code provided');
        const { tokens } = yield googleClient_1.oaauth2client.getToken(code);
        googleClient_1.oaauth2client.setCredentials(tokens);
        (0, tokenStore_1.saveToken)(tokens);
        const oauth2 = googleapis_1.google.oauth2({
            auth: googleClient_1.oaauth2client,
            version: "v2"
        });
        const userinfo = yield oauth2.userinfo.get();
        console.log("user info is : ", userinfo);
        res.cookie("userinfo", JSON.stringify(userinfo.data), {
            httpOnly: false,
        });
        res.redirect('http://localhost:5173/dashboard');
    });
}
