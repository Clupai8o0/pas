"use client";

import { useState, useEffect } from "react";
import { cubicBezier, motion } from "framer-motion";

interface Props {
	ogText: string;
	className: string;
	delay: number;
}

const HeroText = ({ ogText, className, delay }: Props) => {
	const [text, setText] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			let newContent = "";
			let num = 0;
			const randomList = "abcdefghijklmnopqrstuvwxyz.$@_#%&1234567890".split(
				""
			);

			const addInterval = setInterval(() => {
				num += 1;
				newContent = ogText.substring(0, num);

				if (ogText === text) {
					clearInterval(randomInterval);
					clearInterval(addInterval);
				}
			}, 100);

			const randomInterval = setInterval(() => {
				for (let i = newContent.length; i < ogText.length; i++) {
					setText(
						newContent +
							randomList[Math.floor(Math.random() * randomList.length)]
					);
				}
				if (newContent.length === ogText.length) setText(ogText);
			}, 50);

			return () => {
				clearTimeout(timeout);
			};
		}, delay * 1000);
	}, []);

	return (
		<div className={`overflow-y-hidden ${className} absolute`}>
			<motion.h1
				className="title text-white uppercase"
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{
					duration: 0.4,
					delay: delay,
					ease: cubicBezier(0.79, 0.14, 0.15, 0.86),
				}}
			>
				{text}
			</motion.h1>
		</div>
	);
};

export default HeroText;
