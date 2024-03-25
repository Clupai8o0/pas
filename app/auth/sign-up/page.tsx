"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import FormContainer from "@/layouts/FormContainer";
import Input from "@/components/Input";
import { Resp } from "@/types";
import Button from "@/components/Button";
import { generatePassword } from "@/lib/generator";

function SignUp() {
	const router = useRouter();

	const [hasSubmitted, setHasSubmitted] = useState(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [reTypePassword, setReTypePassword] = useState("");
	const [generatedPhrase, setGeneratedPhrase] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [reTypePasswordError, setReTypePasswordError] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	//* if change is being made after error, get rid of error
	useEffect(() => {
		if (usernameError.length !== 0) setUsernameError("");
	}, [username]);
	useEffect(() => {
		if (emailError.length !== 0) setEmailError("");
	}, [email]);
	useEffect(() => {
		if (passwordError.length !== 0) setPasswordError("");
	}, [password]);
	useEffect(() => {
		if (reTypePasswordError.length !== 0) setReTypePasswordError("");
	}, [reTypePassword]);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setHasSubmitted(true);

		let error = false;

		//! checking if any input is empty
		if (username.length === 0) {
			error = true;
			setUsernameError("Provide a username for creating user");
		}
		if (email.length === 0) {
			error = true;
			setEmailError("Provide an email for creating user");
		}
		if (password.length === 0) {
			error = true;
			setPasswordError("Provide a password for creating user");
		}
		//! if both the typed passwords are not right
		if (password !== reTypePassword) {
			error = true;
			setPasswordError("Typed passwords not matching");
			setReTypePasswordError("Typed passwords not matching");
		}
		if (reTypePassword.length === 0) {
			error = true;
			setReTypePasswordError("Retype the password for creating user");
		}
		// stopping only after both errors have been set
		if (error) {
			// so user isn't moved to dashboard
			setHasSubmitted(false);
			return;
		}
		//todo: password requirements

		//* since inputs are not empty
		//* getting user ip
		const ipResp = await fetch("https://api.ipify.org/?format=json");
		const ip = (await ipResp.json()).ip;

		//* make a request to login route
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/auth/sign-up`,
			{
				method: "POST",
				headers: {
					"Content-Type": "Application/JSON",
				},
				body: JSON.stringify({
					ip,
					username,
					email,
					password,
				}),
			}
		);
		const { success, data }: Resp = await resp.json();

		//! Checking error
		if (!success) {
			//! email or username already taken
			if (data === "exists-username") {
				error = true;
				setUsernameError("Username already taken");
			}
			if (data === "exists-email") {
				error = true;
				setEmailError("Email already in use");
			}
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
			submitBtnText="Sign Up"
			onSubmit={handleLogin}
			hasSubmitted={hasSubmitted}
			altMethod={{
				text: "Already have an account?",
				name: "Login",
				url: "/auth/login",
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
				label="Email"
				placeholder="Enter your email..."
				value={email}
				setValue={setEmail}
				type="email"
				error={emailError}
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
			<Input
				label="Re-Type Password"
				placeholder="Enter your password again..."
				value={reTypePassword}
				setValue={setReTypePassword}
				type={!showPassword ? "password" : "text"}
				error={reTypePasswordError}
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
			{generatedPhrase.length > 0 && (
				<span className={`block mb-2 text-lg font-normal text-white uppercase`}>
					Phrase: {generatedPhrase}
				</span>
			)}
			<Button
				border="full"
				content="Generate Password"
				size="normal"
				className="w-full flex justify-center tracking-wide"
				onClick={() => {
					const { phrase, password } = generatePassword();
					setPassword(password);
					setReTypePassword(password);
					setGeneratedPhrase(phrase);
				}}
			/>
		</FormContainer>
	);
}

export default SignUp;
