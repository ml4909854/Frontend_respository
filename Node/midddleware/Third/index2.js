

const express = require("express")
const app = express()
const helmet = require("helmet")
app.use(helmet({
    contentSecurityPolicy:true,
    noSniff:true
}))

app.get("/", (req , res)=>{
    res.send("Helmet protecting your website")
})

app.listen(3000 , ()=>{
    console.log("server is running on 3000")
})