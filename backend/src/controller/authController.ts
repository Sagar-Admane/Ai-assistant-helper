import { Request, Response } from "express";
import { oaauth2client } from "../config/googleClient";
import { saveToken } from "../utils/tokenStore";
import { google } from "googleapis";

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
];

function login(req : Request, res : Response){
    const authUrl = oaauth2client.generateAuthUrl({
        access_type : "offline",
        scope : SCOPES
    });
    res.redirect(authUrl);
}

async function oauthCallback(req : Request, res : Response){
    const code = req.query.code as string;
    if(!code) return res.status(400).send('No code provided');

    const {tokens} = await oaauth2client.getToken(code);
    oaauth2client.setCredentials(tokens);
    saveToken(tokens);

    const oauth2 = google.oauth2({
        auth : oaauth2client,
        version : "v2"
    })

    const userinfo = await oauth2.userinfo.get();

    console.log("user info is : ",userinfo);

    res.cookie("userinfo", JSON.stringify(userinfo.data), {
        httpOnly : false,
    })

    res.redirect('http://localhost:5173/dashboard');
}

export {login, oauthCallback}