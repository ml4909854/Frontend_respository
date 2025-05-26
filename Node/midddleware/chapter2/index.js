// this section is totally based on the middleware

const express = require("express");
const app = express();

const logger = (req, res, next) => {
  console.log("one");
  next();
  console.log("two");
};
const logger2 = (req, res, next) => {
  console.log("one");
  next();
  console.log("three");
};

// app.use(logger) // now I want middleware are use in all router
// Now here i want to use a middleware for all the routes

app.get("/", logger, logger2, (req, res) => {
  console.log("Home page");
  res.send("Home page");
});

app.get("/contact", (req, res) => {
  console.log("contanct");
  res.send("contact");
});

app.listen(3000, () => {
  console.log("server is running");
});
