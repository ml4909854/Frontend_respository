function User(firstname, lastname, age, nationality) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.nationality = nationality;
}

let father = new User("pratap", "lodhi", 55, "indian");
let mother = new User("Hemlata", "Lodhi", 33, "Indian");

// Adding to prototype (correct way to add methods)
User.prototype.fullname = function() {
    return this.firstname + " " + this.lastname;
};

// Adding static property to constructor
User.prototype.status = "active";

// Testing
console.log(father.fullname()); // "pratap lodhi" - works!
console.log(mother.fullname()); // "Hemlata Lodhi" - works!

// console.log(User.status); // "active" (static property)
console.log(father.status); // undefined (not on instances)