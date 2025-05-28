const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const courseRouter = require("./controller/courseRouter.js")
const studentRouter = require("./controller/studentRouter.js")
app.use(express.json())
app.use("/course"  , courseRouter)
app.use("/student"  , studentRouter)


app.get("/health", (req, res) => {
  res.status(200).json({ message: "connected!" });
});

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running ");
});
