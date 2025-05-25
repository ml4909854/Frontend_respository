


const http = require("http")
const mydate = require("./index2")

const hello = require('./index3')
const app  = http.createServer((req , res)=>{
    res.end("Hello world?")
    // console.log( mydate())
    console.log(hello())
})

app.listen(3000 , ()=>{
    console.log("server is running 3000")
})