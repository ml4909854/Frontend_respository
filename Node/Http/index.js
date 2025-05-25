

const http = require("http")

const server = http.createServer((req , res)=>{
    if(req.url === "/" && req.method ==="GET"){
        res.end("Get requested is done")
    }

})

server.listen(3000 , ()=>{
    console.log("server is running")
})