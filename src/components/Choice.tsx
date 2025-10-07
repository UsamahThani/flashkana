"use client";

import Link from "next/link";

export default function Choice() {
	return (
		<>
			<p className="mb-6">Choose what you wanna practice:</p>
			<div className="flex flex-col gap-4 w-50">
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
				{/* <Link
					href="/practice?type=hiragana_practice"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Word Practice (Hiragana)
				</Link> */}
				<Link
					href="/practice?type=kanji_n5"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					Kanji (JLPT N5)
				</Link>
			</div>
		</>
	);
}
