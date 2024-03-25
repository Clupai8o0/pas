import "./globals.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { Darker_Grotesque } from "next/font/google";
const font = Darker_Grotesque({ subsets: ["latin"] });

import AnimationWrapper from "@/layouts/AnimationWrapper";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "PAS - Simple Safe Secure",
	description:
		"Securely store, organize, and access your passwords with ease. Our password manager ensures your online accounts stay protected, so you can browse the web worry-free. Try it today for simplified and robust password management.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<NextTopLoader
					color="#404040"
					initialPosition={0.08}
					showSpinner={false}
					crawlSpeed={200}
					height={3}
					crawl={true}
					easing="ease"
					speed={200}
				/>
				<AnimationWrapper>
					<Navbar />
					{children}
				</AnimationWrapper>
				<Toaster />
			</body>
		</html>
	);
}
