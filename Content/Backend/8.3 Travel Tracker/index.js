import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const dbClient = new pg.Client({
  host: 'localhost',
  port: 5432,
  database: 'world',
  user: 'postgres',
  password: 'admin'
});
dbClient.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const country_codes = (await dbClient.query("SELECT country_code FROM visited_countries;")).rows;
  console.log(country_codes);
  const result = {};
  const codes = [];
  country_codes.forEach(country_code => {
    codes.push(country_code.country_code);
  });
  result['countries'] = codes;
  result['total'] = codes.length;
  res.render("index.ejs", result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
