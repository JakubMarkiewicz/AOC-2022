import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const lines = input.match(/.+/g);

if (!lines) {
  throw new Error("Invalid input");
}

const STACK_BASE_LINE = lines.findIndex((v) => v.startsWith(" 1 "));
const NUMBERS = lines[STACK_BASE_LINE].match(/\d+/g);
const SIZE = Number(NUMBERS?.[NUMBERS.length - 1]);

const STACK: string[][] = Array.from({ length: SIZE }).map(() => []);

for (let i = STACK_BASE_LINE - 1; i >= 0; i--) {
  const line = lines[i];
  const elements = line?.match(/.{1,4}/g)?.map((v) => v.match(/\w/g)?.[0]);

  if (!elements) {
    throw new Error("Error reading stack line");
  }

  for (let j = 0; j < elements.length; j++) {
    const element = elements[j];
    if (element) {
      STACK[j].push(element);
    }
  }
}

for (let i = STACK_BASE_LINE + 1; i < lines.length; i++) {
  const [count, move_from, move_to] = lines[i].match(/\d+/g) as string[];

  const items = STACK[Number(move_from) - 1].splice(-Number(count));
  STACK[Number(move_to) - 1].push(...items);
}

console.log(
  `The result is: ${STACK.reduce((acc, v) => acc + v[v.length - 1], "")}`
);
