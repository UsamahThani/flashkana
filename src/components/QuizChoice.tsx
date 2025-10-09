import Link from "next/link";

export default function QuizChoice() {
	return (
		<>
			<p className="mb-6">Choose your quiz:</p>

			<div className="flex flex-col gap-4 w-50">
				<Link
					href="/quiz/question?type=all"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
				>
					All
				</Link>
				<Link
					href="/quiz/question?type=hiragana"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Hiragana
				</Link>
				<Link
					href="/quiz/question?type=katakana"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Katakana
				</Link>
				<Link
					href="/quiz/question?type=kanji_n5"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Kanji (JLPT N5)
				</Link>
			</div>
		</>
	);
}
