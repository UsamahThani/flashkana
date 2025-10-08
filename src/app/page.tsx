import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
	title: "FlashKana - Home",
	description: "Practice Hiragana and Katakana with FlashKana!",
	icons: {
		icon: "/images/icon_cut.png",
	},
};

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex flex-col flex-grow items-center justify-center text-center">
				<Image
					src="/images/icon.png"
					alt="FlashKana Icon"
					width={200}
					height={200}
					className="mb-3"
				/>

				<div className="flex flex-col sm:flex-row gap-4 w-100 justify-center items-center">
					<Link
						href="/flashcards"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:w-100 w-50"
					>
						Flashcards
					</Link>
					<Link
						href="/quiz"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:w-100 w-50"
					>
						Quiz
					</Link>
					{/* <div className="relative group inline-block">
					<button
						disabled
						className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full w-50 cursor-not-allowed"
					>
						Quiz
					</button>
					<span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Coming soon
					</span>
				</div> */}
				</div>
			</main>
			<Footer />
		</div>
	);
}
