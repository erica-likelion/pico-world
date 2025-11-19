import BellIcon from "@/shared/assets/icons/bell.svg";
import { useTheme } from "styled-components/native";
import { useUnreadNotificationsCount } from "../model/useUnreadNotificationsCount";
import * as S from "../style/NotificationBell.styles";

export const NotificationBell = () => {
	const { data: unreadCount } = useUnreadNotificationsCount();
	const theme = useTheme();

	return (
		<S.Container>
			<BellIcon width={24} height={24} color={theme.grayscale.white} />
			{unreadCount !== undefined && unreadCount > 0 && (
				<S.BadgeContainer>
					{unreadCount >= 8 ? (
						<S.BadgeTextPlus>9⁺</S.BadgeTextPlus>
					) : (
						<S.BadgeText>{unreadCount}</S.BadgeText>
					)}
				</S.BadgeContainer>
			)}
		</S.Container>
	);
};
