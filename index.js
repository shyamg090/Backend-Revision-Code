const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.send('<h1>hello world</h1>')
})

// a backend calculator : sum of n number till num
// frontend query - localhost:3000?num=10
const calculate = (num)=>{
    let ans = 0;
    for(let i=0; i <= num; i++ ){
        ans = ans + i
    }
    return ans 
}

app.get('/', (req, res)=>{
    const port = 3000
    res.send("This is a string from port : ", port.toString())
})

app.post('/', (req, res)=>{
    const n = req.query.num;
    const ans = calculate(n);
    // res.json({ans : ans})
    // res.send(ans) -- gives ans error as its number other than **status code**
    res.send(ans.toString())
})

app.listen(3000, ()=>{
    console.log('Server started!!');
})
