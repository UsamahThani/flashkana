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

			<p className="mb-6">Choose what you wanna practice:</p>
			<div className="flex flex-col gap-4">
				<Link
					href="/practice?type=hiragana"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Hiragana
				</Link>
				<Link
					href="/practice?type=katakana"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Katakana
				</Link>
				<Link
					href="/practice?type=hiragana_practice"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Word Practice (Hiragana)
				</Link>
			</div>
		</main>
	);
}
