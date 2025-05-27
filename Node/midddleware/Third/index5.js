


// coockie parsers
const express =require("express")
const app= express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())

// set a cookie
app.get("/set" , (req , res)=>{
   res.cookie("name" , "mahesh ");
    res.send("coockie has been senT!")
})

app.get("/get" , (req ,res)=>{
    const username = req.cookies.name
    res.send(`Hello ${username}`)
})
app.listen(3000 , ()=>{
    console.log("server is running")
})