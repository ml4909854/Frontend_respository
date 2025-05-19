

//  blind method 

const person = {
    firstname:"Mahesh",
    lastname:"kumar",
    display:function(){
        return this.firstname+this.lastname
    }
}

let display = person.display.bind(person)
setTimeout(() => {
    console.log(display())
}, 3000);