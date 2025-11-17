import * as S from "@/features/friends/style/FriendsCard.styles";
import { Avatar } from "@/shared/ui";
import { useTheme } from "styled-components/native";

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
	const avatarSize = parseFloat(theme.rem(36));
	const borderOffset = avatarSize / 2;

	return (
		<S.Container>
			<S.Header>
				<S.UserInfo>
					<Avatar size="small" imageUrl={avatarUrl} />
					<S.Name>{name}</S.Name>
					<S.DateText>{date}</S.DateText>
				</S.UserInfo>
				<S.EmotionBadge>
					<S.EmotionBadgeText>{emotionLabel}</S.EmotionBadgeText>
				</S.EmotionBadge>
			</S.Header>
			<S.Body borderOffset={borderOffset}>
				<S.BodyText numberOfLines={8}>{description}</S.BodyText>
			</S.Body>
		</S.Container>
	);
}
