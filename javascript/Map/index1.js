let map = new Map();

map.set("apple", 500);
map.set("mango", 300);
map.set("banna", 800);

// console.log(map)
let result = map.get("apple");
// console.log(result)
// map.set("apple" , 200)
// console.log(map)
// console.log(map.size)
// console.log(map.de)
// map.delete("apple")
// console.log(map)
// map.set("apple" , 200)
// console.log(map)
// map.clear()
// console.log(map)

// map.forEach((value , index)=>{
//     console.log(index + "=" + value)
// })

// using for of loop
// for(let x of map.entries()){
//     console.log(x)  all the arrys printed
// }

// using keys method
for(let x of map.keys()){
    console.log(x)
}

// using values method in map 
for(let x of map.values()){
    console.log(x)
}

let hash = map.has("apple")
console.log(hash)

// okay now we are end the chapter of map here