

const express = require("express")
const connectDB = require("./config/db")
const userRouter = require("./controller/user.controller.js")
const blogRouter = require("./controller/blog.controller.js")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express()
app.use(cors({
  origin:"*",
  methods:["POST","DELETE","GET","PATCH"],
  credentials:true
}))


app.use(express.json())
app.use("/blog" , blogRouter)
app.use("/user" , userRouter)



app.get("/generateToken" , async(req , res)=>{
   try {
    const refreshToken = req.body.token
    console.log(refreshToken)
    if(refreshToken){
      jwt.verify(refreshToken , "refreshMasai" , (err , decoded)=>{
        if(err){
        return  res.status(400).json({message:"errro to generate a acessToken"})
        }
        const accessToken = jwt.sign({_id:decoded._id} , "accessMasai" , {expiresIn:"30s"})
        res.status(200).json({message:"token generated!" , accessToken:accessToken})
      })
    }
   } catch (error) {
    res.status(500).json({message:"error to generate Token!" , error:error})
   }
})
app.listen(3000 , async()=>{
  await  connectDB()
    console.log("server is running")
})