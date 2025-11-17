import { Character } from "@/entities/character/model/character";
import { useInviteCodeCopy } from "@/features/friends/model/hooks/useInviteCodeCopy";
import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { InviteCodeDisplay } from "@/features/friends/ui/FriendInviteBottomSheet/InviteCodeDisplay";
import { SpeechBubble } from "@/features/friends/ui/FriendInviteBottomSheet/SpeechBubble";
import { Avatar } from "@/shared/ui";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { Divider } from "@/shared/ui/Divider";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef, useState } from "react";
import { TextInput as RNTextInput, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

interface FriendInviteBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	profileName: string;
	inviteCode: string;
	onEnterCode?: (code: string) => void;
}

export function FriendInviteBottomSheet({
	bottomSheetRef,
	snapPoints = ["80%"],
	profileName,
	inviteCode,
	onEnterCode,
}: FriendInviteBottomSheetProps) {
	const theme = useTheme();
	const { isCopied, handleCopy } = useInviteCodeCopy();
	const [enteredCode, setEnteredCode] = useState("");
	const codeInputRef = useRef<RNTextInput>(null);

	// 츠츠 캐릭터 데이터 사용
	const chchCharacter = useMemo(
		() => Character.find((char) => char.name === "츠츠") || Character[0],
		[],
	);

	const handleFocusCodeEntry = () => {
		codeInputRef.current?.focus();
	};

	const handleEnterCodeSubmit = () => {
		const trimmed = enteredCode.trim();
		if (trimmed.length === 0) {
			codeInputRef.current?.focus();
			return;
		}
		bottomSheetRef.current?.close();
		onEnterCode?.(trimmed);
		setEnteredCode("");
	};

	return (
		<CustomBottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			initialIndex={-1}
			enableScroll
			containerStyle={{ zIndex: 1000, elevation: 1000 }}
		>
			<S.Container>
				<S.Header>
					<S.TitleWrapper>
						<S.Title numberOfLines={1}>친구 초대하기</S.Title>
					</S.TitleWrapper>
				</S.Header>

				<S.ContentGroup>
					<SpeechBubble message="친구랑 같이 열심히 좀 기록해봐. 흠 멘트 뭐라하지..." />

					<S.CharacterWrapper>
						<S.CharacterGradient boxShadow={chchCharacter.boxShadow}>
							<LinearGradient
								colors={["#F57A24", "#FF4000"]}
								style={{
									width: parseFloat(theme.rem(124)),
									height: parseFloat(theme.rem(124)),
									borderRadius: parseFloat(theme.rem(62)),
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<S.CharacterImage source={chchCharacter.image} />
							</LinearGradient>
						</S.CharacterGradient>
					</S.CharacterWrapper>

					<S.CodeOwnerRow>
						<Avatar size="small" />
						<S.CodeOwnerTexts>
							<S.FriendName>{profileName}</S.FriendName>
							<S.FriendCodeLabel>님의 초대 코드</S.FriendCodeLabel>
						</S.CodeOwnerTexts>
					</S.CodeOwnerRow>

					<InviteCodeDisplay
						inviteCode={inviteCode}
						isCopied={isCopied}
						onCopy={handleCopy}
					/>

					<S.InfoText>
						{"친한 친구 최대 5명에게 초대를 보내\n함께 기록을 작성해보세요."}
					</S.InfoText>
				</S.ContentGroup>

				<Divider size="small" />

				<S.PromptRow>
					<S.PromptQuestion>초대를 받았나요?</S.PromptQuestion>
					<TouchableOpacity activeOpacity={0.8} onPress={handleFocusCodeEntry}>
						<S.PromptAction>초대 코드 입력하기</S.PromptAction>
					</TouchableOpacity>
				</S.PromptRow>

				<S.CodeEntryContainer>
					<RNTextInput
						ref={codeInputRef}
						style={{
							flex: 1,
							color: theme.grayscale.gray50,
							fontFamily: "Pretendard-Regular",
							fontSize: parseFloat(theme.rem(16)),
							lineHeight: parseFloat(theme.rem(24)),
							letterSpacing: -0.32,
							paddingVertical: parseFloat(theme.rem(4)),
						}}
						placeholder="4자리 코드 입력"
						placeholderTextColor={theme.grayscale.gray400}
						value={enteredCode}
						onChangeText={setEnteredCode}
						keyboardType="default"
						maxLength={6}
						returnKeyType="done"
						onSubmitEditing={handleEnterCodeSubmit}
					/>
					<S.CodeEntryButton
						activeOpacity={0.8}
						onPress={handleEnterCodeSubmit}
					>
						<S.CodeEntryButtonText>친구 요청 보내기</S.CodeEntryButtonText>
					</S.CodeEntryButton>
				</S.CodeEntryContainer>
			</S.Container>
		</CustomBottomSheet>
	);
}
