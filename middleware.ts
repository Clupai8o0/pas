import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Resp } from "./types";

export async function middleware(request: NextRequest) {
	const port = process.env.NEXT_PUBLIC_PORT;
  const url = request.url;

	// if user has cookie
	if (request.cookies.has("session")) {
		// verify that cookie
		const session = request.cookies.get("session");
		const verifyResp = await fetch(
			`${process.env.SERVER}api/verify-session`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${session?.value}`,
				},
			}
		);
		const { success }: Resp = await verifyResp.json();

		// if user cookie is verified
		if (success) {
			// then auto sign him in using the session
			if (url === `${port}dashboard` || url === `${port}app`)
				return NextResponse.next();
			return NextResponse.redirect(new URL("/dashboard", url));
		} else {
			// let him stay in home
			if (url === `${port}` || url === `${port}home`)
				return NextResponse.next();
			// let him stay in sign up
			if (
				url === `${port}auth/sign-up` ||
				url === `${port}sign-up` ||
				url === `${port}register`
			)
				return NextResponse.next();
			// let him stay in login
			if (url === `${port}auth/login` || url === `${port}login`)
				return NextResponse.next();

			// if he was in dashboard and session is not verified
			// take him to login
			return NextResponse.redirect(new URL("/auth/login", url));
		}
	} else {
		// if user does not have session cookie
		// and if they try to open the dashboard
		// throw them to login
		if (url === `${port}dashboard` || url === `${port}app`)
			return NextResponse.redirect(new URL("/auth/login", url));

		// otherwise leave him at his place
		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		"/app",
		"/home",
		"/sign-up/",
		"/login",
		"/register",
		"/dashboard",
		"/auth/login",
		"/auth/sign-up",
		"/",
	],
};
