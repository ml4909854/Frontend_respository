const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "uploads/" });

// Make the uploads folder public
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send(`File uploaded! You can access it at: <a href="/uploads/${req.file.filename}">View File</a>`);
});

app.listen(3000, () => {
  console.log("server is running");
});
