

const http = require("http")

const server = http.createServer((req, res) => {
  if (req.url === "/about") {
    res.end("This is the about page");
  } else if (req.url === "/") {
    res.end("Home Page");
  } else {
    res.end("Page not found"); // Handle unknown URLs
  }
});

server.listen(3000 , ()=>{
    console.log("server is running")
})