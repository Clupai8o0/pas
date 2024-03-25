import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";

export async function GET(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			const session = req.cookies.get("session")?.value || "";
			const { success, data: user } = verifySession(session);

			if (success) {
				const { data, error } = await supabase
					.from("passwords")
					.select("*")
					.eq("userId", user.id);
				if (error) throw new Error(error.message);
				return handleSuccess("Successfully received user passwords", data);
			} else throw new Error("Invalid session in cookies");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not get passwords", e);
	}
}
