

// solve the problem related to the 
// object.entries

let obj = {
    firstname:"mahesh",
    lastname:"kumar",
    age:22,
    nationality:"Indian"
}

for(let [key , values] of Object.entries(obj)){
    console.log(key , values)
}