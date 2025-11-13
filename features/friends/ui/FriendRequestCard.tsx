import { Avatar, Button } from "@/shared/ui";
import { Text, View } from "react-native";
import { useMemo } from "react";
import { useTheme } from "styled-components/native";

import { createFriendRequestCardStyles } from "@/features/friends/style/FriendRequestCard.styles";
import type { FriendRequest } from "@/features/friends/model/types";

interface FriendRequestCardProps {
	profileName: string;
	request: FriendRequest;
	onAccept: (request: FriendRequest) => void;
	onReject: (requestId: string) => void;
	timeLabel?: string;
}

export function FriendRequestCard({
	profileName,
	request,
	onAccept,
	onReject,
	timeLabel = "1시간 전",
}: FriendRequestCardProps) {
	const theme = useTheme();
	const styles = useMemo(() => createFriendRequestCardStyles(theme), [theme]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.title}>
					<Text style={styles.titleStrong}>{profileName}님 </Text>
					<Text style={styles.titleText}>의 새로운 친구 요청이 있어요.</Text>
				</View>
				<Text style={styles.time}>{timeLabel}</Text>
			</View>

			<View style={styles.user}>
				<Avatar size="small" imageUrl={request.avatarUrl} />
				<Text style={styles.userName}>{request.name}</Text>
			</View>

			<View style={styles.actionsWrapper}>
				<View style={styles.actions}>
					<Button
						text="거절"
						size="medium"
						color="gray"
						onPress={() => onReject(request.id)}
					/>
					<Button
						text="수락"
						size="medium"
						color="white"
						onPress={() => onAccept(request)}
					/>
				</View>
			</View>
		</View>
	);
}
