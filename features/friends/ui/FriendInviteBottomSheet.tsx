import { Character } from "@/entities/character/model/character";
import { useUserNickname } from "@/entities/user/model/userQueries";
import { getGreeting } from "@/features/friends/api/getGreeting";
import { sendFriendRequest } from "@/features/friends/api/sendFriendRequest";
import { useInviteCodeCopy } from "@/features/friends/model/hooks/useInviteCodeCopy";
import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { InviteCodeDisplay } from "@/features/friends/ui/FriendInviteBottomSheet/InviteCodeDisplay";
import { SpeechBubble } from "@/features/friends/ui/FriendInviteBottomSheet/SpeechBubble";
import { Avatar, Toast } from "@/shared/ui";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { Divider } from "@/shared/ui/Divider";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
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
	const nickname = useUserNickname();
	const { isCopied, handleCopy } = useInviteCodeCopy({ inviteCode });
	const [enteredCode, setEnteredCode] = useState("");
	const codeInputRef = useRef<TextInput>(null);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToast = useCallback((message: string) => {
		setToastMessage(message);
		setIsToastVisible(true);
	}, []);

	// 인사
	const { data: greetingData, mutate: fetchGreeting } = useMutation({
		mutationFn: () => getGreeting("friend-invite"),
	});

	// 친구 요청
	const { mutate: sendFriendRequestMutate } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: (data) => {
			console.log("친구 요청 성공:", data);
			const trimmed = enteredCode.trim();
			bottomSheetRef.current?.close();
			onEnterCode?.(trimmed);
			setEnteredCode("");
		},
		onError: (error) => {
			console.error("친구 요청 실패:", error);
			showToast("친구 요청 실패");
		},
	});

	useEffect(() => {
		fetchGreeting();
	}, [fetchGreeting]);

	const AICharacter = useMemo(() => {
		const characterName = greetingData?.characterName || "츠츠";
		return (
			Character.find((char) => char.name === characterName) || Character[0]
		);
	}, [greetingData?.characterName]);

	const handleFocusCodeEntry = () => {
		codeInputRef.current?.focus();
	};

	const handleEnterCodeSubmit = () => {
		const trimmed = enteredCode.trim();
		if (trimmed.length === 0) {
			codeInputRef.current?.focus();
			return;
		}

		const requestCode = {
			connectCode: trimmed,
		};

		console.log("친구 요청 전송:", requestCode);
		sendFriendRequestMutate(requestCode);
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
					<SpeechBubble
						message={greetingData?.message || "친구랑 같이 열심히 기록해봐."}
					/>

					<S.CharacterWrapper>
						<S.CharacterGradient boxShadow={AICharacter.boxShadow}>
							<S.CharacterImage source={AICharacter.image} />
						</S.CharacterGradient>
					</S.CharacterWrapper>

					<S.CodeOwnerRow>
						<Avatar size="small" />
						<S.CodeOwnerTexts>
							<S.FriendName>{nickname}</S.FriendName>
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
					<Toast
						visible={isToastVisible}
						message={toastMessage}
						onHide={() => {
							setIsToastVisible(false);
							setToastMessage("");
						}}
					/>
				</S.PromptRow>

				<S.CodeEntryContainer>
					<S.CodeEntryInput
						ref={codeInputRef}
						placeholder="8자리 코드 입력"
						placeholderTextColor={theme.grayscale.gray400}
						value={enteredCode}
						onChangeText={setEnteredCode}
						keyboardType="default"
						maxLength={8}
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
