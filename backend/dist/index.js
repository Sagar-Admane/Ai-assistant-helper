"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const gmailRoute_1 = __importDefault(require("./route/gmailRoute"));
const testRoute_1 = __importDefault(require("./route/testRoute"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const db_1 = __importDefault(require("./db/db"));
const aiRoute_1 = __importDefault(require("./route/aiRoute"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Backend started");
});
app.get("/userinfo", (req, res) => {
    const userInfo = req.cookies.userinfo;
    if (!userInfo)
        res.status(404).send({ message: "There is no such cookies for user" });
    res.status(200).json(JSON.parse(userInfo));
});
app.use("/", gmailRoute_1.default);
app.use("/test", testRoute_1.default);
app.use("/user", userRoute_1.default);
app.use('/ai', aiRoute_1.default);
app.listen(PORT, () => {
    console.log("Backend running on port ", PORT);
});
