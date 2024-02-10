const express = require("express");
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname, 'Public')));

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get("/styles/style.css", (req, res) =>{
    res.sendFile(path.join(__dirname, './styles/style.css'))
});

app.listen("8080", ()=>{
    console.log("Listening on port 8080")
})