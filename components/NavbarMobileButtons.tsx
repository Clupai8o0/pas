"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "./Button";

const NavbarMobileButtons = () => {
	const pathname = usePathname();

	return pathname === "/" ? (
		<Link href="/auth/login" className="w-full">
			<Button
				border="left"
				size="large"
				content="login"
				className="w-full md:w-auto"
				primary
			/>
		</Link>
	) : pathname === "/auth/login" ? (
		<Link href="/auth/sign-up" className="w-full">
			<Button
				border="left"
				size="large"
				content="sign up"
				className="w-full md:w-auto"
			/>
		</Link>
	) : (
		<Link href="/auth/login" className="w-full">
			<Button
				border="left"
				size="large"
				content="login"
				className="w-full md:w-auto"
			/>
		</Link>
	);
};

export default NavbarMobileButtons;
