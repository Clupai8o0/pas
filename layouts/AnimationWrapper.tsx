"use client";

import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { usePathname } from "next/navigation";

import Loader from "@/components/Loader";

interface Props {
	noTransition?: boolean;
	children: React.ReactNode;
}

const AnimationWrapper = ({ children, noTransition }: Props) => {
	const pathname = usePathname();

	return noTransition ? (
		<main className="main" vaul-drawer-wrapper="">
			<div className="w-full border border-white relative">{children}</div>
		</main>
	) : (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				initial="initialState"
				animate="animateState"
				exit="exitState"
				variants={{
					initialState: {
						left: 0,
					},
					animateState: {
						left: "-100%",
						transition: {
							delay: 1,
						},
					},
					exitState: {
						left: 0,
					},
				}}
				transition={{ duration: 0.6, ease: cubicBezier(0.77, 0, 0.18, 1) }}
				className="w-full min-h-screen fixed top-0 left-0 z-[9999] bg-neutral-950 flex justify-center items-center"
			>
				<Loader />
			</motion.div>

			<main className="main" vaul-drawer-wrapper="">
				<div className="w-full border border-white relative">{children}</div>
			</main>
		</AnimatePresence>
	);
};

export default AnimationWrapper;
