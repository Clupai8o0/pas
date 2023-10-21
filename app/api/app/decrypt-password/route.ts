import { NextRequest } from "next/server";
import fernet from "fernet";
import jwt from "jsonwebtoken";

import { handleError, handleSuccess } from "@/lib/api";

export async function POST(req: NextRequest) {
	try {
		const { password } = await req.json();
		if (!password) throw new Error("No password in body");

		if (req.cookies.has("session")) {
			const session = req.cookies.get("session")?.value || "",
				secret = process.env.JWT_SECRET || "";
			const decoded: any = jwt.verify(session, secret);
      const key: string = decoded.key;

			const passwordToken = new fernet.Token({
				secret: new fernet.Secret(key),
				token: password,
				ttl: 0,
			});

			return handleSuccess("Successfully decrypted password", passwordToken.decode());
		} else throw new Error("No session in cookies");
	} catch (e: any) {
		return handleError("Could not decrypt password", e);
	}
}
