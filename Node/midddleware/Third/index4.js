const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();
const csrfProtection = csrf({ cookie: true });

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Show form with CSRF token
app.get("/form", csrfProtection, (req, res) => {
  res.send(`
    <form action="/process" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Process form with CSRF token
app.post("/process", csrfProtection, (req, res) => {
  res.send("Form data processed safely ✅");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
