import type { FriendInviteBottomSheetStyles } from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { Text, View } from "react-native";
import type { DefaultTheme } from "styled-components/native";

import { CopyInviteButton } from "@/features/friends/ui/FriendInviteBottomSheet/components/CopyInviteButton";

interface InviteCodeDisplayProps {
	styles: FriendInviteBottomSheetStyles;
	theme: DefaultTheme;
	inviteCode: string;
	isCopied: boolean;
	onCopy: () => void;
}

export function InviteCodeDisplay({
	styles,
	theme,
	inviteCode,
	isCopied,
	onCopy,
}: InviteCodeDisplayProps) {
	return (
		<View style={styles.codeDisplay}>
			<Text style={styles.codeText}>{inviteCode}</Text>
			<CopyInviteButton
				styles={styles}
				theme={theme}
				isCopied={isCopied}
				onPress={onCopy}
			/>
		</View>
	);
}
