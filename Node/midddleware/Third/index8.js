

const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan("combined"))

app.get("/" , (req , res)=>{
    res.send("Home page!")
})

app.listen(3000 , ()=>{
    console.log("server is running")
})