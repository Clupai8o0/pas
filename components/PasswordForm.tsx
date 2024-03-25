"use client";

import { useEffect, useState } from "react";

import Input from "./Input";
import FormContainer from "@/layouts/FormContainer";
import { Eye, EyeOff } from 'lucide-react'
import Button from "./Button";
import { generatePassword } from "@/lib/generator";

interface Props {
	handleSubmit: (pass: {
		title: string;
		url: string;
		username: string;
		email: string;
		password: string;
	}) => Promise<any>;
	dUrl?: string;
	dUsername?: string;
	dEmail?: string;
	dPassword?: string;
	dTitle?: string;
	btnText: string;
	className?: string;
	submitBtnText?: string;
}

const PasswordForm = ({
	handleSubmit,
	dUrl,
	dUsername,
	dEmail,
	dPassword,
	dTitle,
	submitBtnText,
}: Props) => {
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [generatedPhrase, setGeneratedPhrase] = useState("");

	const [titleError, setTitleError] = useState("");
	const [urlError, setUrlError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	useEffect(() => {
		if (dTitle) setTitle(dTitle);
		if (dUrl) setUrl(dUrl);
		if (dUsername) setUsername(dUsername);
		if (dEmail) setEmail(dEmail);
		if (dPassword) setPassword(dPassword);
	}, [dUrl, dUsername, dEmail, dPassword]);

	//* clearing the error
	useEffect(() => {
		if (titleError.length !== 0) setTitleError("");
	}, [title]);
	useEffect(() => {
		if (urlError.length !== 0) setUrlError("");
	}, [url]);
	useEffect(() => {
		if (passwordError.length !== 0) setPasswordError("");
	}, [password]);

	return (
		<FormContainer
			hasSubmitted={hasSubmitted}
			noTitle
			onSubmit={async (e) => {
				e.preventDefault();

				//* Making sure title, url, password are not empty
				let error = false;
				if (title.length === 0) {
					error = true;
					setTitleError("Provide a title to create the password");
				}
				if (url.length === 0) {
					error = true;
					setUrlError("Provide a url to create the password");
				}
				if (password.length === 0) {
					error = true;
					setPasswordError("Password cannot be empty");
				}
				if (error) return;

				setHasSubmitted(true);

				await handleSubmit({
					title,
					url,
					username,
					email,
					password,
				});
			}}
			submitBtnText={submitBtnText ? submitBtnText : "Add Password"}
		>
			<Input
				label="title (required)"
				placeholder="Enter a meaningful title"
				value={title}
				setValue={setTitle}
				type="text"
				error={titleError}
			/>
			<Input
				label="Website URL (required)"
				placeholder="e.g. https://github.com"
				value={url}
				setValue={setUrl}
				type="url"
				error={urlError}
			/>
			<Input
				label="username"
				placeholder="Your username in the site"
				setValue={setUsername}
				type="text"
				value={username}
			/>
			<Input
				label="email"
				placeholder="Your email in the site"
				setValue={setEmail}
				value={email}
				type="email"
			/>
			<Input
				label="password (required)"
				placeholder="Your password in the site"
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
					setGeneratedPhrase(phrase);
				}}
			/>
		</FormContainer>
	);
};

export default PasswordForm;
