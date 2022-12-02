import { readFileSync } from "fs"

const input = readFileSync("./input.txt").toString().split("\n").slice(0, -1)


enum T {
	Rock = 1,
	Paper = 2,
	Scissors = 3
}

const RULES = {
	[T.Rock]: T.Scissors,
	[T.Paper]: T.Rock,
	[T.Scissors]: T.Paper,
}

const L_RULES: { [Key in T as number]: T } = Object.fromEntries(Object.entries(RULES).map(([a, b]) => [b, +a]))

const O_MAPPER = {
	A: T.Rock,
	B: T.Paper,
	C: T.Scissors
}

let result = 0

for (const round of input) {
	const [opponent, player] = round.split(" ")

	const opponent_T = O_MAPPER[opponent]

	switch (player as "Z" | "X" | "Y") {
		case 'Z':
			const toWin = L_RULES[opponent_T]
			result += 6 + toWin
			break
		case 'X':
			const toLose = RULES[opponent_T]
			result += toLose
			break
		default:
			result += 3 + opponent_T
	}

}

console.log(result)
