"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AnimatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [displayedChildren, setDisplayedChildren] = useState(children);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// When route changes, show loading overlay before updating content
		setLoading(true);

		const timer = setTimeout(() => {
			setDisplayedChildren(children);
			setLoading(false);
		}, 500); // 👈 Adjust duration here (ms)

		return () => clearTimeout(timer);
	}, [pathname, children]);

	return (
		<div className="relative overflow-hidden">
			{/* Page transition */}
			<AnimatePresence mode="wait">
				{!loading && (
					<motion.div
						key={pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						{displayedChildren}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Fake loading overlay */}
			<AnimatePresence>
				{loading && (
					<motion.div
						key="loading"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.0 }}
						className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-50"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="text-lg font-medium"
						></motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
