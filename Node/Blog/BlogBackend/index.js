require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const userRouter = require("./controller/userRouter.js");
const blogRouter = require("./controller/blogRouter.js");
const jwt = require("jsonwebtoken");
app.use(express.json());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("connected!");
});

app.post("/generateToken", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { _id: decoded._id },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "30s" }
    );

    res.status(200).json({ accessToken });
  });
});


const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectDB();
  console.log("server is running");
});
