

const fs = require("fs")




fs.writeFile("./index.txt" , "may name is mahesh" , "utf-8" , (err)=>{
    if(err)throw err
    console.log("data is written into the file")
})
fs.readFile("index.txt" , "utf-8" , (err , data)=>{
    if(err)throw err
    console.log(data)
})

fs.appendFile("index.txt" , "My name is sangeeta" , "utf-8" , (err)=>{
    if(err)throw err
    console.log("data is appended")
})


const os = require("os")
console.log(os.freemem())