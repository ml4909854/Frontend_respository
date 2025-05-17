

let letter = new Set(["a" , "b" ,"c"])

// letter.add("a")
// letter.add("b")
// letter.add("c")

let result = letter.has("d") // to find someting in the ste its give true sometimes it give false statements please focus
console.log(result)

// run for loop

// for(let x of letter){
//     console.log(x)
// }

// using keys 

let val = letter.values()
for(let x of val){
    console.log(x)
}

let ke = letter.keys()
for(let x of ke){
    console.log(x)
}

let entri = letter.entries()
for(let [key , values] of entri){
    console.log(key,values)
}


let person = {
    firstname:"Mahesh",
    lastname:"Kumar",
    age:22,
    gender:"male"
}

for(let key in person){
    console.log(key  , person[key])
}

for(let [key , value] in person.entries()){
    console.log(key , value)
}