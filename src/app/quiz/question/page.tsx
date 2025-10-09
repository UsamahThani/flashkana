"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import ResultModal from "@/components/ResultModal";

interface KanaItem {
	char: string;
	romaji: string;
	meaning?: string;
}

function QuestionPageInner() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type") || "all";

	const [questions, setQuestions] = useState<KanaItem[]>([]);
	const [answers, setAnswers] = useState<string[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [score, setScore] = useState(0);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		async function loadKana() {
			try {
				const res = await fetch("/kana.json", { cache: "no-store" });
				if (!res.ok) throw new Error("Failed to fetch kana data");

				const data = await res.json();
				let quizData: KanaItem[] = [];

				if (type === "all") {
					quizData = [
						...(data.hiragana || []),
						...(data.katakana || []),
						...(data.kanji_n5 || []),
					];
				} else {
					quizData = data[type] || [];
				}

				// Shuffle
				function shuffle<T>(array: T[]): T[] {
					return [...array].sort(() => Math.random() - 0.5);
				}

				const shuffled = shuffle(quizData);
				setQuestions(shuffled);
				setAnswers(Array(shuffled.length).fill(""));
				setSubmitted(false);
				setScore(0);
			} catch (error) {
				console.error("Error loading kana data:", error);
			}
		}

		loadKana();
	}, [type]);

	const handleChange = (index: number, value: string) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	const handleSubmit = () => {
		if (answers.some((a) => a.trim() === "")) {
			alert("Please answer all questions before submitting.");
			return;
		}

		let correctCount = 0;
		questions.forEach((q, i) => {
			if (q.romaji.toLowerCase() === answers[i].trim().toLowerCase()) {
				correctCount++;
			}
		});

		setScore(correctCount);
		setSubmitted(true);
		setShowModal(true);
	};

	const percentage = questions.length ? (score / questions.length) * 100 : 0;
	const passed = percentage >= 80;

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-6 relative">
			<h1 className="text-2xl font-bold mb-6 capitalize">{type} Quiz</h1>

			{/* Quiz Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
				{questions.map((q, index) => {
					const answered = (answers[index] || "").trim() !== "";
					const correct =
						submitted &&
						q.romaji.toLowerCase() ===
							(answers[index] || "").trim().toLowerCase();

					return (
						<QuizCard
							key={index}
							char={q.char}
							value={answers[index] ?? ""}
							onChange={(v) => handleChange(index, v)}
							answered={answered}
							correct={correct}
							submitted={submitted}
							romaji={q.romaji}
						/>
					);
				})}
			</div>

			{/* Submit Button */}
			{!submitted && questions.length > 0 && (
				<button
					onClick={handleSubmit}
					className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full"
				>
					Submit
				</button>
			)}

			{/* Result Modal */}
			<ResultModal
				isOpen={showModal}
				score={score}
				total={questions.length}
				showConfetti={passed}
				onClose={() => setShowModal(false)}
			/>
		</main>
	);
}

// ✅ Wrap the page in Suspense
export default function QuestionPage() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Loading quiz...</div>}>
			<QuestionPageInner />
		</Suspense>
	);
}
