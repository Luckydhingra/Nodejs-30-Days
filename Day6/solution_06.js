/*
6. Problem: Express Route Handling
Problem Statement: You are building a web application using Express in Node.js. 
Create an Express route to handle GET requests to the endpoint "/greet" that takes a query 
parameter "name" and returns a personalized greeting. 
If the name parameter is not provided, the default greeting should be "Hello, Guest!".

*/
const express = require("express");
const app = express();

function greetHandler(req, res){
    const {name} = req.query;

    if(name){
        res.send(`Hello, ${name}`)
    }
    else{
        res.send(`Hello! Node.js`);
    }
}

app.get('/greet', greetHandler)

app.listen(8080, ()=>{
    console.log("Listening on 8080 port");
})