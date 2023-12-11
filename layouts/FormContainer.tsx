"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";

interface Props {
	children: React.ReactNode;
	submitBtnText: string;
	hasSubmitted: boolean;
	altMethod?: {
		text: string;
		name: string;
		url: string;
	};
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	noTitle?: boolean;
}

const FormContainer = ({
	children,
	submitBtnText,
	onSubmit,
	hasSubmitted,
	altMethod,
	noTitle,
}: Props) => {
	return (
		<div
			className={`flex justify-center items-center w-full ${
				!noTitle && "py-16"
			} text-white min-h-[90vh] md:h-auto`}
		>
			<form
				className={`max-w-xl w-full flex flex-col gap-8 items-center ${
					!noTitle && "p"
				}`}
				onSubmit={async (e) => {
					e.preventDefault();
					await onSubmit(e);
				}}
			>
				{!noTitle && (
					<h1 className="text-3xl md:text-5xl uppercase">{submitBtnText}</h1>
				)}
				{children}
				<Button
					type="submit"
					border="full"
					content={
						hasSubmitted ? (
							<div className="mini-spinner my-4">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						) : (
							submitBtnText
						)
					}
					disabled={hasSubmitted}
					size="normal"
					className="w-full flex justify-center tracking-wide hover:mini-spinner-dark mt-8"
					primary
				/>
				{altMethod && (
					<div className="w-full paragraph flex justify-center">
						<div className="flex">
							<p>{altMethod.text}</p>
							<Link
								href={altMethod.url}
								className="hover:underline text-blue-400 ml-2"
							>
								{altMethod.name}
							</Link>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default FormContainer;
