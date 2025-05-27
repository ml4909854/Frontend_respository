const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./controller/userRouter.js");
const connectDB = require("./config/database.js");

app.use("/user" , userRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health is good" });
});


app.listen(3000, async () => {
  await connectDB();

  console.log("server is runing");
});
