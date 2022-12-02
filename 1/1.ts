import { readFileSync } from "fs"

const input: string = readFileSync("./input.txt", "utf8")
const elfs = input.split("\n\n")

const sum = (arr: (number | string)[]): number => arr.reduce<number>((a, b) => Number(a) + Number(b), 0)
const totals = elfs.map(v => v.split("\n")).map(sum)
const sorted = totals.sort((a, b) => b - a)

const result = sum(sorted.slice(0, 3))

console.log(result)
