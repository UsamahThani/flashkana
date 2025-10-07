import Choice from "@/components/Choice";
import Image from "next/image";

export const metadata = {
	title: "FlashKana - Flashcards",
	description: "Practice Hiragana and Katakana with FlashKana Flashcards!",
	icons: {
		icon: "/images/icon_cut.png",
	},
};

export default function FlashcardsPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-center">
			<Image
				src="/images/icon.png"
				alt="FlashKana Icon"
				width={200}
				height={200}
				className="mb-3"
			/>
			<Choice />
		</main>
	);
}
