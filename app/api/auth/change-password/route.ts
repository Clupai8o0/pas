import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";

import { supabase } from "@/lib/db";
import { checkPassword, hashPassword } from "@/lib/hasher";

export async function POST(req: NextRequest) {
	try {
		const { password, newPassword } = await req.json();
		if (!password || !newPassword) throw new Error("Missing required params");

		if (req.cookies.has("session")) {
			const session = req.cookies.get("session");
			const { success, data } = verifySession(session?.value || "");
			if (!success || !data?.id) throw new Error("Invalid session in cookies");
			const { id } = data;

			const { data: user } = await supabase
				.from("users")
				.select("password")
				.eq("id", id);
			if (user) {
				const hashedPassword = user[0]?.password || "";

				if (checkPassword(password, hashedPassword)) {
					await supabase
						.from("users")
						.update({ password: hashPassword(newPassword) })
						.eq("id", id);
					return handleSuccess("Successfully updated password");
				} else throw new Error("Wrong password");
			} else throw new Error("No data came from database");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not change password", e);
	}
}
