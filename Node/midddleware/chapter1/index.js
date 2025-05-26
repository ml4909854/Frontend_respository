


const express = require("express")
const app = express()
const userRouter = require("./router/userRouter.js")
const blogRouter = require("./router/blogRouter.js")
app.use(express.json())

app.use("/users" , userRouter)
app.use("/blog" , blogRouter)


// this code can be more ornanised
app.listen(3000 , ()=>{
    console.log("server is running")
})