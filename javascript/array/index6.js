

// reduced array 

let array = [3 ,5, 6,7]
let sum = array.reduce((acc , value)=>{
return acc + value
},0)

console.log(sum)


// now we are going to use a find

let arr = [ 1 ,35 ,6 ,7, 7,8,]
let finded= arr.find((value)=>{
    return value>9
})
console.log(finded)


// now we are here to find a index of a variable

let ar  = [1 , 5, 6, 7, 8]
let index = ar.findIndex((value)=>{
    return value>6
})

console.log(index)