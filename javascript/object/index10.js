

// object methods

let obj = {
   firstname:"mahesh",
   lastname:"kumar",
    age:22,
    nationality:"Indian",
    year:1922,
    fullname:function(){
        return this.firstname + this.lastname
    }
}
console.log(obj.fullname())


