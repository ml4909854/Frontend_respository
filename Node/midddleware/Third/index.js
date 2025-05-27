const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hi I am from a backend, Nice to meet You!" });
});

app.listen(3000, () => {
  console.log("server is running");
});
