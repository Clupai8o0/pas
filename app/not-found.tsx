import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function NotFound() {
	return (
		<div className="grid h-[70vh] px-4 place-content-center">
			<div className="text-center flex justify-center flex-col items-center">
				<h1 className="text-white title">404</h1>

				<p className="text-4xl tracking-tight text-gray-200 sm:text-4xl">
					Uh-oh!
				</p>

				<p className="mt-4 mb-8 text-gray-200 text-xl">
					We can&apos;t find that page.
				</p>

				<Link href="/">
					<Button border="full" size="normal" primary content="Go back Home" />
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
