// 
// 1 Acess object PRoperties 


const person = {
    name:"mahesh",
    age:"city",
    city:"Bhopal"
}

function fetch(){
    return person.name +person["age"]
}
let x = fetch()
console.log(x)