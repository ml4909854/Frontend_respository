const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.model.js");
const auth = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");
const roles = require("../constants/roles");

// ✅ Get all blogs - Open to all
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found!" });
        }
        res.status(200).json({ message: "Fetched all blogs successfully", blogs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
});

// ✅ Create blog - Only authors
router.post("/create", auth, checkAccess(roles.author), async (req, res) => {
    try {
        const authorId = req.user._id;
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content, author: authorId });
        const savedBlog = await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
});

// ✅ Get my blogs - Only authors
router.get("/myblog", auth, checkAccess(roles.author), async (req, res) => {
    try {
        const authorId = req.user._id;
        const myBlogs = await Blog.find({ author: authorId });
        if (!myBlogs || myBlogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this author" });
        }
        res.status(200).json({ message: "Fetched your blogs successfully", blogs: myBlogs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching your blogs", error: error.message });
    }
});

// ✅ Update blog - Only the blog's author can edit
router.patch("/update/:id", auth, checkAccess(roles.author), async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can't edit someone else's blog" });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
});

// ✅ Delete blog - Only the blog's author can delete
router.delete("/delete/:id", auth, checkAccess(roles.author), async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can't delete someone else's blog" });
        }
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
});

module.exports = router;
