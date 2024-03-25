"use client";

import { motion } from "framer-motion";

const Loader = () => {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 0 }}
			exit={{ opacity: 1 }}
			transition={{ duration: 1.2, repeat: 0 }}
		>
			<div className="spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</motion.div>
	);
};

export default Loader;
