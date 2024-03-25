import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";
import { verifySession } from "@/lib/session";

export async function POST(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			const session = req.cookies.get("session");
			const { success } = verifySession(session?.value || "");

			if (success) return handleSuccess("Session verified");
			else throw new Error("Session not verified");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not verify session", e);
	}
}
