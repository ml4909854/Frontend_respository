

const obj = {
    firstname:"mahesh",
    lastname:"kumar",
    age:22,
    nationality:"Indian"
}

// add the object method outside of the object

obj.fullname = function(){
    return this.firstname + this.lastname
}

console.log(obj.fullname())