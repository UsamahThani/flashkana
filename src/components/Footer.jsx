import { FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="relative w-full text-white py-6 flex flex-col items-center justify-center gap-3 overflow-hidden mt-auto">
			{/* animated gradient background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_bottom,_black_0%,_black_10%,_hsl(220,20%,10%)_50%,_hsl(220,30%,15%)_100%)] bg-[length:200%_200%] animate-gradientMove opacity-95"></div>

			{/* content */}
			<div className="relative z-10 flex flex-col items-center text-center px-4">
				<p className="text-lg font-semibold tracking-wide">Made by Sam</p>

				<div className="flex gap-6 mt-1">
					<a
						href="https://github.com/UsamahThani"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-400 transition-colors"
					>
						<FaGithub size={28} />
					</a>

					<a
						href="https://discord.gg/WRCZKxKv"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-400 transition-colors"
					>
						<FaDiscord size={28} />
					</a>
				</div>

				<p className="text-sm text-gray-400 mt-2">
					© 2025 FlashKana. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
