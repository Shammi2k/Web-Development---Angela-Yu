// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";
import https from "https";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const config = {httpsAgent: new https.Agent({rejectUnauthorized:false})};

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/random`, config);
        const data = response.data;
        const content = {};
        content.secret = data.secret;
        content.user = data.username;
        res.render("index.ejs", content);
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})