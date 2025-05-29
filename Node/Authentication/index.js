const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const userRouter = require("./controller/userRouter.js");
const isAuthenticated = require("./middleware/auth.js");
const checkAcess = require("./middleware/checkAcess.js")
app.use(express.json());

app.use("/user", userRouter);

// private route

app.get("/privateData", isAuthenticated, (req, res) => {
  res.send("private data");
});

// app.get("/orders", isAuthenticated, (req, res) => {
//   res.send("order data");
// });
// app.get("/cart", isAuthenticated, (req, res) => {
//   res.send("cart data");
// });

app.get("/admin/data", isAuthenticated ,checkAcess("admin"), (req, res) => {
    res.send("Hey admin!")
});
app.get("/author/data", isAuthenticated ,checkAcess("author"), (req, res) => {
    res.send("Hey author!")
});

app.get("/health", (req, res) => {
  res.status(200).send("connected!");
});

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running");
});
