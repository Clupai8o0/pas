import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { handleError, handleSuccess } from "@/lib/api";

export async function DELETE(req: NextRequest) {
	try {
		if (req.cookies.has("session")) {
			cookies().delete("session");
			return handleSuccess("Successfully signed out");
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not sign out properly", e);
	}
}
