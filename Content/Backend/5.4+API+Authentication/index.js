import express from "express";
import axios from "axios";
import https from "https";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "sam2k";
const yourPassword = "Hello";
const yourAPIKey = "d3c8c8dc-9a99-4d60-84bf-6af951b0ba7c";
const yourBearerToken = "d6f55484-a598-4612-a9e2-da1567bdedca";
const agent = new https.Agent({
  rejectUnauthorized: false
});

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  const response = await axios.get(`${API_URL}random`, {httpsAgent:agent});
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}all?page=2`, {httpsAgent:agent, auth: {username: yourUsername, password: yourPassword}});
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey",async (req, res) => {
  const response = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`, {httpsAgent:agent});
  res.render("index.ejs", {content:JSON.stringify(response.data)});
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
    httpsAgent: agent};
  const response = await axios.get(`${API_URL}secrets/42`, config);
  res.render("index.ejs", {content:JSON.stringify(response.data)});
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
