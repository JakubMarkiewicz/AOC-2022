import { readFileSync } from "fs"

const input = readFileSync("./input.txt", "utf8")
const lines = input.match(/.+/g)?.map(v => v.split(","))

if (!lines) {
	throw new Error("Missing input")
}

const records = lines.map(line => line.map(v => v.split("-").map(Number)))

let res = 0

for (const record of records) {
	const [[minA, maxA], [minB, maxB]] = record

	if (maxA >= minB && minA <= maxB) {
		res += 1
	}
}


console.log(`Answer is: ${res}`)
