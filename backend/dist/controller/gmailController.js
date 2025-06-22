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
exports.fetchEmail = fetchEmail;
const googleapis_1 = require("googleapis");
const googleClient_1 = require("../config/googleClient");
const tokenStore_1 = require("../utils/tokenStore");
const gamil = googleapis_1.google.gmail({ version: "v1", auth: googleClient_1.oaauth2client });
function extractEmailBody(payload) {
    var _a, _b;
    if (!payload)
        return "(No content)";
    const decode = (data) => Buffer.from(data, 'base64').toString('utf-8');
    // Case 1: direct body
    if ((_a = payload.body) === null || _a === void 0 ? void 0 : _a.data) {
        return decode(payload.body.data);
    }
    // Case 2: nested parts
    if (payload.parts && payload.parts.length > 0) {
        for (const part of payload.parts) {
            if (part.mimeType === "text/plain" && ((_b = part.body) === null || _b === void 0 ? void 0 : _b.data)) {
                return decode(part.body.data);
            }
            // Look deeper recursively
            const nested = extractEmailBody(part);
            if (nested !== "(No content)")
                return nested;
        }
    }
    return "(No content)";
}
function fetchEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokens = (0, tokenStore_1.loadToken)();
            if (!tokens) {
                return res.status(401).send("no token found, Please authenticate first");
            }
            googleClient_1.oaauth2client.setCredentials(tokens);
            const response = yield gamil.users.messages.list({
                userId: "me",
                maxResults: 10
            });
            const messages = response.data.messages || [];
            const emailDetails = yield Promise.all(messages.map((msg) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const details = yield gamil.users.messages.get({
                    userId: "me",
                    id: msg.id,
                });
                const payload = details.data.payload;
                const headers = (payload === null || payload === void 0 ? void 0 : payload.headers) || [];
                const subject = ((_a = headers.find(h => h.name === "Subject")) === null || _a === void 0 ? void 0 : _a.value) || ("No Subject");
                const from = ((_b = headers.find(h => h.name === "From")) === null || _b === void 0 ? void 0 : _b.value) || "(Unknown Sender)";
                const body = extractEmailBody(payload);
                return { id: msg.id, subject, from, body };
                // res.status(200).json({id : msg.id, subject, from, body});
            })));
            // res.json(emailDetails);
            res.status(200).json({ emailDetails });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Failed to fetch emails");
        }
    });
}
