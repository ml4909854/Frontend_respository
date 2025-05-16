function longestWord(str) {
    let arr = str.split(" ");
    let longest = "";
    for (let word of arr) {
        
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

let x = longestWord("Web Development is fun");
console.log(x); // Output: "Development"