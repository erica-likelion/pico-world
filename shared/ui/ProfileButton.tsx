import UserIconImage from "@/shared/assets/icons/user.png";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/shared/style/ProfileButton.style";

interface ProfileButtonProps {
	logged?: boolean;
	imageUrl?: string;
	onPress?: () => void;
}

/**
 * ProfileButton
 * @param props - ProfileButton props
 * @param props.logged - 완료 상태 여부
 * @param props.imageUrl - 프로필 이미지 URL (없으면 UserIcon 표시)
 * @param props.onPress - 완료 상태일 때만 실행되는 함수
 * @returns JSX.Element
 * @example
 * <ProfileButton />
 * <ProfileButton logged={true} onPress={() => console.log('clicked')} />
 */

export const ProfileButton = ({
	logged = false,
	imageUrl,
	onPress,
}: ProfileButtonProps) => {
	const { scale, handlePressIn, handlePressOut } = usePressAnimation({
		disabled: !logged,
	});

	const handlePress = () => {
		if (logged && onPress) {
			onPress();
		}
	};

	return (
		<S.Container
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={{ transform: [{ scale }] }}
		>
			{logged && <S.OuterBorder />}

			<S.Background $logged={logged} $isDefault={!imageUrl}>
				{logged && (
					<S.Guard>
						<S.Text>완료!</S.Text>
					</S.Guard>
				)}

				<S.ProfileImage source={imageUrl ? { uri: imageUrl } : UserIconImage} />
			</S.Background>
		</S.Container>
	);
};
