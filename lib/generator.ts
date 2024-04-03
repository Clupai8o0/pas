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
		if (letter === "a")
			return randomizedLetter(["@", "a", "A", "&", "~", "^", "v", "V"]);
		if (letter === "b")
			return randomizedLetter(["[", "{", "b", "B", "(", "6", "p", "P"]);
		if (letter === "c")
			return randomizedLetter(["<", "c", "C", "?", "s", "S", "2", "5", "7"]);
		if (letter === "d")
			return randomizedLetter(["5", "d", "D", "]", "}", ")", "p", "P"]);
		if (letter === "e")
			return randomizedLetter(["3", "e", "E", "!", "_", "=", "f", "F"]);
		if (letter === "f")
			return randomizedLetter(["4", "f", "F", "$", "7", "-", ":", ";", "["]);
		if (letter === "g")
			return randomizedLetter(["?", "g", "G", "[", "6", "8", "9"]);
		if (letter === "h")
			return randomizedLetter(["5", "h", "H", "||", "#", "p", "P"]);
		if (letter === "i")
			return randomizedLetter(["1", "i", "I", "|", "/", "\\", "7"]);
		if (letter === "j")
			return randomizedLetter(["#", "j", "J", "|", ",", "}", ")", "]", ">"]);
		if (letter === "k")
			return randomizedLetter(["k", "K", "4", "<", "{", "[", "(", "\\"]);
		if (letter === "l")
			return randomizedLetter(["1", "l", "L", "_", "|_", "/_", "<", ";"]);
		if (letter === "m")
			return randomizedLetter(["m", "M", "3", "n", "N", "~", ".", "?"]);
		if (letter === "n")
			return randomizedLetter(["n", "N", "m", "M", "*", "-", "_", "+", "="]);
		if (letter === "o")
			return randomizedLetter(["0", "o", "O", ".", ",", "`", "*", "'", "()"]);
		if (letter === "p")
			return randomizedLetter(["9", "p", "P", "b", "(", ":", "?", "+", "&"]);
		if (letter === "q")
			return randomizedLetter(["8", "q", "Q", "?", "0", "(),", "[]."]);
		if (letter === "r")
			return randomizedLetter(["7", "r", "R", "p", "P", "(\\", "$", "&", "("]);
		if (letter === "s")
			return randomizedLetter(["$", "s", "S", ")", "]", "~", "?", "&"]);
		if (letter === "t")
			return randomizedLetter(["7", "t", "T", "|", "-", "/", "\\", "l", "L"]);
		if (letter === "u")
			return randomizedLetter(["u", "U", "[", "(", "^", "<", "_", "="]);
		if (letter === "v")
			return randomizedLetter(["v", "V", "<", ">", "\\/", "\\_/"]);
		if (letter === "w")
			return randomizedLetter(["w", "W", ":", "{", "}", "_", "~", "\\/\\/"]);
		if (letter === "x")
			return randomizedLetter(["#", "x", "X", "k", "K", "=", "+"]);
		if (letter === "y")
			return randomizedLetter(["y", "Y", "+", "\\|/", "4", "k", "K"]);
		if (letter === "z")
			return randomizedLetter(["z", "Z", "-\\_", "-/_", "?", "3", "7", "="]);
		if (letter === "-")
			return randomizedLetter(["-", "_", "~", ".", ",", "^", "=", "+"]);
	});

	const password = finalArr.join("");
	return {
		phrase,
		password,
	};
};
