const express = require('express');
const { z } = require('zod');

// input sent in postman 
// {
//     "signin" : {
//         "email" : "shyamg@gmail.com",
//         "name" : "shyam",
//         "password" : 12345678
//     }
// }

const inputSchema = z.object({
    email : z.string().email(),
    name : z.string(),
    password : z.union([ z.number().gte(8) , z.string().min(8) ])
})

const app = express();

app.use(express.json())

app.get('/', (req, res)=>{
    // kidneys = [1,2]
    const signin = req.body.signin;

    const arrKidney = req.body.kidneys;
    
    const zodRes = inputSchema.safeParse(signin)
    console.log(zodRes);

    if(!zodRes.success){
        res.json({
            msg : zodRes
        })
        return
    }

    res.json({
        msg : "Your Input seems fine ngl"
    })
    
})

app.listen(4001, ()=>{
    console.log('index server is running');
})
