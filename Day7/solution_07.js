const express = require("express");
const app = express();

function requestLoggerMiddleware(req, res, next){
    const timeStamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timeStamp} - ${method} request received`);
    next();
}

app.use(requestLoggerMiddleware);

app.get('/', (req, res) =>{
    res.send("Hi there");
});

app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});
