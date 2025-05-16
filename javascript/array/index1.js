

const array = [12 ,14 , 15 ,20 , 18 ,30 ,40]
// find method
// 
let first = array.find((value , index , arr)=>{
    return  value>18
})
console.log(first)  // we find the largest element according to the my value is 20

// no we are find a last element//

// let last = array.findLast((value , index , array)=>{
//     value>30
// now there is now variable present related to the findlast sorry masai
// console.log(last)