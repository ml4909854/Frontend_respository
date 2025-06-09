const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./controller/user.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("OTP Authentication server is running!");
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/otp-auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Connection Failed", error);
  }
};

app.listen(3000, async () => {
  await connectDB();
  console.log("Server is running on port 3000");
});
