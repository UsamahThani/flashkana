import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${notoJP.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
