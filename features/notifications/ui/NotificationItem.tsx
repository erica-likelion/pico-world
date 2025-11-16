import { Notification } from "@/features/notifications/model/types";
import * as S from "@/features/notifications/style/NotificationItem.styles";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";

interface NotificationItemProps {
	item: Notification;
}

export const NotificationItem = ({ item }: NotificationItemProps) => {
	const timeAgo = formatDistanceToNowStrict(parseISO(item.createdAt), {
		addSuffix: true,
		locale: ko,
	});
	return (
		<S.ItemContainer>
			<S.ItemTitle>{item.title}</S.ItemTitle>
			<S.ItemBox>
				<S.ItemMessage>{item.message}</S.ItemMessage>
				<S.Time>{timeAgo}</S.Time>
			</S.ItemBox>
			<S.Line />
		</S.ItemContainer>
	);
};
