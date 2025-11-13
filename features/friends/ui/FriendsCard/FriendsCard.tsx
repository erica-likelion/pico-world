import { Avatar } from "@/shared/ui";
import { Text, View } from "react-native";
import { useMemo } from "react";
import { useTheme } from "styled-components/native";

import { createFriendsCardStyles } from "@/features/friends/ui/FriendsCard/styles";

interface FriendsCardProps {
	name: string;
	date: string;
	emotionLabel: string;
	description: string;
	avatarUrl?: string;
}

export function FriendsCard({
	name,
	date,
	emotionLabel,
	description,
	avatarUrl,
}: FriendsCardProps) {
	const theme = useTheme();
	const styles = useMemo(() => createFriendsCardStyles(theme), [theme]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Avatar size="small" imageUrl={avatarUrl} />
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.date}>{date}</Text>
				</View>
				<View style={styles.emotionBadge}>
					<Text style={styles.emotionBadgeText}>{emotionLabel}</Text>
				</View>
			</View>
			<View style={styles.body}>
				<Text style={styles.bodyText} numberOfLines={8}>
					{description}
				</Text>
			</View>
		</View>
	);
}
