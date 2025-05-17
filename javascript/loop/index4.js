// sum of even Numbers in an Array

const numbers = [1, 2, 3, 4, 5, 6];

let sum = 0;
for (let number in numbers) {
  console.log(numbers[number]);
  if (numbers[number] % 2 === 0) {
    sum += numbers[number];
  }
}
console.log(sum);
