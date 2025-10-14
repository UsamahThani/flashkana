"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Flashcard from "@/components/Flashcard";
import { Card } from "@/types/Cards";

export default function FlashcardWrapper() {
	const searchParams = useSearchParams();
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const type = searchParams.get("type") || "hiragana";
		fetch("/kana.json")
			.then((res) => res.json())
			.then((data) => {
				setCards(data[type] || []);
				setLoading(false);
			});
	}, [searchParams]);

	if (loading) return <p className="text-center mt-10">Loading...</p>;

	return <Flashcard cards={cards} />;
}
