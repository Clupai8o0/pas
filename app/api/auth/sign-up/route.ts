import { handleSuccess, handleError, login } from "@/lib/api";

import { supabase } from "@/lib/db";
import { hashPassword } from "@/lib/hasher";
import { createCookie } from "@/lib/session";

export async function POST(req: Request) {
	try {
		const { email, username, password, ip } = await req.json();
		if (!email || !username || !password || !ip)
			throw new Error("Missing parameter");

		//* Creating a user
		const { data, error } = await supabase.from("users").insert({
			ip: ip,
			username: username,
			email: email,
			password: hashPassword(password),
		});
		if (error?.code === "23505") throw new Error("exists");

		//* Adding to login
		const session = await login(username, ip, password);

		//* Setting cookie
		createCookie(session);

		return handleSuccess("Successfully created user", null, 201);
	} catch (e: any) {
		return handleError(
			"There was an error while trying to sign up user",
			e.message
		);
	}
}
