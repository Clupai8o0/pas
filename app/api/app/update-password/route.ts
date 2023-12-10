import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";

export async function PUT(req: NextRequest) {
	try {
		const { passwordId, title, password, url, username, email } =
			await req.json();

		if (passwordId) {
			const update: any = {};
			if (title) update["title"] = title;
			if (password) update["password"] = password;
			if (url) update["url"] = url;
			if (username) update["username"] = username;
			if (email) update["email"] = email;

			if (req.cookies.has("session")) {
				const session = req.cookies.get("session")?.value || "";
				const { success, data: user } = verifySession(session);

				if (success) {
					await supabase
						.from("passwords")
						.update(update)
						.eq("userId", user.id)
						.eq("id", passwordId);
					return handleSuccess("Successfully updated user password");
				} else throw new Error("Invalid session in cookies");
			} else throw new Error("No session in cookies");
		} else throw new Error("Missing required parameter passwordId in body");
	} catch (e: any) {
		return handleError("Could not update password", e);
	}
}
