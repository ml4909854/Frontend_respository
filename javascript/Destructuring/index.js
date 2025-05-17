

// object destructuring

let person = {
    firstname:"mahesh",
    lastname:"Kumar",
    age:23
}

// let {firstname , lastname} = person
// for object destruturing we are use a object like brakets
// console.log(firstname ,lastname)
// the order of properties does not matter
// let {lastname , firstname} = person
// imp detsrturutin is not destrutive destruturing does not change the original object
// console.log(firstname ,lastname)

// object Default Values
// let {firstname , lastname , nationality="Indian" } = person
// console.log(firstname , lastname , nationality)


// // Object Property Alias

// let {lastname:name} = person
// console.log(name) we are use a name like these kind of the properties

// String Destructuring
// let string = "Mahesh"
// let [a1 , a2 , a3 , a4] = string
// console.log(a1 ,a2 , a3 , a4) Destruting can be used with any iterables

// // Arrray Destruturing
// // we can pick up array variables into our own variables
// const fruits = ["Apple" , "Mango" , "Bananna" , "Papaya"]
// let [fruit1 , fruit2] = fruits
// console.log(fruit1 , fruit1)

// Rest Operator
// let array = [1 , 2, 3, 4, 5, 6]
// let [a1 , a2 , ...a3] = array
// console.log(a1 , a2 ,a3)


// const fruits = ["Apple" , "Mango"  , "banana" , "papaya" , "NuclearWeapon"]
// let [fruit1 ,,, fruit2] = fruits
// console.log(fruit1 , fruit2)


/// using Destruting we can swap the elements
let firstName = "John";
let lastName = "Doe";

// Destructing
[firstName, lastName] = [lastName, firstName];
console.log(firstName , lastName)