import CheckIcon from "@/shared/assets/icons/check.svg";
import type { FriendInviteBottomSheetStyles } from "@/features/friends/style/FriendInviteBottomSheet.styles";
import type { DefaultTheme } from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";

interface CopyInviteButtonProps {
	styles: FriendInviteBottomSheetStyles;
	theme: DefaultTheme;
	isCopied: boolean;
	onPress: () => void;
}

export function CopyInviteButton({
	styles,
	theme,
	isCopied,
	onPress,
}: CopyInviteButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[styles.copyButton, isCopied && styles.copyButtonActive]}
			onPress={onPress}
		>
			{isCopied && (
				<CheckIcon
					style={styles.copyButtonIcon}
					width={16}
					height={16}
					color={theme.grayscale.gray200}
				/>
			)}
			<Text
				style={[styles.copyButtonText, isCopied && styles.copyButtonTextActive]}
			>
				{isCopied ? "복사 완료!" : "복사하기"}
			</Text>
		</TouchableOpacity>
	);
}
