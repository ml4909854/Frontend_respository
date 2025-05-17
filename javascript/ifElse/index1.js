

// daty of the week 

let d = new Date()
let Day = d.getDay()
console.log(Day)
switch (Day) {
    case 1:
        console.log("Monday")
        break;
    case 2:
        cnsole.log("Tuesday")
        break;
    case 3:
        console.log("Wedday")
        break;
    case 4:
        console.log("thursday")
        break;
    case 5:
        console.log("friday")
        break;
    case 6:
        console.log("saturday")
        break;
    case 7:
        console.log("sunday")
        break;
    
    default:
        console.log("Invalid day")
        break;
}