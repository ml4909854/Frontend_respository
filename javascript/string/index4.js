


// truncate a string

function truncateString(str , maxLength){

if(str.length<=maxLength){
    return str
}else if(str.length>maxLength){
    return str.slice(0 , maxLength)+"..."
}
}

const x = truncateString("This is a long string" ,10)
console.log(x)

