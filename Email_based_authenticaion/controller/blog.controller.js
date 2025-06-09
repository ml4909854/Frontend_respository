

const express = require("express")
const Blog = require("../model/blog.model")
const auth = require("../middleware/auth")
const router = express.Router()


//  private route
// everyone gets all blogs ok this 

router.get("/" , async(req , res)=>{
    try {
        const blog = await Blog.find().populate("author" , "email")
        if(!blog){
            return res.status(404).json({message:"No blog found!"})
        }
        res.status(200).json({message:"get all blogs", Blog:blog})
    } catch (error) {
        res.status(500).json({message:"Internal sever error" , error:error})
    }
})

// create blog it must be authenticated now.

router.post("/create" , auth , async(req , res)=>{
    try {
        const author = req.user._id
        const {title , content}  = req.body
        const blog = new Blog({title , content , author})
        const savedBlog = await blog.save()
        res.status(201).json({message:"Blog created successfully!"})
    } catch (error) {
        res.status(500).json({message:"Error to create blog"})
    }
})




module.exports = router