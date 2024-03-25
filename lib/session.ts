import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// todo: change secret
export const createSession = (id: string) =>
	jwt.sign(
		{
			id,
		},
		process.env.SECRET || "",
		{
			expiresIn: "3 days",
		}
	);

export const createCookie = (session: string) => {
	const today = new Date();
	cookies().set("session", session, {
		secure: true,
		httpOnly: true,
		expires: today.setDate(today.getDate() + 3),
	});
};

export const verifySession = (
	session: string
): { success: boolean; data: { id: string; exp: number } } => {
	try {
		const data: any = jwt.verify(session, process.env.SECRET || "");
		return { success: true, data };
	} catch (e: any) {
		return { success: false, data: e };
	}
};
