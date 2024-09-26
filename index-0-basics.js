const express = require('express');

const app = express();

const {responseMiddleware} = require('./responsemidleware')

app.use(express.json())

// middleware to check the average response time needed
app.use(responseMiddleware);

// what if the middle ware is calling a api call or 
// fetching from another server

const randomMiddleware = async (req, res, next)=>{
    const randomapi = await fetch('/google.com/api', {
        method : 'GET',
    })

    // things to do with this data

    next();
}

const authmiddleware = (req,res,next) => {
    const username = req.headers.username;
    const password = req.headers.password;

    if(!(username === "shyam" && password === "123")){
        res.send('Invalid input user not found')
    }
    next();
}

app.get('/', authmiddleware ,responseMiddleware, (req, res)=>{
    res.json({
        msg : "your kidney is fine as your auth seems fine"
    })
})

// global chaches to catch the error - so that user must know the error (bad page)

app.use( (err, req, res, next)=>{
    res.json({
        msg : "oops seems like there was on error."
    })
} )

app.listen(4001, ()=>{
    console.log('index server is running');
})
