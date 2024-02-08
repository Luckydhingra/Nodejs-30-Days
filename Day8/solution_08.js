const express = require("express")
const app = express();

function positiveIntegerHandler(req, res, next){
    const number = parseInt(req.query.number);

    if(Number.isInteger(number) && number > 0){
        res.status(200).json({message: "Success: Number is a positive integer"})
    }
    else{
        const error = new error(
            "Invalid parameter : Number must be a positive integer."
        );
        error.status = 400;
        next(error);
    }
}

function errorHandler(err, req, res, next){
    res.status(err.status || 500).json({error: err.message})
}
app.use((req, res, next) =>{
    const num = req.query.number;
    if(num && !isNaN(num) && parseInt(num) > 0){
        next();
    }
    else{
        res.send(400).send("Invalid number");
    }
})

app.get("/positive", positiveIntegerHandler)
app.use(errorHandler)
app.listen(8080, ()=>{
    console.log("Listening on port 8080");
})