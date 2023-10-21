import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";

export async function POST(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			const { username, password, email, url, title } = await req.json();

			if (password && url && title) {
				const resp = await fetch(`${process.env.SERVER}api/create-password`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${req.cookies.get("session")?.value}`,
						"Content-Type": "Application/JSON",
					},
					body: JSON.stringify({
						username,
						password,
						email,
						url,
						title,
					}),
				});
				const { success, data } = await resp.json();

				if (success) return handleSuccess("Successfully created password");
				else throw new Error(data);
			} else throw new Error("Missing parameters for creating password");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not create password", e);
	}
}
