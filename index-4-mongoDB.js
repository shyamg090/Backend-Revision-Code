const express = require('express');
const {z} = require('zod')
const app = express()

const mongoose = require('mongoose');

app.use(express.json())

const mongo = mongoose.connect('mongodb+srv://shyamg090:shyamg%40090@cluster0.evvig.mongodb.net/Users_People_post');
const mongoPromise = mongo.then(()=>{
    console.log('mongoDB is connected');
})

// const users = mongoose.Schema({

// })

const users_table = mongoose.model('users_table', {
    name  : String,
    email : String, 
    password : Number
})

const userZodSchema = z.object({
    name : z.string(),
    email : z.string().email().endsWith('@gmail.com'),
    password : z.number().min(8)
})

app.post('/signup', async (req, res, next)=>{
    const userInput = req.body.signin

    const userCorrect = userZodSchema.safeParse(userInput)

    if(!(userCorrect.success)){
        return res.status(403).json({
            msg : userCorrect,
            msg2: "not correct"
        })
    }
    // console.log(userCorrect.data.email);
    try {
        const isUserPresent = await users_table.findOne({email : userCorrect.data.email})
        // console.log(isUserPresent);  //if user is not present gives null
        if(isUserPresent){
            return res.json({
                msg : "User Already Exists"
            })
        }
    } catch (error) {
        console.log('seems like there was an error');
    }

// table name - users
    const new_users = new users_table({
        name : userCorrect.data.name,
        email : userCorrect.data.email, 
        password : userCorrect.data.password, 
    })

    new_users.save().then(()=>{
        res.status(200).json({
            msg : "Signed in sucessfully",
            name : new_users.name
        })
    });

})

app.post('/signin', (req, res, next)=>{
    const userInput = req.body.signin

    const userCorrect = userZodSchema.safeParse(userInput)

    if(!(userCorrect.success)){
        return res.status(403).json({
            msg : userCorrect,
            msg2: "not correct"
        })
    }



    res.status(200).json({
        msg : "Signed in sucessfully"
    })

})


app.listen('6001', ()=>{
    console.log('Server Index-MongoDB has started');
})