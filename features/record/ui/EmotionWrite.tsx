import * as S from "@/features/record/style/EmotionWrite.styles";
import type { EmotionChip } from "@/shared/types";
import { Button, Switch, TextInput } from "@/shared/ui";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import React from "react";

interface EmotionWriteProps {
	selectedEmotion: EmotionChip | null;
	text?: string;
	setText?: (text: string) => void;
	isFriendOnly: boolean;
	setIsFriendOnly: (value: boolean) => void;
	OnSave: () => void;
}

export const EmotionWrite: React.FC<EmotionWriteProps> = ({
	selectedEmotion,
	text,
	setText,
	isFriendOnly,
	setIsFriendOnly,
	OnSave,
}) => {
	return (
		<S.Container>
			<CharacterBubble
				character="츠츠"
				message="오늘 어땠는지 들어볼까?"
				enableTypewriter
			/>
			<S.EmotionWrapper>
				{selectedEmotion && (
					<EmotionCard
						mainColor={selectedEmotion.mainColor}
						subColor={selectedEmotion.subColor}
						title={selectedEmotion.label ?? ""}
					/>
				)}
				<TextInput
					placeholder="감정을 느낀 이유를 기록해주세요..."
					height={224}
					multiline
					onChangeText={setText}
					value={text}
				/>
			</S.EmotionWrapper>

			<S.PrivacyRow>
				<S.PrivacyText>친구 공개로 올리기</S.PrivacyText>
				<Switch value={isFriendOnly} onValueChange={setIsFriendOnly} />
			</S.PrivacyRow>
			<Button
				size="large"
				text="완료"
				color="white"
				disabled={!text}
				onPress={OnSave}
			/>
		</S.Container>
	);
};
