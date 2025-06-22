import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import env from "dotenv"
import User from "../model/userModel";

env.config();

async function protectFunction(req : Request, res : Response, next : any){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.SECRET!) as JwtPayload ;
                (req as any).user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Authorization failed");
        }
        if(!token){
        res.status(401);
        throw new Error("No token found");
    }
    }
}

export {protectFunction};