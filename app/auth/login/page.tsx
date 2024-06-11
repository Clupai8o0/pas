"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from "next/navigation";

import FormContainer from "@/layouts/FormContainer";
import Input from "@/components/Input";
import { Resp } from "@/types";

function Login() {
	const router = useRouter();

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	//* if change is being made after error, get rid of error boundary
	useEffect(() => {
		if (usernameError.length !== 0) setUsernameError("");
	}, [username]);
	useEffect(() => {
		if (passwordError.length !== 0) setPasswordError("");
	}, [password]);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setHasSubmitted(true);

		let error = false;

		//! checking if any input is empty
		if (username.length === 0) {
			error = true;
			setUsernameError("Provide a username for login");
		}
		if (password.length === 0) {
			error = true;
			setPasswordError("Provide a password for login");
		}
		// stopping only after both errors have been set
		if (error) {
			// so user isn't moved to dashboard
			setHasSubmitted(false);
			return;
		}

		//* since inputs are not empty
		//* getting user ip
		const ipResp = await fetch("https://api.ipify.org/?format=json");
		const ip = (await ipResp.json()).ip;

		//* make a request to login route
		const resp = await fetch(`${process.env.NEXT_PUBLIC_PORT}api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/JSON",
			},
			body: JSON.stringify({
				ip,
				username,
				password,
			}),
		});
		const { success, msg, data }: Resp = await resp.json();

		//! Checking error
		if (!success) {
			//! if credentials are incorrect
			if (data === "wrong-credentials") {
				error = true;
				setUsernameError("Username or password might be incorrect");
				setPasswordError("Username or password might be incorrect");
			} else setUsernameError("Something isn't right"); //! just incase
		}
		//* dealing with the error
		if (error) {
			setHasSubmitted(false);
			return;
		}

		//* Credentials are correct, log the user
		router.refresh();
	};

	return (
		<FormContainer
			submitBtnText="Login"
			onSubmit={handleLogin}
			hasSubmitted={hasSubmitted}
			altMethod={{
				text: "Don't have an account yet?",
				name: "Sign up",
				url: "/auth/sign-up",
			}}
		>
			<Input
				label="Username"
				placeholder="Enter your username..."
				value={username}
				setValue={setUsername}
				type="text"
				error={usernameError}
			/>
			<Input
				label="password"
				placeholder="Enter your password..."
				value={password}
				setValue={setPassword}
				type={!showPassword ? "password" : "text"}
				error={passwordError}
			>
				<button
					onClick={() => setShowPassword((prev) => !prev)}
					className="absolute right-4 top-[50px] opacity-80 cursor-pointer"
					type="button"
				>
					{!showPassword ? (
						<Eye className="w-7 h-7" />
					) : (
						<EyeOff className="w-7 h-7" />
					)}
				</button>
			</Input>
		</FormContainer>
	);
}

export default Login;
