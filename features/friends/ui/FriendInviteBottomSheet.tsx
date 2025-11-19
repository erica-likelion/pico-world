import {
	useUserNickname,
	useUserProfileImageUrl,
} from "@/entities/user/model/userQueries";
import {
	useFriendRequest,
	useGetFriends,
	useGreeting,
	useInviteCodeCopy,
	useKeyboardHeight,
	useToast,
} from "@/features/friends/model/hooks";
import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { InviteCodeDisplay } from "@/features/friends/ui/FriendInviteBottomSheet/InviteCodeDisplay";
import { SpeechBubble } from "@/features/friends/ui/FriendInviteBottomSheet/SpeechBubble";
import { Avatar, Toast } from "@/shared/ui";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { Divider } from "@/shared/ui/Divider";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TouchableOpacity, View, type TextInput } from "react-native";
import { useTheme } from "styled-components/native";

interface FriendInviteBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	inviteCode: string;
}

export function FriendInviteBottomSheet({
	bottomSheetRef,
	snapPoints = ["75%", "90%"],
	inviteCode,
}: FriendInviteBottomSheetProps) {
	const theme = useTheme();
	const nickname = useUserNickname();
	const profileImageUrl = useUserProfileImageUrl();
	const { isCopied, handleCopy } = useInviteCodeCopy({ inviteCode });
	const [enteredCode, setEnteredCode] = useState("");
	const codeInputRef = useRef<TextInput>(null);
	const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const keyboardHeight = useKeyboardHeight();
	const {
		isVisible: isToastVisible,
		message: toastMessage,
		show: showToast,
		hide: hideToast,
	} = useToast();
	const { message: greetingMessage, character: AICharacter } =
		useGreeting("friend-invite");

	const FRIEND_LIMIT = 5;
	const { friends } = useGetFriends();
	const friendsList = friends.data ?? [];

	const showToastWithAutoHide = useCallback(
		(message: string) => {
			showToast(message);
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
			toastTimerRef.current = setTimeout(() => {
				hideToast();
			}, 2000);
		},
		[showToast, hideToast],
	);

	const { friendRequest } = useFriendRequest({
		onSuccess: () => {
			showToastWithAutoHide("친구 요청을 보냈어요!");
			bottomSheetRef.current?.close();
			setEnteredCode("");
		},
		onError: showToastWithAutoHide,
	});

	const handleFocusCodeEntry = () => {
		codeInputRef.current?.focus();
	};

	const handleEnterCodeSubmit = () => {
		const trimmed = enteredCode.trim();
		if (trimmed.length === 0) {
			codeInputRef.current?.focus();
			return;
		}

		Keyboard.dismiss();
		friendRequest(trimmed, friendsList.length, FRIEND_LIMIT);
	};

	useEffect(() => {
		if (keyboardHeight === 0) {
			bottomSheetRef.current?.snapToIndex(0);
		}
	}, [keyboardHeight, bottomSheetRef.current?.snapToIndex]);

	return (
		<CustomBottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			initialIndex={-1}
			enableScroll
			keyboardBehavior="extend"
			keyboardBlurBehavior="restore"
			containerStyle={{ zIndex: 1000, elevation: 1000 }}
		>
			<S.Container>
				<S.Header>
					<S.TitleWrapper>
						<S.Title numberOfLines={1}>친구 초대하기</S.Title>
					</S.TitleWrapper>
				</S.Header>

				<S.ContentGroup>
					<SpeechBubble message={greetingMessage} />

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
				{keyboardHeight > 0 && <View style={{ height: 300 }} />}
			</S.Container>
			<View style={{ position: "relative", bottom: 40, left: 0, right: 0 }}>
				<Toast
					visible={isToastVisible}
					message={toastMessage}
					onHide={hideToast}
				/>
			</View>
		</CustomBottomSheet>
	);
}
