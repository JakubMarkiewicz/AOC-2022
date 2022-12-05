import { readFileSync } from "fs";

const LOWER_A_POS = "a".charCodeAt(0);
const UPPER_A_POS = "A".charCodeAt(0);

const input = readFileSync("./input.txt", "utf8");
const batches = input
  .match(/(?:.+\n?){3}/g)
  ?.map((line) => line.match(/.+/g)?.map((v) => v.toString()));

if (!batches) {
  throw new Error("Invalid input");
}

function getCommon(batch: string[]): string | undefined {
  const map = new Map<string, number | null>();

  for (let i = 0; i < batch.length; i++) {
    for (const char of batch[i]) {
      if (map.get(char) === i || i === 0) {
        map.set(char, i + 1);
      }
    }
  }

  for (let [key, value] of map.entries()) {
    if (value === batch.length) {
      return key;
    }
  }
}

function getCommonValue(char: string): number {
  const pos = char.charCodeAt(0);
  if (pos < LOWER_A_POS) {
    return pos - UPPER_A_POS + 27;
  }
  return pos - LOWER_A_POS + 1;
}

let res = 0;

for (const batch of batches) {
  const common = getCommon(batch);

  if (!common) {
    console.error(`Missing value for ${batch}`);
    continue;
  }

  res += getCommonValue(common);
}

console.log(`The answer is: ${res}`);
