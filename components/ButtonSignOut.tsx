"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import { Resp } from "@/types";

const SignOutButton = () => {
	const [signingOut, setSigningOut] = useState(false);
	const router = useRouter();

	const signOut = async () => {
		setSigningOut(true);
		const resp = await fetch(
	
		`${process.env.NEXT_PUBLIC_PORT}api/auth/sign-out`,
			{
				method: "DELETE",
			}
		);
		const { success }: Resp = await resp.json();

		if (success) {
			router.refresh();
		} else throw new Error("Could not log out user");
	};

	return (
		<Button
			onClick={signOut}
			border="left"
			size="large"
			className="w-full flex justify-center tracking-wide hover:mini-spinner-dark"
			disabled={signingOut}
			content={
				!signingOut ? (
					"Sign Out"
				) : (
					<div className="mini-spinner my-4">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)
			}
		/>
	);
};

export default SignOutButton;

