import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";

interface SpeechBubbleProps {
	message: string;
}

export function SpeechBubble({ message }: SpeechBubbleProps) {
	return (
		<S.SpeechBubbleContainer>
			<S.SpeechBubble>
				<S.SpeechBubbleText>{message}</S.SpeechBubbleText>
			</S.SpeechBubble>
			<S.SpeechBubbleArrow />
		</S.SpeechBubbleContainer>
	);
}
