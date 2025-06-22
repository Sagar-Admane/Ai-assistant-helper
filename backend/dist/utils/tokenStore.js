"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = saveToken;
exports.loadToken = loadToken;
const fs_1 = __importDefault(require("fs"));
const TOKEN_PATH = 'token.json';
function saveToken(token) {
    fs_1.default.writeFileSync(TOKEN_PATH, JSON.stringify(token));
}
function loadToken() {
    if (fs_1.default.existsSync(TOKEN_PATH)) {
        const data = fs_1.default.readFileSync(TOKEN_PATH, 'utf-8');
        return JSON.parse(data);
    }
    return null;
}
