const express = require('express');
const bodyParser = require('body-parser');

const app = express()

const user = [{
    name: "John Deer",
    kidney: [{
        ishealthy: false
    }]
},
{
    name: "Samantha",
    kidney: [{
        ishealthy: true
    }]
}]

app.use(bodyParser.json())

app.get('/hospital', (req, res) => {

    const filtered = user.filter((item) => {
        return item.name === "John Deer"
    })
    // console.log(filtered[0]);

    const healthykidney = filtered[0].kidney.filter((item) => {
        return item.ishealthy === true
    })

    const unhealthykidney = filtered[0].kidney.filter((item) => {
        return item.ishealthy === false
    })

    // console.log(filter[0]);
    const count = filtered[0].kidney.length.toString()

    res.json({
        total_kdidney : count, 
        healthykidney : healthykidney.length,
        unhealthykidney : unhealthykidney.length
    });
})

app.post('/hospital', (req, res) => {
    user[0].kidney.push(req.body)
    res.send("succesfully added a kidney");
})

app.put('/hospital', (req, res) => {
    
    for(let i=0; i<user[0].kidney.length; i++){
        user[0].kidney[i].ishealthy = true;
    }
    res.json({})
})

app.delete('/hospital', (req, res) => {

    const newuser = user[0].kidney.filter((item)=>{
        return item.ishealthy = true
    })
    user[0].kidney = newuser;

    console.log(user[0]);

    res.json({})
})

app.listen(4000, () => {
    console.log('Server has started - hospital');
})