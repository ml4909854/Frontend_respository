require("dotenv").config();  // Load environment variables
const express = require("express");
const connectDB = require("./config/database.js");
const userRouter = require("./controller/user.controller.js");
const blogRouter = require("./controller/blog.controller.js")
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST",'PATCH',"DELETE"],
    credentials:true
}))

// Routes
app.use("/blog" , blogRouter)
app.use("/user", userRouter);  // Changed to more logical path

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
});