import { Request, Response } from "express";
import env from "dotenv"
import bcrypt from "bcryptjs"
import User from "../model/userModel";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

env.config();

const SECRET = process.env.SECRET;

function generateToken(id : mongoose.Types.ObjectId) : string {
    return jwt.sign({id}, SECRET!, {
        expiresIn : "30d"
    })
}

async function login(req : Request, res : Response){

    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("All details are not send from frontend");
        }

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.send("No such user");
        }

        const matchPass = await bcrypt.compare(password, userExist.password!);

        if(!matchPass){
            return res.send("Password is incorrect");
        }

        res.json({
            id : userExist._id,
            name : userExist.name,
            email : userExist.email,
            token : generateToken(userExist._id)
        });

    } catch (error) {
        console.log("Error while logging in");
        res.status(500).send("Some unknown error. Internal server error");
    }

}

async function signup(req : Request, res : Response){
    try {
        const {name, email, password} = req.body;
        const SALT = parseInt(process.env.SALT!);
        if(!name || !email || !password){
            return res.status(401).send("Information is not found");
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(500).send("User already exist");
        }

        const hashedPass = await bcrypt.hash(password, SALT);

        const user = await User.create({
            name : name,
            email : email,
            password : hashedPass
        });

        if(user){
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                token : generateToken(user._id)
            });
        } else {
            res.status(500).send("Unable to create a user");
        }


    } catch (error) {
        console.log("Error while signinup : ", error);
        return res.status(500).send("Error while trying to log in");
    }
}

export {signup, login};