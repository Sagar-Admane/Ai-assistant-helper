import {google} from "googleapis"
import env from "dotenv"

env.config();

const CLIENT_ID = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oaauth2client = new google.auth.OAuth2({
    clientId : CLIENT_ID,
    clientSecret : SECRET,
    redirectUri : REDIRECT_URI
})

export {oaauth2client}