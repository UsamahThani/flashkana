"use client";

import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

type Card = { char: string; romaji: string };

function shuffleArray<T>(array: T[]): T[] {
	return [...array].sort(() => Math.random() - 0.5);
}

export default function Flashcard({ cards }: { cards: Card[] }) {
	const [index, setIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [isRandom, setIsRandom] = useState(false);
	const [shuffleCards, setShuffleCards] = useState<Card[]>(cards);
	const [finished, setFinished] = useState(false);
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const newOrder = isRandom ? shuffleArray(cards) : cards;
		setShuffleCards(newOrder);
		setIndex(0);
		setShowAnswer(false);
		setFinished(false);
	}, [isRandom, cards]);

	useEffect(() => {
		if (index >= shuffleCards.length) {
			setFinished(true);
			confetti({
				particleCount: 150,
				spread: 90,
				origin: { y: 0.6 },
			});
		}
	}, [index, shuffleCards.length]);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (index < cards.length - 1) {
				setDirection(-1);
				setIndex(index + 1);
				setShowAnswer(false);
			} else {
				setIndex(index + 1);
			}
		},
		onSwipedRight: () => {
			if (index > 0) {
				setDirection(1);
				setIndex(index - 1);
				setShowAnswer(false);
			}
		},
		onSwipedUp: () => {
			setShowAnswer((prev) => !prev);
		},
		trackTouch: true,
		trackMouse: true,
	});

	if (finished) {
		return (
			<div className="w-full h-screen flex flex-col items-center justify-center text-center">
				<h2 className="text-3xl font-bold mb-4">You have finished!</h2>
				<button
					onClick={() => {
						setFinished(false);
						setIndex(0);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
				>
					Restart
				</button>
			</div>
		);
	}

	const card = shuffleCards[index] ?? null;

	if (!card) return null;

	return (
		<div
			{...handlers}
			className="w-full h-screen flex flex-col items-center justify-start p-4"
		>
			{/* Toggle */}
			<div className="w-full flex justify-start items-center mb-2">
				<label className="relative inline-block h-7 w-[48px] cursor-pointer rounded-full bg-gray-900 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#1976D2]">
					<input
						type="checkbox"
						checked={isRandom}
						onChange={(e) => setIsRandom(e.target.checked)}
						className="peer sr-only"
					/>
					<span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 bg-gray-900 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
				</label>
				<span className="text-sm ml-5">Random</span>
			</div>

			{/* Flashcard */}
			<div className="w-full flex items-center justify-center h-3/4">
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={index}
						initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						{/* Flip Card Inside */}
						<motion.div
							className="relative w-60 h-80 bg-white rounded-2xl shadow-xl"
							animate={{ rotateX: showAnswer ? 180 : 0 }}
							transition={{ duration: 0.6, ease: "easeInOut" }}
							style={{
								transformStyle: "preserve-3d",
								perspective: 1000,
							}}
						>
							{/* Front - Kana */}
							<div
								className="absolute w-full h-full flex items-center justify-center text-5xl text-black p-4 backface-hidden"
								style={{
									backfaceVisibility: "hidden",
									position: "absolute",
								}}
							>
								{card.char}
							</div>

							{/* Back - Romaji */}
							<div
								className="absolute w-full h-full flex flex-col items-center justify-center text-5xl text-black p-4 backface-hidden"
								style={{
									backfaceVisibility: "hidden",
									transform: "rotateX(180deg)",
									position: "absolute",
								}}
							>
								{card.romaji.split("\n").map((line, idx) => (
									<div key={idx}>{line}</div>
								))}
							</div>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
