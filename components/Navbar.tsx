"use server";

import { cookies } from "next/headers";
import Link from "next/link";

import NavbarMobileButtons from "./NavbarMobileButtons";
import ButtonSignOut from "./ButtonSignOut";
import Button from "./Button";

async function isSignedIn() {
	if (cookies().has("session")) {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/auth/verify-session`,
			{
				method: "POST",
				headers: {
					Cookie: `session=${cookies().get("session")?.value};`,
				},
			}
		);
		const { success } = await resp.json();

		if (success) return true;
	}

	return false;
}

const Navbar = async () => {
	const signedIn = await isSignedIn();

	return (
		<nav
			className={`border-b border-white flex items-center ${
				!signedIn ? "md:justify-between" : "justify-end"
			} text-white`}
		>
			{!signedIn && (
				<Link href="/" className="w-1/2 md:w-auto">
					<Button
						border="right"
						content="pas"
						size="large"
						className="w-full md:w-auto"
					/>
				</Link>
			)}

			{/* Desktop & Tablet */}
			<div className="hidden md:flex">
				{signedIn ? (
					<ButtonSignOut />
				) : (
					<>
						<Link href="/auth/login">
							<Button border="left" size="large" content="login" />
						</Link>
						<Link href="/auth/sign-up">
							<Button border="left" primary size="large" content="sign up" />
						</Link>
					</>
				)}
			</div>

			{/* Mobile */}
			<div className="flex md:hidden w-1/2">
				{signedIn ? <ButtonSignOut /> : <NavbarMobileButtons />}
			</div>
		</nav>
	);
};

export default Navbar;
