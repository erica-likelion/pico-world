import * as S from "@/shared/style/Avatar.style";
import { AvatarSize, SIZE_MAP } from "@/shared/types";

interface AvatarProps {
	size?: AvatarSize;
	imageUrl?: string;
}

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
		<S.Background $size={bg}>
			{imageUrl ? (
				<S.AvatarImage source={{ uri: imageUrl }} $size={bg} />
			) : (
				<S.UserIcon $size={icon} />
			)}
		</S.Background>
	);
};
