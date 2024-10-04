import colors from "colors";
import { NextResponse } from "next/server";
import { supabase } from "./db";
import { checkPassword } from "./hasher";
import { createSession } from "./session";

function response(success: boolean, msg: string, data?: any) {
	return {
		success,
		msg,
		data,
	};
}

export function handleSuccess(msg: string, data?: any, status?: number) {
	console.log(colors.underline(colors.green(`✅ ${msg}`)));
	return NextResponse.json(response(true, msg, data), {
		status: status ? status : 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}

export function handleError(msg: string, err?: any, status?: number) {
	console.log(colors.underline(colors.red(`❌ ${msg}`)));
	console.error(err);
	return NextResponse.json(response(false, msg, err.message), {
		status: status ? status : 500,
	});
}

function canLogin(logins: any) {
	let attempts = 5;
	logins.forEach((login: any) => {
		// if login is within 5 minutes
		const today = new Date();
		const loginTimestamp = new Date(login.date);
		if (
			new Date(today.getTime() - loginTimestamp.getTime()).getMinutes() <= 10
		) {
			if (!login.success) attempts--; // failed login
		}
	});

	return attempts > 0;
}

export const login = async (username: string, ip: string, password: string) => {
	//? Give 4 attempts for the right account and password
	//? get the user ip address
	//? check login history of that ip address
	//? if user had attempted to login more than 5 times in the last 5 minutes, block him out for the next 5 minutes
	const logins = await supabase.from("logins").select("*").eq("ip", ip);
	if (!canLogin(logins.data)) throw new Error("attempt-exceeded");

	//* Checking if user exists
	const users = await supabase
		.from("users")
		.select("id, email, password")
		.eq("username", username);
	if (users.data === null || users.data?.length === 0)
		throw new Error("wrong-credentials"); // wrong username

	//* Checking password
	const user = users.data[0];
	if (!checkPassword(password, user.password)) {
		await supabase.from("logins").insert({
			userId: user.id,
			ip,
			success: false,
		});
		throw new Error("wrong-credentials"); // wrong password
	}

	//* Creating session
	const session = createSession(user.id);

	//* Adding login
	await supabase.from("logins").insert({
		token: session,
		userId: user.id,
		ip,
		success: true,
	});

	return session;
};
