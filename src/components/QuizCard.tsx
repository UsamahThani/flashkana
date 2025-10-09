"use client";

interface QuizCardProps {
	char: string;
	value: string;
	onChange: (value: string) => void;
	answered: boolean;
	correct: boolean;
	submitted: boolean;
	romaji?: string; // optional — used to show the correct answer after submit
}

export default function QuizCard({
	char,
	value,
	onChange,
	answered,
	correct,
	submitted,
	romaji,
}: QuizCardProps) {
	let bgClass = "bg-white text-black";

	if (submitted) {
		bgClass = correct ? "bg-green-200 text-black" : "bg-red-300 text-black";
	} else if (answered) {
		bgClass = "bg-blue-300 text-white";
	}

	return (
		<div
			className={`rounded-xl shadow-md p-4 text-center transition duration-200 ${bgClass}`}
		>
			{" "}
			<p className="text-4xl mb-3">{char}</p>
			<input
				type="text"
				value={value || ""}
				onChange={(e) => onChange(e.target.value)}
				className="border rounded-md p-2 w-full text-center text-black"
				disabled={submitted}
				required
			/>
			{/* Show correct answer / feedback after submit */}
			{submitted && (
				<div className="mt-2">
					{correct ? (
						<p className="text-sm font-semibold text-green-700">Correct ✓</p>
					) : (
						<p className="text-sm font-semibold text-red-600">
							Correct: <span className="font-normal">{romaji ?? "—"}</span>
						</p>
					)}
				</div>
			)}
		</div>
	);
}
