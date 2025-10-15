import * as S from "@/features/onboarding/style/SpeechBubble.styles";

interface SpeechBubbleProps {
	message: string;
}

export function SpeechBubble({ message }: SpeechBubbleProps) {
	return (
		<S.SpeechBubbleContainer>
			<S.SpeechBubbleText>{message}</S.SpeechBubbleText>
			<S.Polygon />
		</S.SpeechBubbleContainer>
	);
}
