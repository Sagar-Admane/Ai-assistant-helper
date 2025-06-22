import fs from "fs"

const TOKEN_PATH = 'token.json';

export function saveToken(token : any){
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
}

export function loadToken(): any | null {
    if(fs.existsSync(TOKEN_PATH)){
        const data = fs.readFileSync(TOKEN_PATH, 'utf-8');
        return JSON.parse(data);
    }
    return null;
}