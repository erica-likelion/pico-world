import * as S from "@/features/friends/style/FriendsCard.styles";
import { Avatar } from "@/shared/ui";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

interface FriendsCardProps {
	name: string;
	date: string;
	emotionLabel: string;
	description: string;
	avatarUrl: string;
	mainColor: string;
	textColor: string;
}

export function FriendsCard({
	name,
	date,
	emotionLabel,
	description,
	avatarUrl,
	mainColor,
	textColor,
}: FriendsCardProps) {
	const theme = useTheme();
	const avatarSize = parseFloat(theme.rem(36));
	const borderOffset = avatarSize / 2;
	const [isExpanded, setIsExpanded] = useState(false);
	const [showReadMore, setShowReadMore] = useState(false);

	const handleTextLayout = (event: {
		nativeEvent: { lines: Array<{ text: string }> };
	}) => {
		if (isExpanded || showReadMore) return;

		const { lines } = event.nativeEvent;
		if (lines.length > 5) {
			setShowReadMore(true);
		}
	};

	const handleReadMore = () => {
		setIsExpanded(true);
		setShowReadMore(false);
	};

	return (
		<S.Container>
			<S.Header>
				<S.UserInfo>
					<Avatar size="small" imageUrl={avatarUrl} />
					<S.Name>{name}</S.Name>
					<S.DateText>{date}</S.DateText>
				</S.UserInfo>
				<S.EmotionBadge $backgroundColor={mainColor}>
					<S.EmotionBadgeText $textColor={textColor}>
						{emotionLabel}
					</S.EmotionBadgeText>
				</S.EmotionBadge>
			</S.Header>
			<S.Body borderOffset={borderOffset}>
				{!isExpanded && !showReadMore && (
					<S.BodyText
						onTextLayout={handleTextLayout}
						style={{ position: "absolute", opacity: 0 }}
					>
						{description}
					</S.BodyText>
				)}
				<S.BodyText numberOfLines={isExpanded ? undefined : 5}>
					{description}
				</S.BodyText>
				{showReadMore && (
					<TouchableOpacity onPress={handleReadMore}>
						<S.ReadMoreButton>
							<S.ReadMoreText>자세히보기</S.ReadMoreText>
						</S.ReadMoreButton>
					</TouchableOpacity>
				)}
			</S.Body>
		</S.Container>
	);
}
