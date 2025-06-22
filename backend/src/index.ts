import express from "express"
import env from "dotenv";
import gmailRoute from "./route/gmailRoute"
import testRoute from "./route/testRoute" 
import userRoute from "./route/userRoute" 
import connectDb from "./db/db";
import aiRoute from "./route/aiRoute"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
env.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());

connectDb();

app.get("/", (req, res) => {
    res.send("Backend started");
})

app.get("/userinfo", (req, res) => {
    const userInfo = req.cookies.userinfo;
    if(!userInfo) res.status(404).send({message : "There is no such cookies for user"});
    res.status(200).json(JSON.parse(userInfo)); 
})

app.use("/", gmailRoute);
app.use("/test" , testRoute);
app.use("/user", userRoute);
app.use('/ai', aiRoute);

app.listen(PORT, () => {
    console.log("Backend running on port ", PORT);
})