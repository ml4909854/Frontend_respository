


const user = {
    username:"maheshKumar",
    password:"mahesh@134",
    age:22
}

function check(){
    for(let key in user){
      if(key === "age"){
        console.log(key)
        return "Key is present"
      }
    }
    return "Key is not present"
}

let x = check()
console.log(x)