import { View } from "react-native";
import * as S from "../style/Avatar.style";

type AvatarSize = "large" | "medium" | "small" | "xsSmall" | "xxsSmall";

interface AvatarProps {
	size?: AvatarSize;
	imageUrl?: string;
}

const SIZE_MAP: Record<AvatarSize, { bg: number; icon: number }> = {
	large: { bg: 64, icon: 48 },
	medium: { bg: 48, icon: 36 },
	small: { bg: 36, icon: 24 },
	xsSmall: { bg: 24, icon: 18 },
	xxsSmall: { bg: 18, icon: 16 },
};

/**
 * Avatar - 사용자 프로필 이미지나 기본 아이콘 표시
 * @param props - Avatar props
 * @param props.size - 크기 ("large" | "medium" | "small" | "xsSmall" | "xxsSmall")
 * @param props.imageUrl - 이미지 URL
 * @returns JSX.Element
 * @example
 * <Avatar size="large" />
 * <Avatar size="large" imageUrl="https://example.com/profile.jpg" />
 */

export const Avatar = ({ size = "small", imageUrl }: AvatarProps) => {
	const { bg, icon } = SIZE_MAP[size];
	return (
		<View>
			<S.Background $size={bg}>
				{imageUrl ? (
					<S.AvatarImage source={{ uri: imageUrl }} $size={bg} />
				) : (
					<S.UserIcon $size={icon} />
				)}
			</S.Background>
		</View>
	);
};
