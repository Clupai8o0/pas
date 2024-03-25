"use client";

import { useState, useEffect } from "react";

import { Plus } from 'lucide-react'

import { iPassword } from "@/types";
import DrawerWrapper from "@/layouts/DrawerWrapper";
import SearchBar from "@/components/SearchBar";
import PasswordForm from "@/components/PasswordForm";
import Password from "@/components/Password";
import { Skeleton } from "@/components/ui/skeleton";
import { generateKey } from "@/lib/utils";

function Dashboard() {
	const [open, setOpen] = useState(false);

	const [gettingPasswords, setGettingPasswords] = useState(true);
	const [passwords, setPasswords] = useState<iPassword[]>([]);

	//* Getting user passwords on load
	useEffect(() => {
		getPasswords();
	}, []);

	const getPasswords = async () => {
		setGettingPasswords(true);
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/app/get-passwords`
		);
		const { success, data } = await resp.json();
		if (success) {
			setGettingPasswords(false);
			setPasswords(data);
		} else {
			setGettingPasswords(false);
			throw new Error("Could not get passwords");
		}
	};

	const handleSearch = async (q: string) => {
		setGettingPasswords(true);
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/app/search-passwords?q=${q}`
		);
		const { success, data } = await resp.json();
		if (success) {
			setGettingPasswords(false);
			setPasswords(data);
		} else {
			setGettingPasswords(false);
			throw new Error("Could not search passwords");
		}
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
		await getPasswords();

		if (success) setOpen(false);
		else throw new Error("There is some issue behind the scenes");
	};

	return (
		<div className="flex flex-col text-white min-h-[90vh]">
			{/* TITLE */}
			<h1 className="text-3xl md:text-5xl p">YOUR PASSWORDS</h1>

			<div className="p text-white flex gap-4 lg:gap-6">
				<SearchBar handleSearch={handleSearch} />

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
							<Plus />{" "}
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
						<Password
							{...password}
							key={password.id}
							getPasswords={getPasswords}
						/>
					))
				)
			) : (
				[1, 2, 3].map((_) => (
					<div className="w-full border-t border-white p flex flex-col gap-6" key={generateKey()}>
						<div className="flex justify-between">
							<Skeleton className="w-2/3 lg:w-1/3 h-8 lg:h-10" />
							<div className="flex gap-2">
								<Skeleton className="w-10 h-10 rounded-full" />
								<Skeleton className="w-10 h-10 rounded-full" />
							</div>
						</div>

						<div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0">
							<Skeleton className="w-3/4 lg:w-1/4 h-8 lg:h-10" />
							<Skeleton className="w-3/4 lg:w-1/4 h-8 lg:h-10" />
							<Skeleton className="w-3/4 lg:w-1/4 h-8 lg:h-10" />
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default Dashboard;
