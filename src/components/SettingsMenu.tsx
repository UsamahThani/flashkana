"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

interface SettingsMenuProps {
	show: boolean;
	onClose: () => void;
	isRandom: boolean;
	setIsRandom: (v: boolean) => void;
	showWriting: boolean;
	setShowWriting: (v: boolean) => void;
	isKanjiPractice: boolean;
}

export default function SettingsMenu({
	show,
	onClose,
	isRandom,
	setIsRandom,
	showWriting,
	setShowWriting,
	isKanjiPractice,
}: SettingsMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	// ✅ close menu when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				onClose();
			}
		}
		if (show) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [show, onClose]);

	return (
		<div className="absolute top-4 right-4 z-50" ref={menuRef}>
			{/* ⚙️ Settings Button */}
			<button
				onClick={onClose}
				className="bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
			>
				<FontAwesomeIcon icon={faCog} size="lg" />
			</button>

			{/* ⚙️ Settings Dropdown */}
			{show && (
				<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
					<h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
						Settings
					</h4>

					{/* 🎲 Random Toggle */}
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm text-gray-700 dark:text-gray-300">
							Random Order
						</span>
						<button
							onClick={() => setIsRandom(!isRandom)}
							className={`w-12 h-6 rounded-full transition-colors duration-300 ${
								isRandom ? "bg-blue-500" : "bg-gray-400"
							} relative`}
						>
							<span
								className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
									isRandom ? "translate-x-6" : "translate-x-0"
								}`}
							></span>
						</button>
					</div>

					{/* ✍️ Kanji Writing Toggle */}
					{isKanjiPractice && (
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-700 dark:text-gray-300">
								Show Writing
							</span>
							<button
								onClick={() => setShowWriting(!showWriting)}
								className={`w-12 h-6 rounded-full transition-colors duration-300 ${
									showWriting ? "bg-green-500" : "bg-gray-400"
								} relative`}
							>
								<span
									className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
										showWriting ? "translate-x-6" : "translate-x-0"
									}`}
								></span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
