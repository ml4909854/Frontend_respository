

// apply Method
// the apply method is similar to the call method


const person ={
   
    fullname : function(city , country){
        return this.firstname +this.lastname +city , country
    }
}


// let myself = new Person("mahesh" , "kumar")

// using a apply method
// const result = Person.fullname.apply so we can not apply method on a construtor funtion

const person1 = {
    firstname:"mahesh",
    lastname :"Kumar"
}

const person2 = {
    firstname:"Gangan",
    lastname:"Kumar"
}

// let result = person.fullname.apply(person1)
// console.log(result)

// let result2 = person.fullname.apply(person2)
// console.log(result2)

let result3 = person.fullname.apply(person1 , ["Bhopal" , "India"])
console.log(result3)