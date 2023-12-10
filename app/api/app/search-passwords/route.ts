import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get("q") || "";
		const splitQuery = query.split(" ");
		const quotedQuery = splitQuery.map((word) => `'${word.toLowerCase()}'`);
		const finalQuery = quotedQuery.join(" | ");

		if (req.cookies.has("session")) {
			const session = req.cookies.get("session")?.value || "";
			const { success, data: user } = verifySession(session);

			if (success) {
				//* in case query is empty return all
				let data: any;
				if (query.length === 0)
					data = await supabase
						.from("passwords")
						.select("*")
						.eq("userId", user.id);
				else
					data = await supabase
						.from("passwords")
						.select("*")
						.textSearch("search_passwords_1", finalQuery)
						.eq("userId", user.id);

				return handleSuccess("Successfully received user passwords", data.data);
			} else throw new Error("Invalid session in cookies");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not get passwords", e);
	}
}
