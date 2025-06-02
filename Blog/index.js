

const express = require("express")
const app = express()
const connectDb = require("./config/database.js")
app.use(express.json())
const userRouter = require("./controller/user.controller.js")
const blogRouter = require("./controller/blog.controller.js")
const cors = require("cors")


app.use(cors({
    origin:"*",
    methods:["POST" , "GET" , "PATCH" , "DELETE"],
    credentials:true
}))

app.use("/user" , userRouter)
app.use("/blog" , blogRouter)

app.get("/" , (req , res)=>{
    res.send("connected!")
})

app.listen(3000 ,async()=>{
    await connectDb()
    console.log("server is running")
})