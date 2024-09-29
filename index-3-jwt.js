const express = require('express');
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json());
const jwtpassword = "12345"

const users = [{
    name : 'shyamg',
    email : 'shyamg@gmail.com',
    password : '12345678'
},
{
    name : 'bheem',
    email : 'bheemg@gmail.com',
    password : '1234567890'
}]

const userExist = (email, password) =>{
    const status = users.find((e) => e.email === email && e.password === password);
    if(status){
        return true
    }
    return false;
}



app.post('/signin', (req,res,next)=>{

    const email = req.body.signin.email;
    const password = req.body.signin.password;

    if(!userExist(email, password)){
        return res.status(403).json({
            msg : "user doesnt exist in the memory please Signup"
        })
    }

    const token = jwt.sign( {email : email}, jwtpassword )
    res.json({
        token
    })
})

app.get('/users', (req,res,next)=>{
    token = req.headers.authorization;

    try{
        const decode = jwt.verify(token, jwtpassword);
        // const username = decode.email;
        console.log(decode);
        res.status(200).json({
            users : users
        })

    }catch(err){
        res.status(403).json({
            msg : "Wrong Credential"
        })
    }
})



app.listen(5001, ()=>{
    console.log('Server 5001 has started');
})
