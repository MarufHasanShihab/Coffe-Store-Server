const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Our Coffe Server Is Running")
})

app.listen(port,()=>{
    console.log(`Our Coffe Server Is Running On ${port}`)
})