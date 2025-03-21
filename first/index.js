


// 1st problem
// const numbers = [1 ,2,3 ,4]
// const abc = numbers.map(item=>item=2)
// // console.log(abc)

// 2nd problme
// const numbers = [1 ,2,3 ,4]
// const abd = numbers.filter(item=>item=2)
// console.log(abd)

// function Person (name ,age){
//     this.name = name,
//     this.age = age
// }

// const myname = new Person("mahesh" , 22)
// console.log(myname)

function parent() {
    let counter = 0; // Use `let` instead of `const` to allow modification
    return function child() {
        counter += 1; // Modify the counter
        return counter; // Return the updated counter
    };
}

const childFunction = parent(); // `childFunction` now holds the `child` function

// const mahesh = (a , b)=>{
//     console.log("sridebei")
// }
// mahesh()