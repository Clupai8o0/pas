import { cookies } from "next/headers";
import { handleError, handleSuccess, login } from "@/lib/api";
import { createCookie } from "@/lib/session";

export async function POST(req: Request) {
	try {
		const { ip, username, password } = await req.json();
		// checking if all credentials are there in body
		if (!ip || !username || !password)
			throw new Error("Missing required parameters");

		const session = await login(username, ip, password);

		//* Storing session as cookie
		createCookie(session);

		return handleSuccess("Successfully logged in user");
	} catch (e: any) {
		return handleError("Could not login user", e.message);
	}
}
