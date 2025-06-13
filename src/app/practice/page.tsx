"use client";

import { Suspense } from "react";
import FlashcardWrapper from "./FlashcardWrapper";

export default function PracticePage() {
	return (
		<Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
			<FlashcardWrapper />
		</Suspense>
	);
}
