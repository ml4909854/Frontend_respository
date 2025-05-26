

const express = require("express")
const router = express.Router()

router.get("/" , (req , res)=>{
    res.send("Hi I am blog")
})

router.get("/myblog" , (req , res)=>{
    res.send("My blog!")
})

router.get("/createBlog" , (req ,res)=>{
    res.send("createBlog!")
})

module.exports = router