import QuizChoice from "@/components/QuizChoice";
import Image from "next/image";

export const metadata = {
	title: "FlashKana - Quiz",
	description: "Practice Hiragana and Katakana with FlashKana Quiz!",
	icons: {
		icon: "/images/icon_cut.png",
	},
};

export default function QuizPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-center">
			<Image
				src="/images/icon.png"
				alt="FlashKana Icon"
				width={200}
				height={200}
				className="mb-3"
			/>
			<QuizChoice />
		</main>
	);
}
