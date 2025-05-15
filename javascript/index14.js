

let obj = {
    firstname:"mahesh",
    lastname:"kumar",
    age:22, 
    nationality:"Indian"
}


for(let key of Object.keys(obj)){
    console.log(key)
}

for(let value of Object.values(obj)){
    console.log(value)
}

for(let [key , value] of Object.entries(obj)){
    console.log(key , value)
}