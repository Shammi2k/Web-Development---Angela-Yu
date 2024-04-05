//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const correctPassword = "ILoveProgramming"

app.use(bodyParser.urlencoded({extended:true}));
app.use(passwordVerifier);

function passwordVerifier(req, res, next){
    if(req.method === 'POST' && req.url === '/check'){
        console.log("Verifying password...");
        if(req.body.password !== correctPassword){
            console.log("Incorrect password");
            return res.redirect("/");
        }
    }
    next();
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/check', (req, res) => {
    res.sendFile(`${__dirname}/public/secret.html`);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
