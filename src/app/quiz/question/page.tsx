import { Suspense } from "react";
import QuestionWrapper from "./QuestionWrapper";

export default function Page() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Loading quiz...</div>}>
			<QuestionWrapper />
		</Suspense>
	);
}
