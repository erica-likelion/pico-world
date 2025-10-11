import * as S from "@/shared/style/ProfileButton.style";

interface ProfileButtonProps {
	logged?: boolean;
	imageUrl?: string;
}

/**
 * ProfileButton
 * @param props - ProfileButton props
 * @param props.logged - 완료 상태 여부
 * @param props.imageUrl - 프로필 이미지 URL (없으면 UserIcon 표시)
 * @returns JSX.Element
 * @example
 * <ProfileButton />
 * <ProfileButton logged={true}/>
 */

export const ProfileButton = ({
	logged = false,
	imageUrl,
}: ProfileButtonProps) => {
	return (
		<S.Container>
			{logged && <S.OuterBorder />}

			<S.Background $logged={logged}>
				{logged && (
					<S.Guard>
						<S.Text>완료!</S.Text>
					</S.Guard>
				)}

				{imageUrl ? (
					<S.ProfileImage source={{ uri: imageUrl }} />
				) : (
					<S.UserIcon />
				)}
			</S.Background>
		</S.Container>
	);
};
