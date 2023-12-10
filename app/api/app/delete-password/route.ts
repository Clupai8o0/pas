import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";

export async function DELETE(req: NextRequest) {
	try {
		const { passwordId } = await req.json();

		if (passwordId) {
			if (req.cookies.has("session")) {
				const session = req.cookies.get("session")?.value || "";
				const { success, data: user } = verifySession(session);

				if (success) {
					await supabase
						.from("passwords")
						.delete()
						.eq("userId", user.id)
						.eq("id", passwordId);
					return handleSuccess("Successfully deleted user password");
				} else throw new Error("Invalid session in cookies");
			} else throw new Error("No session in cookies");
		} else throw new Error("Missing required parameter passwordId in body");
	} catch (e: any) {
		return handleError("Could not delete password", e);
	}
}
