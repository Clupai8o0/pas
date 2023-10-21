import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description:
		"Securely store, organize, and access your passwords with ease. Our password manager ensures your online accounts stay protected, so you can browse the web worry-free. Try it today for simplified and robust password management.",
	viewport:
		"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
	return children
}

export default LoginLayout;
