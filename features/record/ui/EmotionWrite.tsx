import { CHARACTER_RECORD_MESSAGES } from "@/entities/character/model/characterMessages";
import { useUserCharacter } from "@/entities/user/model/userQueries";
import * as S from "@/features/record/style/EmotionWrite.styles";
import { useKeyboardHeight } from "@/shared/hooks/useKeyboardHeight";
import type { EmotionChip } from "@/shared/types";
import { Button, Switch, TextInput } from "@/shared/ui";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import type React from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";

interface EmotionWriteProps {
	selectedEmotion: EmotionChip | null;
	text?: string;
	setText?: (text: string) => void;
	isFriendOnly: boolean;
	setIsFriendOnly: (value: boolean) => void;
	isSaving: boolean;
	OnSave: () => void;
}

export const EmotionWrite: React.FC<EmotionWriteProps> = ({
	selectedEmotion,
	text,
	setText,
	isFriendOnly,
	setIsFriendOnly,
	isSaving = false,
	OnSave,
}: EmotionWriteProps) => {
	const userCharacter = useUserCharacter();
	const activeCharacter = userCharacter;
	const message = CHARACTER_RECORD_MESSAGES[activeCharacter];
	const keyboardHeight = useKeyboardHeight();
	const textInputHeight = keyboardHeight > 0 ? keyboardHeight : 224;

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				nestedScrollEnabled={true}
				contentContainerStyle={{
					paddingBottom: keyboardHeight > 0 ? keyboardHeight : 0,
				}}
			>
				<S.Container>
					<CharacterBubble
						character={activeCharacter}
						message={message}
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
							height={textInputHeight}
							multiline
							onChangeText={setText}
							value={text}
							scrollEnabled={true}
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
						disabled={!text || isSaving}
						onPress={OnSave}
					/>
				</S.Container>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};
