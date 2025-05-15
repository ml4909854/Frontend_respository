

// object keys to arrays


const obj = {
    name:"mahesh",
    age:22
}


for(let key in obj){
    console.log(key , obj[key])
}
for(let key of Object.keys(obj)){
    console.log(obj[key])
}

