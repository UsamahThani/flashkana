"use client";

import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import SettingsMenu from "./SettingsMenu";
import { Card } from "@/types/Cards";

function shuffleArray<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export default function Flashcard({ cards }: { cards: Card[] }) {
	const [index, setIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [shuffleCards, setShuffleCards] = useState<Card[]>(cards);
	const [finished, setFinished] = useState(false);
	const [direction, setDirection] = useState(0);
	const card = shuffleCards[index] ?? null;
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const isKanjiPractice = type?.startsWith("kanji");
	const [kanjiVideo, setKanjiVideo] = useState<string | null>(null);
	const [showReplay, setShowReplay] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	// ✅ Initialize from localStorage immediately (avoids flash)
	const [isRandom, setIsRandom] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("isRandom") === "true";
		}
		return false;
	});

	const [showWriting, setShowWriting] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("showWriting") === "true";
		}
		return false;
	});

	useEffect(() => {
		const newOrder = isRandom ? shuffleArray(cards) : cards;
		setShuffleCards(newOrder);
		setIndex(0);
		setShowAnswer(false);
		setFinished(false);
	}, [isRandom, cards]);

	// ✅ Save to localStorage whenever options change
	useEffect(() => {
		localStorage.setItem("isRandom", String(isRandom));
		localStorage.setItem("showWriting", String(showWriting));
	}, [isRandom, showWriting]);

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

	// 🎯 Keyboard controls for desktop navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowLeft":
					if (index > 0) {
						setDirection(1);
						setIndex((prev) => prev - 1);
						setShowAnswer(false);
					}
					break;

				case "ArrowRight":
					if (index < cards.length - 1) {
						setDirection(-1);
						setIndex((prev) => prev + 1);
						setShowAnswer(false);
					}
					break;

				case "ArrowUp":
				case "ArrowDown":
					setShowAnswer((prev) => !prev);
					break;

				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [index, cards.length]);

	// checking if the type is kanji practice and have some additional features
	useEffect(() => {
		if (isKanjiPractice && showWriting && card?.char) {
			const fetchVideo = async () => {
				try {
					const response = await fetch(
						`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(
							card.char
						)}`,
						{
							method: "GET",
							headers: {
								"X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
								"X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
							},
						}
					);

					if (!response.ok) {
						throw new Error("Response kanji writing not ok");
					}
					const data = await response.json();
					const videoUrl = data.kanji?.video.mp4;
					console.log("Fetched Kanji video URL:", videoUrl);
					setKanjiVideo(videoUrl || null);
				} catch (err) {
					console.error("Failed to fetch Kanji video:", err);
					setKanjiVideo(null);
				}
			};
			fetchVideo();
		} else {
			setKanjiVideo(null);
		}
	}, [card?.char, showWriting, isKanjiPractice]);

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

	if (!card) return null;

	return (
		<div
			{...handlers}
			className="w-full h-screen flex flex-col items-center justify-start p-4"
		>
			{/* Toggle */}
			<SettingsMenu
				show={showSettings}
				onClose={() => setShowSettings((prev) => !prev)}
				isRandom={isRandom}
				setIsRandom={setIsRandom}
				showWriting={showWriting}
				setShowWriting={setShowWriting}
				isKanjiPractice={Boolean(isKanjiPractice)}
			/>

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
						<div
							className="relative w-60 h-80 rounded-2xl shadow-xl"
							style={{
								perspective: 1000,
								colorScheme: "light",
							}}
						>
							<motion.div
								className="relative w-full h-full bg-white rounded-2xl"
								animate={{ rotateX: showAnswer ? 180 : 0 }}
								transition={{ duration: 0.6, ease: "easeInOut" }}
								style={{
									transformStyle: "preserve-3d",
								}}
							>
								{/* Front */}
								<div
									className="absolute inset-0 flex items-center justify-center text-5xl sm:text-black sm:bg-white bg-[#e3e3e3] rounded-2xl"
									style={{
										backfaceVisibility: "hidden",
									}}
								>
									{isKanjiPractice && showWriting && kanjiVideo ? (
										<div className="relative w-full h-full flex items-center justify-center">
											<video
												key={kanjiVideo} // ensures reload when video changes
												src={kanjiVideo}
												autoPlay
												muted
												playsInline
												onEnded={() => setShowReplay(true)}
												ref={(el) => {
													if (el) el.onplay = () => setShowReplay(false);
												}}
												className="w-full h-full object-contain rounded-2xl"
											/>

											{/* Replay Button */}
											{showReplay && (
												<button
													onClick={() => {
														const video = document.querySelector("video");
														if (video) {
															video.currentTime = 0;
															video.play();
															setShowReplay(false);
														}
													}}
													className="absolute bottom-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm hover:bg-black/80 transition"
												>
													↻
												</button>
											)}
										</div>
									) : (
										<div className="text-9xl japanese-text ">{card.char}</div>
									)}
								</div>

								{/* Back */}
								<div
									className="absolute inset-0 flex flex-col items-center justify-center text-5xl sm:text-white bg-blue-500 rounded-2xl"
									style={{
										backfaceVisibility: "hidden",
										transform: "rotateX(180deg)",
									}}
								>
									{/* {card.romaji.split("\n").map((line, idx) => (
										<div key={idx}>{line}</div>
									))} */}

									{card.romaji}
									{isKanjiPractice && card.meaning && (
										<>
											<span className="text-xl">{card.meaning}</span>
										</>
									)}

									{isKanjiPractice && (
										<a
											href={`https://app.kanjialive.com/${card.char}`}
											target="_blank"
											className="absolute bottom-0 text-xs text-gray-500"
										>
											Learn more about {card.char} kanji
										</a>
									)}
								</div>
							</motion.div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
