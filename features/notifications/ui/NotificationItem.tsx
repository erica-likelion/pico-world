import { readNotifications } from "@/features/notifications/api/readNotifications";
import type { Notification } from "@/features/notifications/model/types";
import * as S from "@/features/notifications/style/NotificationItem.styles";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

interface NotificationItemProps {
	item: Notification;
}

export const NotificationItem = ({ item }: NotificationItemProps) => {
	const theme = useTheme();
	const router = useRouter();
	const timeAgo = formatDistanceToNowStrict(parseISO(item.createdAt), {
		addSuffix: true,
		locale: ko,
	});

	const { label, color } = useMemo(() => {
		if (item.type === "AI_FEEDBACK") {
			return { label: "답장", color: theme.colors.comfort };
		}
		if (item.type.startsWith("FRIEND")) {
			return { label: "친구", color: undefined };
		}
		return { label: item.title, color: undefined };
	}, [item.type, item.title, theme.colors.comfort]);

	const handlePress = () => {
		readNotifications(item.notificationId).then(() => {
			if (item.type.startsWith("FRIEND")) {
				router.push("/friends");
			} else if (item.type === "AI_FEEDBACK") {
				router.push(`/journal/detail?id=${item.relatedId}`);
			}
		});
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<S.ItemContainer>
				<S.ItemTitle color={color}>{label}</S.ItemTitle>
				<S.ItemBox>
					<S.ItemMessage isRead={item.isRead}>{item.message}</S.ItemMessage>
					<S.Time>{timeAgo}</S.Time>
				</S.ItemBox>
				<S.Line />
			</S.ItemContainer>
		</TouchableOpacity>
	);
};
