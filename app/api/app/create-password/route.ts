import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			const { username, password, email, url, title } = await req.json();

			if (password && url && title) {
				// check if it has session
				if (req.cookies.has("session")) {
					const session = req.cookies.get("session")?.value || "";

					// verify session
					const { success, data: user } = verifySession(session);
					if (success) {
						await supabase.from("passwords").insert({
							userId: user.id,
							title: title.toLowerCase(),
							url: url.toLowerCase(),
							username: username,
							email: email.toLowerCase(),
							password: password,
						});

						return handleSuccess("Successfully created password");
					} else throw new Error("Invalid session in cookies");
				} else throw new Error("Missing session in cookies");
			} else throw new Error("Missing parameters for creating password");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not create password", e);
	}
}
