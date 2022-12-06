import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const SIZE = 14;

let current = input.slice(0, SIZE).split("");

for (let i = SIZE; i < input.length; i++) {
  current.shift();
  current.push(input[i]);

  const set = new Set(current);
  if (set.size === SIZE) {
    console.log(`Answer is ${i + 1}`);
    break;
  }
}
