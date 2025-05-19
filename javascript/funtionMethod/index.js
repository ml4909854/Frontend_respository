

/// javascript call methods


const person = {
    fullname:function(city , country){
        return this.firstname + this.lastname +city +country
    }
}

const person1  = {
    firstname:"mahesh",
    lastname:"lodhi"
}

const person2 = {
    firstname:"Ankit",
    lastname:"lodhi"
}

// console.log(person.fullname())

// here like how to use the method

let result = person.fullname.call(person1)
// console.log(result)

// to call the funtion usingfull method of person, using it on person2

let result2 = person.fullname.call(person2)
// console.log(result2)


// The call mtehod with Arguments

let result3 = person.fullname.call(person1 , "Bhopal" , "India")
console.log(result3)