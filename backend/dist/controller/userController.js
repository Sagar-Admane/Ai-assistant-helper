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
exports.signup = signup;
exports.login = login;
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ id }, SECRET, {
        expiresIn: "30d"
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send("All details are not send from frontend");
            }
            const userExist = yield userModel_1.default.findOne({ email });
            if (!userExist) {
                return res.send("No such user");
            }
            const matchPass = yield bcryptjs_1.default.compare(password, userExist.password);
            if (!matchPass) {
                return res.send("Password is incorrect");
            }
            res.json({
                id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                token: generateToken(userExist._id)
            });
        }
        catch (error) {
            console.log("Error while logging in");
            res.status(500).send("Some unknown error. Internal server error");
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const SALT = parseInt(process.env.SALT);
            if (!name || !email || !password) {
                return res.status(401).send("Information is not found");
            }
            const userExist = yield userModel_1.default.findOne({ email });
            if (userExist) {
                return res.status(500).send("User already exist");
            }
            const hashedPass = yield bcryptjs_1.default.hash(password, SALT);
            const user = yield userModel_1.default.create({
                name: name,
                email: email,
                password: hashedPass
            });
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                });
            }
            else {
                res.status(500).send("Unable to create a user");
            }
        }
        catch (error) {
            console.log("Error while signinup : ", error);
            return res.status(500).send("Error while trying to log in");
        }
    });
}
