import { NextRequest } from "next/server";

import { handleError, handleSuccess } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    if (req.cookies.has("session")) {
			const resp = await fetch(`${process.env.SERVER}api/get-passwords`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${req.cookies.get("session")?.value}`,
				},
			});
			const { success, data } = await resp.json();

			if (success)
				return handleSuccess("Successfully received user passwords", data)
			else throw new Error(data);
		} else throw new Error("No session in cookies");
  } catch (e: any) {
    return handleError("Could not get passwords", e)
  }
}