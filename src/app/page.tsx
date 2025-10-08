import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "FlashKana - Home",
	description: "Practice Hiragana and Katakana with FlashKana!",
	icons: {
		icon: "/images/icon_cut.png",
	},
};

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-center">
			<Image
				src="/images/icon.png"
				alt="FlashKana Icon"
				width={200}
				height={200}
				className="mb-3"
			/>

			<div className="flex gap-4 w-100 justify-center">
				<Link
					href="/flashcards"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-100"
				>
					Flashcards
				</Link>
				{/* <Link
					href="/quiz"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-100"
				>
					Quiz
				</Link> */}
				<div className="relative group inline-block">
					<button
						disabled
						className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full w-50 cursor-not-allowed"
					>
						Quiz
					</button>
					<span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Coming soon
					</span>
				</div>
			</div>
		</main>
	);
}
