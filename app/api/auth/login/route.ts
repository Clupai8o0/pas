import { cookies } from "next/headers";

import { Resp } from "@/types";
import { handleError, handleSuccess } from "@/lib/api";

export async function POST(req: Request) {
	try {
		const { ip, username, password } = await req.json();
		// checking if all credentials are there in body
		if (!ip || !username || !password)
			throw new Error("Missing required parameters");

		const resp = await fetch(`${process.env.SERVER}api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/JSON",
			},
			body: JSON.stringify({ ip, username, password }),
		});
		const { success, data, msg }: Resp = await resp.json();

		if (success) {
			const today = new Date();
			cookies().set("session", data, {
				secure: true,
				httpOnly: true,
				expires: today.setDate(today.getDate() + 3),
			});

			return handleSuccess("Successfully logged in user");
		} else throw new Error(data);
	} catch (e: any) {
		return handleError("Could not login user", e.message);
	}
}
