import { existsSync, mkdirSync, writeFileSync } from "fs"
import { join } from "path"

const [day] = process.argv.slice(2)

if (isNaN(Number(day))) {
	throw new Error("Provided arg is not a number")
}

const INPUT_URL = `https://adventofcode.com/2022/day/${day}/input`

const DIR = `./${day}`

if (existsSync(DIR)) {
	throw new Error(`Directory for day: ${day} already exists`)
}

const data = await fetch(INPUT_URL.toString(), {
	headers: {
		Cookie: `session=${process.env.SESSION_COOKIE}`
	}
})

const dataText = await data.text()

mkdirSync(DIR)
writeFileSync(join(DIR, "input.txt"), dataText)
writeFileSync(join(DIR, "4.ts"), `
import { readFileSync } from "fs"

const input = readFileSync("./input.txt", "utf8")
`.trim())
