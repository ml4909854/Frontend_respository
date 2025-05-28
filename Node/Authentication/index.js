const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const userRouter = require("./controller/userRouter.js");
const isAuthenticated = require("./middleware/auth.js");
app.use(express.json());

app.use("/user", userRouter);

// private route

app.get("/privateData", isAuthenticated, (req, res) => {
  res.send("private data");
});
app.get("/orders", isAuthenticated, (req, res) => {
  res.send("order data");
});
app.get("/cart", isAuthenticated, (req, res) => {
  res.send("cart data");
});

app.get("/health", (req, res) => {
  res.status(200).send("connected!");
});

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running");
});
