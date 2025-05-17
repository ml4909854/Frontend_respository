

// // class is used to creating a objects or we can say that class is a machine to creating a object
// class Person{
//     constructor(firstname , lastname){
//         this.firstname = firstname
//         this.lastname = lastname
//     }
// }

// // now created a some object with the help of class contructoru//

// let myself = new Person("mahesh" , 'kumar')
// let father = new Person("Pratap" , "singh")
// let mother = new Person("Hemlata" , "Lodhi")

// // console.log(myself , father , mother)
// //now we are learn to read like how to create a class container

// // how to add a methods in class

class Person{
    constructor(firstname, lastname){
        this.firstname = firstname
        this.lastname = lastname
    }
    fullname(){ // this is the way to add a methods in a classes
        return this.firstname + " " + this.lastname
    }
}

let myself = new Person("mahesh" , "Kumar")
let father = new Person("Pratap" , "Lodhi")
let mother = new Person("Hemlata" , "Lodhi")


// now we are fully learn how the classes work and how the contrutor fuction works
// now it looks good for me like how i proceed It will i dont know

console.log(myself.fullname())