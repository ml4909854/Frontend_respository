

let number = 12345
let str = number.toString()
let arr = str.split("")
console.log(arr)
let i = arr.length-1
let bag = ''
while(i>=0){
    bag+=arr[i]
    i--
}
let bagToNumber = Number(bag)
console.log(bagToNumber)