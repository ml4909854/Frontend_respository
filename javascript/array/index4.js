

// map value map returns a new arrya only remember foreach is not return a new arrya only map , filter , find , findindex , reduce return a new array

let arr = [2,3,6,6,7,7]

let mapped = arr.map((value)=>{
    return value*2
})
console.log(mapped)

let array = ["ram" , "lakhan" ,"bharat", "shatrudhan"]
let mape = array.map((value)=>{
    
    if(value.length>5){
        return value
    }

})
console.log(mape)