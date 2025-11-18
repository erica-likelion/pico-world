import { Character } from "@/entities/character/model/character";
import {
	CharacterName,
	DEFAULT_CHARACTER,
} from "@/entities/character/model/characterMessages";
import {
	useUserNickname,
	useUserProfileImageUrl,
} from "@/entities/user/model/userQueries";
import { getFriends } from "@/features/friends/api/getFriends";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
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
	snapPoints = ["82%"],
	profileName,
	inviteCode,
	onEnterCode,
}: FriendInviteBottomSheetProps) {
	const theme = useTheme();
	const nickname = useUserNickname();
	const profileImageUrl = useUserProfileImageUrl();
	const { isCopied, handleCopy } = useInviteCodeCopy({ inviteCode });
	const [enteredCode, setEnteredCode] = useState("");
	const codeInputRef = useRef<TextInput>(null);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToast = useCallback((message: string) => {
		setToastMessage(message);
		setIsToastVisible(true);
	}, []);

	const FRIEND_LIMIT = 5;
	const { data: friends = [] } = useQuery({
		queryKey: ["friends"],
		queryFn: getFriends,
	});

	//인사
	const { data: greetingData } = useQuery({
		queryKey: ["greeting", "friend-invite"],
		queryFn: () => getGreeting("friend-invite"),
		retry: false,
	});

	// 친구 요청
	const { mutate: sendFriendRequestMutate } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: (data) => {
			const trimmed = enteredCode.trim();
			showToast("친구 요청을 보냈어요!");
			bottomSheetRef.current?.close();
			onEnterCode?.(trimmed);
			setEnteredCode("");
		},
		onError: (error: unknown) => {
			let errorMessage = "친구 요청에 실패했습니다.";

			if (error && typeof error === "object" && "response" in error) {
				const axiosError = error as {
					response?: { data?: { message?: string } };
				};
				if (axiosError.response?.data?.message) {
					errorMessage = axiosError.response.data.message;
				}
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}

			showToast(errorMessage);
		},
	});

	const AICharacter = useMemo(() => {
		const characterName: CharacterName =
			(greetingData?.characterName as CharacterName) || DEFAULT_CHARACTER;
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

		if (friends.length >= FRIEND_LIMIT) {
			showToast("친구가 이미 꽉찼어요");
			return;
		}

		const requestCode = {
			connectCode: trimmed,
		};
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
						<Avatar size="small" imageUrl={profileImageUrl ?? undefined} />
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
			<View style={{ position: "absolute", bottom: 30, left: 0, right: 0 }}>
				<Toast
					visible={isToastVisible}
					message={toastMessage}
					onHide={() => {
						setIsToastVisible(false);
						setToastMessage("");
					}}
				/>
			</View>
		</CustomBottomSheet>
	);
}
