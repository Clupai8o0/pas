"use client";

import Link from "next/link";
import { useState } from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { BiSolidCopy } from "react-icons/bi";

import { iPassword } from "@/types";

import PasswordForm from "./PasswordForm";
import Button from "./Button";

import DrawerWrapper from "@/layouts/DrawerWrapper";

import { useToast } from "./ui/use-toast";

// todo: check for only if the value is there
const Password = ({ title, email, password, username, url }: iPassword) => {
	const { toast } = useToast();

	const [open, setOpen] = useState(false);

	return (
		<div className="border-t border-white w-full p">
			{/* TITLE + CONTROLS */}
			<div className="flex items-center justify-between w-full">
				<Link href={url}>
					<h2 className="text-2xl uppercase">{title}</h2>
				</Link>

				<div className="flex items-center gap-2">
					<DrawerWrapper
						openState={{ open, setOpen }}
						content={
							<PasswordForm
								btnText="Edit"
								handleSubmit={async (e) => {}}
								dTitle={title}
								dEmail={email}
								dPassword={password}
								dUrl={url}
								dUsername={username}
								// className="overflow-y-auto no"
							/>
						}
						title="Edit Password"
						trigger={
							<button className="btn small-btn border">
								<BsFillPencilFill />
								<span className="sr-only">Pen Icon</span>
							</button>
						}
					/>
					<Button
						border="full"
						content={
							<>
								<BsFillTrashFill />
								<span className="sr-only">Trash Icon</span>
							</>
						}
						size="small"
					/>
				</div>
			</div>

			{/* CREDENTIALS */}
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="w-full flex items-center gap-2 mt-4">
					<p className="text-xl">
						<span className="uppercase">Username -</span> {username}
					</p>

					<button
						onClick={() => {
							navigator.clipboard.writeText(username || "");
							toast({ title: "Copied username to clipboard" });
						}}
					>
						{/* GET IT FROM UIVERSE */}
						<BiSolidCopy />
					</button>
				</div>
				<div className="w-full flex items-center gap-2 mt-4">
					<p className="text-xl">
						<span className="uppercase">Email -</span> {email}
					</p>

					<button
						onClick={() => {
							navigator.clipboard.writeText(email || "");
							toast({ title: "Copied email to clipboard" });
						}}
					>
						{/* GET IT FROM UIVERSE */}
						<BiSolidCopy />
					</button>
				</div>
				<div className="w-full flex items-center gap-2 mt-4">
					<p className="text-xl">
						<span className="uppercase">Password -</span>{" "}
						<span className="">************</span>
					</p>

					<button
						onClick={() => {
							navigator.clipboard.writeText(password || "");
							toast({ title: "Copied password to clipboard" });
						}}
					>
						{/* GET IT FROM UIVERSE */}
						<BiSolidCopy />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Password;
