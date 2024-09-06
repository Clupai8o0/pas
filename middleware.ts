import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifySession } from "./lib/session";

export async function middleware(request: NextRequest) {
	const port = process.env.NEXT_PUBLIC_PORT;
	const url = request.url;

	const res = NextResponse.next();
	res.headers.append("Access-Control-Allow-Credentials", "true");
	res.headers.append("Access-Control-Allow-Origin", "https://clupai-pas.xyz/"); // replace this your actual origin
	res.headers.append(
		"Access-Control-Allow-Methods",
		"GET,DELETE,PATCH,POST,PUT"
	);
	res.headers.append(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	// if user has cookie
	if (request.cookies.has("session")) {
		// verify that cookie
		const session = request.cookies.get("session");
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/auth/verify-session`,
			{
				method: "POST",
				headers: {
					Cookie: `session=${session?.value};`,
				},
			}
		);
		const { success } = await resp.json();

		// if user cookie is verified
		if (success) {
			// then auto sign him in using the session
			if (url === `${port}dashboard` || url === `${port}app`)
				return res;
			return NextResponse.redirect(new URL("/dashboard", url));
		} else {
			// let him stay in home
			if (url === `${port}` || url === `${port}home`)
				return res;
			// let him stay in sign up
			if (
				url === `${port}auth/sign-up` ||
				url === `${port}sign-up` ||
				url === `${port}register`
			)
				return res;
			// let him stay in login
			if (url === `${port}auth/login` || url === `${port}login`)
				return res;

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
		return res;
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
		"/api/:path*",
	],
};
