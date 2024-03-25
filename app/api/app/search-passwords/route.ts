import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";
import { supabase } from "@/lib/db";
import { uniquePasswords } from "@/lib/utils";
import { iPassword } from "@/types";

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
				let data: iPassword[];
				if (query.length === 0) {
					const { data: results } = await supabase
						.from("passwords")
						.select("*")
						.eq("userId", user.id);

					data = results || [];
				} else {
					const results: iPassword[] = [];
					await Promise.all(
						query.split(" ").map(async (keyword) => {
							const { data: titleData } = await supabase
								.from("passwords")
								.select("*")
								.ilike("title", `%${keyword}%`);
							const { data: urlData } = await supabase
								.from("passwords")
								.select("*")
								.ilike("url", `%${keyword}%`);
							const { data: usernameData } = await supabase
								.from("passwords")
								.select("*")
								.ilike("username", `%${keyword}%`);
							const { data: emailData } = await supabase
								.from("passwords")
								.select("*")
								.ilike("email", `%${keyword}%`);

							results.push(...(titleData || []));
							results.push(...(urlData || []));
							results.push(...(usernameData || []));
							results.push(...(emailData || []));
						})
					);

					data = uniquePasswords(results);
				}

				return handleSuccess("Successfully received user passwords", data);
			} else throw new Error("Invalid session in cookies");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not get passwords", e);
	}
}
