const express = require("express");
const router = express.Router();
const BlogModel = require("../model/blog.model.js");
const isAuthenticate = require("../middleware/auth.js");
const checkAccess = require("../middleware/checkAccess.js");
const roles = require("../constants/roles.js");

// Get all blogs (no authentication needed)
router.get("/", async (req, res) => {
  try {
    const blog = await BlogModel.find().populate("author" , "username");
    if (!blog || blog.length === 0) {
      return res.status(404).json({ message: "No blogs found!" });
    }
    res.status(200).json({ message: "Blogs fetched!", blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs!", error });
  }
});

// Create a blog (only authenticated authors can do this)
router.post(
  "/create",
  isAuthenticate,
  checkAccess(roles.author),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const newBlog = new BlogModel({ title, content, author: req.user._id });
      const savedBlog = await newBlog.save();
      res.status(200).json({ message: "Blog created successfully!", blog: savedBlog });
    } catch (error) {
      res.status(500).json({ message: "Error creating blog!", error });
    }
  }
);

// Update blog
router.patch("/update/:id", isAuthenticate, checkAccess(roles.author), async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    if (!blog.author.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized to update this blog!" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, { new: true });
    res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog!", error });
  }
});

// Delete blog
router.delete("/delete/:id", isAuthenticate, checkAccess(roles.author), async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    if (!blog.author.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized to delete this blog!" });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully!", blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog!", error });
  }
});

module.exports = router;
