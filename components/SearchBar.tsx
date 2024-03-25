"use client";

import { useState } from "react";

import Button from "./Button";

interface Props {
	handleSearch: (q: string) => Promise<void>;
}

const SearchBar = ({ handleSearch }: Props) => {
	const [search, setSearch] = useState("");

	return (
		<form
			className="w-full"
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch(search);
			}}
		>
			<label
				htmlFor="default-search"
				className="mb-2 text-lg sr-only text-white"
			>
				Search
			</label>

			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
					<svg
						className="w-4 h-4text-stone-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>

				<input
					type="search"
					id="default-search"
					className="block w-full p-4 pl-16 text-xl border bg-transparent border-white placeholder-stone-400 text-white"
					placeholder="Search websites and emails"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						handleSearch(e.target.value);
					}}
				/>

				<Button
					border="full"
					primary
					content="search"
					size="normal"
					className="hidden lg:block absolute right-0 bottom-0"
					type="submit"
				/>
			</div>
		</form>
	);
};

export default SearchBar;
