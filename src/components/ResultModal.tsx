"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti, { CreateTypes } from "canvas-confetti";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaRedo } from "react-icons/fa";

interface ResultModalProps {
	isOpen: boolean;
	score: number;
	total: number;
	showConfetti?: boolean;
	onClose: () => void;
	onRetry?: () => void;
}

export default function ResultModal({
	isOpen,
	score,
	total,
	showConfetti = false,
	onClose,
	onRetry,
}: ResultModalProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!isOpen || !showConfetti || !canvasRef.current) return;

		const myConfetti: CreateTypes = confetti.create(canvasRef.current, {
			resize: true,
			useWorker: true,
		});

		// Initial burst
		myConfetti({
			particleCount: 150,
			spread: 60,
			origin: { y: 0.6 },
		});

		// Continuous small bursts
		const interval = setInterval(() => {
			myConfetti({
				particleCount: 60,
				spread: 70,
				origin: { x: Math.random(), y: Math.random() * 0.6 },
			});
		}, 250);

		// Stop after 1.5s
		const stopTimeout = setTimeout(() => {
			clearInterval(interval);
		}, 1500);

		return () => {
			clearInterval(interval);
			clearTimeout(stopTimeout);
		};
	}, [isOpen, showConfetti]);

	const percentage = total ? ((score / total) * 100).toFixed(1) : "0.0";
	const passed = parseFloat(percentage) >= 80;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{/* Canvas for confetti */}
					<canvas
						ref={canvasRef}
						className="pointer-events-none absolute inset-0 z-40"
						style={{ width: "100%", height: "100%" }}
					/>

					{/* Modal Content */}
					<motion.div
						className="relative bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full z-50"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
					>
						{/* ✕ Close button */}
						<button
							onClick={onClose}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
							aria-label="Close modal"
						>
							<FontAwesomeIcon icon={faTimes} size="lg" />
						</button>

						<h2 className="text-2xl font-bold mb-3 text-black">
							{passed ? "🎉 Congratulations!" : "Results"}
						</h2>

						<p className="text-lg font-semibold text-black">
							Score: {score}/{total}
						</p>
						<p className="text-gray-600 mb-6">Percentage: {percentage}%</p>

						{!passed && (
							<p className="text-sm text-gray-700 mb-4">
								Try again — you&apos;ll get it next time!
							</p>
						)}

						<div className="flex justify-center gap-3">
							<Link
								href="/quiz"
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
							>
								Close
							</Link>
							<button
								onClick={() => {
									onClose();
									onRetry?.();
								}}
								className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition"
							>
								<FaRedo />
								Retry
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
