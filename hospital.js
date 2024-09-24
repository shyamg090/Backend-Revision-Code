const express = require('express');
const bodyParser = require('body-parser');

const app = express()

const user = [{
    name: "John Deer",
    kidney: [{
        healthy: false
    }]
},
{
    name: "Samantha",
    kidney: [{
        healthy: true
    }]
}]

app.use(bodyParser.json())

app.get('/hospital', (req, res) => {

    const filter = user.filter((item) => {
        return item.name === "John Deer"
    })
    console.log(filter[0]);
    const count = filter[0].kidney.length.toString()

    res.send("No of kidney is: " + count );
})

app.post('/hospital', (req, res) => {
    user[0].kidney.push(req.body)
    res.send("succesfully added a kidney");
})

app.put('/hospital', (req, res) => {
    
})
app.delete('/hospital', (req, res) => {

})

app.listen(4000, () => {
    console.log('Server has started - hospital');
})