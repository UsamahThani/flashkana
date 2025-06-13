'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Flashcard from '../components/Flashcard'
import { p } from "framer-motion/client"

type Card = { char: string; romaji: string  }

export default function PracticePage() {
    const searchParams = useSearchParams()
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const tytpe = searchParams.get('type') || 'hiragana'
        fetch('/kana.json')
            .then(res => res.json())
            .then(data => {
                setCards(data[tytpe] || [])
                setLoading(false)
        })
    }, [searchParams])

    if (loading) return <p className="text-center mt-10">Loading...</p>

    return <Flashcard cards={cards} />
}