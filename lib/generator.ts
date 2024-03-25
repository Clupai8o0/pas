import words from "./words.json";

const randomizedLetter = (options: string[]) =>
	options[Math.floor(Math.random() * options.length)];

export const generatePassword = () => {
	// generate a phrase
	let phrase = "";
	for (let i = phrase.length; i < 12; i++) {
		const randomWord = words[Math.floor(Math.random() * words.length)];
		phrase += `${randomWord}-`; // todo: no - at the end
		i += randomWord.length;
	}
	phrase = phrase.slice(0, phrase.length - 1);

	// make it cryptic
	const finalArr = phrase.split("").map((letter) => {
		if (letter === "a") return randomizedLetter(["@", "a", "A"]);
		if (letter === "b") return randomizedLetter(["[", "{", "b", "B", "(", "6"]);
		if (letter === "c") return randomizedLetter(["<", "c", "C"]);
		if (letter === "d") return randomizedLetter(["5", "d", "D", "]", "}", ")"]);
		if (letter === "e") return randomizedLetter(["3", "e", "E"]);
		if (letter === "f") return randomizedLetter(["4", "f", "F"]);
		if (letter === "g") return randomizedLetter(["?", "g", "G"]);
		if (letter === "h") return randomizedLetter(["5", "h", "H"]);
		if (letter === "i") return randomizedLetter(["1", "i", "I"]);
		if (letter === "j") return randomizedLetter(["#", "j", "J"]);
		if (letter === "k") return randomizedLetter(["k", "K"]);
		if (letter === "l") return randomizedLetter(["1", "l", "L"]);
		if (letter === "m") return randomizedLetter(["m", "M"]);
		if (letter === "n") return randomizedLetter(["n", "N"]);
		if (letter === "o") return randomizedLetter(["0", "o", "O"]);
		if (letter === "p") return randomizedLetter(["9", "p", "P"]);
		if (letter === "q") return randomizedLetter(["8", "q", "Q"]);
		if (letter === "r") return randomizedLetter(["7", "r", "R"]);
		if (letter === "s") return randomizedLetter(["$", "s", "S"]);
		if (letter === "t") return randomizedLetter(["7", "t", "T"]);
		if (letter === "u") return randomizedLetter(["u", "U"]);
		if (letter === "v") return randomizedLetter(["v", "V"]);
		if (letter === "w") return randomizedLetter(["w", "W"]);
		if (letter === "x") return randomizedLetter(["#", "x", "X"]);
		if (letter === "y") return randomizedLetter(["y", "Y"]);
		if (letter === "z") return randomizedLetter(["z", "Z"]);
		if (letter === "-") return "-";
	});

	const password = finalArr.join("");
	return {
		phrase,
		password,
	};
};
