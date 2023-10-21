"use client";

import { useEffect, useState } from "react";

import { Input } from ".";
import { FormContainer } from "@/layouts";

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
}

const PasswordForm = ({
	handleSubmit,
	dUrl,
	dUsername,
	dEmail,
	dPassword,
	dTitle,
}: Props) => {
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
			submitBtnText="Add Password"
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
				setValue={setPassword}
				type="password"
				value={password}
				error={passwordError}
			/>
		</FormContainer>
	);
};

export default PasswordForm;
