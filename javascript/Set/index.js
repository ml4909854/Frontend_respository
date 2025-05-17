

// how to create a set to write a set there is a following property

// let letter = new Set()

// letter.add("a")
// letter.add("b")
// letter.add("c")
// console.log(letter)


// now pass a array in a set 


// let letter = new Set(["a" ,"b" , "c"])
// console.log(letter)
// console.log(letter.size)


// add a multiple elemebts

let letter = new Set()

letter.add("a")
letter.add("b")
letter.add("b")
letter.add("c")
letter.add("c")
letter.add("c")
letter.add("c")
letter.add("c")
letter.add("c")
letter.add("c")
letter.add("c")

console.log(letter , letter.size)

// now looping in the set we are use for of loop

for(let x of letter){
    console.log(x)
}