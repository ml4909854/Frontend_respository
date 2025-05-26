const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/about", (req, res) => {
  res.send("about page!");
});
app.get("/contact", (req, res) => {
  res.status(200).send("Contact page?");
});

app.use((req , res)=>{
    res.status(404).send(
        `<h1>Page not found</h1>
        <p>You are entered a wrong url ${req.url}</p>
        `
    )
})
app.listen(3000, () => {
  console.log("server is running ");
});
