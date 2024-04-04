import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { Victor_Mono } from "next/font/google";

import { iPassword } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateKey = () => v4();

export function uniquePasswords(passwords: iPassword[]) {
	const ids = passwords.map((password) => password.id);
	const uniqueIds = [...new Set(ids)];

	return uniqueIds.map((id) => {
		let index = 0;
		passwords.forEach((password, i) => {
			if (password.id === id) index = i;
		});

		return passwords[index];
	});
}

export const font = Victor_Mono({ subsets: ["latin"] });
