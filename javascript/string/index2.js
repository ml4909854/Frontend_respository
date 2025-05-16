

//  count vowels of a string

let str = "af"

function countVowels(str){

let vowel = 0

for(let i = 0; i<str.length; i++){
    if (str[i].toLowerCase() === "a" || str[i].toLowerCase() ==="e" || str[i].toLowerCase()==="i" || str[i].toLowerCase() ==="o" || str[i].toLowerCase()==="u") {
        vowel++
    }
}

return vowel
}

let x = countVowels("javaScript")
console.log(x)