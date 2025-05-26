const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey users!");
});

router.get("/profile", (req, res) => {
  res.send("users profile!");
});

router.get("/contact", (req, res) => {
  res.send("users contact!");
});

router.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
