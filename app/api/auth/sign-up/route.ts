import { cookies } from "next/headers";

import { handleSuccess, handleError } from "@/lib/api";
import { Resp } from "@/types";

export async function POST(req: Request) {
	try {
		const { email, username, password, ip } = await req.json();
		if (!email || !username || !password || !ip)
			throw new Error("Missing parameter");

		const resp = await fetch(`${process.env.SERVER}api/create-user`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/JSON",
			},
			body: JSON.stringify({
				ip,
				email,
				username,
				password,
			}),
		});
		const { success, data }: Resp = await resp.json();

		if (success) {
			const today = new Date();
			cookies().set("session", data, {
				secure: true,
				httpOnly: true,
				expires: today.setDate(today.getDate() + 3),
			});

			return handleSuccess("Successfully created user", null, 201);
		} else throw new Error(data);
	} catch (e: any) {
		return handleError(
			"There was an error while trying to sign up user",
			e.message
		);
	}
}
