


const http = require("http")

const server = http.createServer((req , res)=>{
  if(req.method ==="GET" && req.url ==="/about"){
    res.end("Get requested is done")
  }
  if(req.method === "POST" && req.url==="/post"){
    res.end("Post method is done")
  }
})

server.listen(3000 , ()=>{
    console.log("server is running")
})