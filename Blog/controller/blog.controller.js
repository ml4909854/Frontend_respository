const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.model.js");
const checkAccess = require("../middleware/checkAcess");
const isAuth = require("../middleware/auth.js");

// blog have how many router
// blog
// createBlog
// myblog
// updateBlog
// deleteBlog

// get blog
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find().populate("author", "username");
    if (blog.length === 0) {
      return res.status(404).json({ message: "blog not found!" });
    }
    res.status(200).json({ message: "Get all blog!", Blog: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// blog post. now author can post the blog when is he is looged in and he is acess to create a blog

router.post("/create", isAuth, checkAccess("author"), async (req, res) => {
  try {
    const author = req.user._id;
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content, author });
    const savedBlog = await newBlog.save();
    res
      .status(201)
      .json({ message: "blog created succesfully", Blog: savedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update the Blog!
router.patch("/update/:id", isAuth, checkAccess("author"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You cannot change someone else's blog!" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Blog updated successfully!",
      blog: updatedBlog,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// delete blog request:

router.delete("/delete/:id" ,isAuth , checkAccess("author"), async(req , res)=>{
    try {
        const blogId = req.params.id
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({message:"No blog found!"})
        }
        if(blog.author.toString() !== req.user.id.toString()){
            return res.status(403).json({message:"You can't delete someOne's blog."})
        }
        const deleteBlog = await Blog.findByIdAndDelete(blogId)
        res.status(200).json({message:"blog Delete successfully!" , Blog:deleteBlog})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;
