



const express = require("express")
const app = express()
const bodyParser= require("body-parser")

app.use(bodyParser.json())

app.post("/" , (req , res)=>{
    console.log(req.body)
})

app.listen(3000  , ()=>{
    console.log("server is running 3000")
})