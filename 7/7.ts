import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const lines = input.match(/.+/g);

if (!lines) {
  throw new Error("Invalid input");
}

type Dir = {
  files: Record<string, number>;
  dirs: Record<string, Dir>;
  size: number;
  parent?: string;
};

const root: Dir = { files: {}, dirs: {}, size: 0 };
let currentPath = "";

function getWorkingDir(): Dir {
  const path = currentPath.split(".").filter(Boolean);

  if (!path || path.length === 0) {
    return root;
  }

  let current = root.dirs;

  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]].dirs;
  }

  return current[path[path.length - 1]];
}

function buildSizeUp(size: number) {
  const path = currentPath.split(".").filter(Boolean);
  let current = root;
  for (let i = 0; i < path.length; i++) {
    current.size += size;
    current = current.dirs[path[i]];
  }
}

for (const line of lines) {
  const tokens = line.split(" ");

  if (tokens[0] === "$") {
    const [, cmd, param] = tokens;
    if (cmd === "cd" && param === "..") {
      currentPath = currentPath.match(/(.+)(?:\.\w+)/)?.[1] ?? "";
    } else if (cmd === "cd" && param !== "/") {
      currentPath = `${currentPath}${currentPath ? "." : ""}${param}`;
    }
  } else {
    const workingDir = getWorkingDir();
    const type: "file" | "dir" = tokens[0] === "dir" ? "dir" : "file";
    if (type === "dir") {
      Object.assign(workingDir.dirs, {
        [tokens[1]]: { files: {}, dirs: {}, size: 0 },
      });
    } else {
      const size = Number(tokens[0]);

      Object.assign(workingDir.files, {
        [tokens[1]]: size,
      });
      workingDir.size += size;
      buildSizeUp(size);
    }
  }
}

const stack = Object.values(root.dirs);

const TOTAL = 70000000;
const LIMIT = 100000;

const freeSpace = TOTAL - root.size;
const toFree = 30000000 - freeSpace;

let result = 0;
let closest = root.size;

while (stack.length > 0) {
  const dir = stack.shift();
  if (!dir) {
    continue;
  }
  if (dir.size <= LIMIT) {
    result += dir.size;
  }
  if (dir.size < closest && dir.size > toFree) {
    closest = dir.size;
  }
  stack.push(...Object.values(dir?.dirs ?? {}));
}

console.log(TOTAL - root.size);

console.log(`Answer is: ${result}`);
console.log(`Answer 2 is: ${closest}`);
