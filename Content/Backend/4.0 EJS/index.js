import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    var today = new Date();
    var message = "Hey! It's a weekday, it's time to work hard!";
    if(today.getDay() == 0 || today.getDay() == 6){
        message = "Hey! It's the weekend, it's time to have fun!";
    }
    res.render(__dirname + "/views/index.ejs",{message:message});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});