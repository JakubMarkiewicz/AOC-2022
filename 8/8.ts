import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const lines = input.match(/.+/g);

if (!lines) {
  throw new Error("Invalid input data");
}

const trees = lines.map((line) => line.split("").map(Number));

type Directions = "top" | "bottom" | "left" | "right";
type View = Record<Directions, number>;

let top = 0;

for (let y = 1; y < lines.length - 1; y++) {
  for (let x = 1; x < lines[0].length - 1; x++) {
    const tree = trees[y][x];
    const view: View = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    let i = 1;
    // horizontal
    while (trees[y][x + i] !== undefined || trees[y][x - i] !== undefined) {
      if (trees[y][x - i] >= tree && !view.left) {
        view.left = i;
      }
      if (trees[y][x + i] >= tree && !view.right) {
        view.right = i;
      }
      i++;
    }
    i = 1;
    while (trees[y + i]?.[x] !== undefined || trees[y - i]?.[x] !== undefined) {
      if (trees[y - i]?.[x] >= tree && !view.top) {
        view.top = i;
      }
      if (trees[y + i]?.[x] >= tree && !view.bottom) {
        view.bottom = i;
      }
      i++;
    }

    top = Math.max(
      top,
      (view.bottom || lines.length - 1 - y) *
        (view.top || y) *
        (view.right || lines[0].length - 1 - x) *
        (view.left || x)
    );
  }
}
console.log(top);
