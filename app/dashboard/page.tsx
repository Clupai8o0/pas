"use client";

import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import { iPassword } from "@/types";
import { DrawerWrapper } from "@/layouts";
import { Password, PasswordForm, SearchBar } from "@/components";

function Dashboard() {
	const [open, setOpen] = useState(false);

	const [gettingPasswords, setGettingPasswords] = useState(true);
	const [passwords, setPasswords] = useState<iPassword[]>([]);

	//* Getting user passwords on load
	useEffect(() => {
		getPasswords();
	}, []);

  useEffect(() => {
    console.log(passwords)
  }, [passwords])

	const getPasswords = async () => {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/app/get-passwords`
		);
		const { success, data } = await resp.json();

		if (success) {
			setGettingPasswords(false);
			setPasswords(data);
		} else throw new Error("Could not get passwords");
	};

	const createPassword = async ({
		title,
		username,
		url,
		password,
		email,
	}: {
		title: string;
		username: string;
		url: string;
		password: string;
		email: string;
	}) => {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/app/create-password`,
			{
				method: "POST",
				headers: {
					"Content-Type": "Application/JSON",
				},
				body: JSON.stringify({
					title,
					username,
					url,
					password,
					email,
				}),
			}
		);
		const { success } = await resp.json();

		// todo: refresh the passwords feed
		if (success) setOpen(false);
		else throw new Error("There is some issue behind the scenes");
	};

	return (
		<div className="flex flex-col text-white">
			{/* TITLE */}
			<h1 className="text-3xl md:text-5xl p">YOUR PASSWORDS</h1>

			<div className="p text-white flex gap-4 lg:gap-6">
				<SearchBar />

				<DrawerWrapper
					openState={{
						open,
						setOpen,
					}}
					content={
						<PasswordForm
							btnText="Add Password"
							handleSubmit={createPassword}
						/>
					}
					trigger={
						<button className="btn primary-btn normal-btn border">
							<AiOutlinePlus />{" "}
							<span className="whitespace-nowrap hidden lg:block">
								Add Password
							</span>
						</button>
					}
					title="Add a Password"
				/>
			</div>

			{!gettingPasswords ? (
				passwords.length === 0 ? (
					<>
						<div className="grid px-4 place-content-center h-[50vh] md:h-[30vh]">
							<div className="text-center flex justify-center flex-col items-center">
								<h1 className="text-white text-5xl xl:text-7xl;">
									No Passwords
								</h1>
								<p className="mt-4 mb-8 text-gray-200 text-xl">
									Create a password to get started
								</p>
							</div>
						</div>
					</>
				) : (
					passwords.map((password: iPassword) => (
						<Password {...password} key={password.id} />
					))
				)
			) : (
				<div className="w-full h-[50vh] md:h-[30vh] flex justify-center items-center relative">
					<div className="spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
