// app/layout.tsx  (Server Component)
import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import AnimatedLayout from "./AnimatedLayout"; // ⬅️ import client wrapper

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const notoJP = Noto_Sans_JP({
	subsets: ["latin"],
	variable: "--font-noto-jp",
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "FlashKana",
	description: "A flashcard app for learning Japanese",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${notoJP.variable} antialiased overflow-hidden sm:overflow-auto`}
			>
				<div className="absolute inset-0 bg-[linear-gradient(to_bottom,_black_0%,_black_10%,_hsl(220,20%,10%)_50%,_hsl(220,30%,15%)_100%)] bg-[length:200%_200%] animate-gradientMove opacity-95"></div>
				<AnimatedLayout>{children}</AnimatedLayout>
			</body>
		</html>
	);
}
