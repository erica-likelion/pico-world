import PolygonIcon from "@/shared/assets/icons/polygon.svg";
import type { FriendInviteBottomSheetStyles } from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { Text, View } from "react-native";

interface SpeechBubbleProps {
	styles: FriendInviteBottomSheetStyles;
	message: string;
}

export function SpeechBubble({ styles, message }: SpeechBubbleProps) {
	return (
		<View style={styles.speechBubbleContainer}>
			<View style={styles.speechBubble}>
				<Text style={styles.speechBubbleText}>{message}</Text>
			</View>
			<PolygonIcon style={styles.speechBubbleArrow} />
		</View>
	);
}
