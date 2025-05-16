

// check palindrome


let Input = "A , a plan, a canal: Panama"
let str  = Input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
let Output = ""
for(let i = str.length-1 ; i>=0; i--){
    Output+=str[i]
}
if(str === Output){
    console.log("Yes")
}else{
    console.log("no")
}