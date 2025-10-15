import { SpeechBubble } from "@/features/onboarding/ui";

const MESSAGE = "누가 걱정해준대? 신경쓰여서 들어주는 거야.";

export default function Onboarding() {
	return (
		<>
			<SpeechBubble message={MESSAGE} />
		</>
	);
}
