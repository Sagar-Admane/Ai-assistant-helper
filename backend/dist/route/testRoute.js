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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiHelper_1 = require("../utils/aiHelper");
const router = express_1.default.Router();
router.get("/", (() => __awaiter(void 0, void 0, void 0, function* () {
    const text = `
    Hi Sagar,

    Just a reminder that your meeting with the client is scheduled for tomorrow at 11am.
    Please review the attached presentation before the call.

    Regards,
    Team Lead
  `;
    const result = yield (0, aiHelper_1.analyzeWithEmail)(text);
    console.log("AI Analysis:", result);
})));
exports.default = router;
