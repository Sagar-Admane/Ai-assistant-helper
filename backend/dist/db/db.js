"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO;
function connectDb() {
    const conn = mongoose_1.default.connect(MONGO_URI);
    if (!conn) {
        console.log("Unable to connect to mongodb");
    }
    else {
        console.log("Connected to DB");
    }
}
exports.default = connectDb;
