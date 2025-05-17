const text = "Hello World";
let count = 0;
for (let x in text) {
  console.log(text[x]);
  if ("aeiouAEIOU".includes(text[x])) {
    count++;
  }
}
console.log(count);
