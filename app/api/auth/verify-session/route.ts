import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { Resp } from "@/types";

export async function POST(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			const session = req.cookies.get("session");
			const resp = await fetch(`${process.env.SERVER}api/verify-session`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${session?.value}`,
				},
			});
			const { success }: Resp = await resp.json();

			if (success) return handleSuccess("Session verified");
			else throw new Error("Session not verified");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not verify session", e);
	}
}
