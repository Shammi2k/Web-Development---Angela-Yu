import express from "express";

const app = express();
const port = 8000;

app.get("/", (_req, res) => {
    res.send("Hello, world");
})

app.get("/contact", (_req, res) => {
    res.send("My contacts");
})

app.get("/about", (_req, res) => {
    res.send("About Me");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});