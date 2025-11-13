import { useInviteCodeCopy } from "@/features/friends/model/hooks/useInviteCodeCopy";
import { InviteCodeDisplay } from "@/features/friends/ui/FriendInviteBottomSheet/components/InviteCodeDisplay";
import { SpeechBubble } from "@/features/friends/ui/FriendInviteBottomSheet/components/SpeechBubble";
import CharacterImage from "@/shared/assets/images/characters/chch.png";
import { Avatar } from "@/shared/ui";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { Divider } from "@/shared/ui/Divider";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef, useState } from "react";
import {
	Image,
	TextInput as RNTextInput,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "styled-components/native";

import { createFriendInviteBottomSheetStyles } from "@/features/friends/style/FriendInviteBottomSheet.styles";

interface FriendInviteBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	profileName: string;
	inviteCode: string;
	onEnterCode?: (code: string) => void;
}

export function FriendInviteBottomSheet({
	bottomSheetRef,
	snapPoints = ["90%"],
	profileName,
	inviteCode,
	onEnterCode,
}: FriendInviteBottomSheetProps) {
	const theme = useTheme();
	const styles = useMemo(
		() => createFriendInviteBottomSheetStyles(theme),
		[theme],
	);

	const { isCopied, handleCopy } = useInviteCodeCopy();
	const [enteredCode, setEnteredCode] = useState("");
	const codeInputRef = useRef<RNTextInput>(null);

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
			containerStyle={styles.bottomSheet}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.titleWrapper}>
						<Text numberOfLines={1} style={styles.title}>
							친구 초대하기
						</Text>
					</View>
				</View>

				<View style={styles.contentGroup}>
					<SpeechBubble
						styles={styles}
						message="친구랑 같이 열심히 좀 기록해봐. 흠 멘트 뭐라하지..."
					/>

					<View style={styles.characterWrapper}>
						<LinearGradient
							colors={["#F57A24", "#FF4000"]}
							style={styles.characterGradient}
						>
							<Image source={CharacterImage} style={styles.characterImage} />
						</LinearGradient>
					</View>

					<View style={styles.codeOwnerRow}>
						<Avatar size="small" />
						<View style={styles.codeOwnerTexts}>
							<Text style={styles.friendName}>{profileName}</Text>
							<Text style={styles.friendCodeLabel}>님의 초대 코드</Text>
						</View>
					</View>

					<InviteCodeDisplay
						styles={styles}
						theme={theme}
						inviteCode={inviteCode}
						isCopied={isCopied}
						onCopy={handleCopy}
					/>

					<Text style={styles.infoText}>
						{"친한 친구 최대 5명에게 초대를 보내\n함께 기록을 작성해보세요."}
					</Text>
				</View>

				<Divider size="small" />

				<View style={styles.promptRow}>
					<Text style={styles.promptQuestion}>초대를 받았나요?</Text>
					<TouchableOpacity activeOpacity={0.8} onPress={handleFocusCodeEntry}>
						<Text style={styles.promptAction}>초대 코드 입력하기</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.codeEntryContainer}>
					<RNTextInput
						ref={codeInputRef}
						style={styles.codeEntryInput}
						placeholder="4자리 코드 입력"
						placeholderTextColor={theme.grayscale.gray400}
						value={enteredCode}
						onChangeText={setEnteredCode}
						keyboardType="default"
						maxLength={6}
						returnKeyType="done"
						onSubmitEditing={handleEnterCodeSubmit}
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.codeEntryButton}
						onPress={handleEnterCodeSubmit}
					>
						<Text style={styles.codeEntryButtonText}>친구 요청 보내기</Text>
					</TouchableOpacity>
				</View>
			</View>
		</CustomBottomSheet>
	);
}
