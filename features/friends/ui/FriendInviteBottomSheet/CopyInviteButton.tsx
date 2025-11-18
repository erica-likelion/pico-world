import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";
import CheckIcon from "@/shared/assets/icons/check.svg";
import { useTheme } from "styled-components/native";

interface CopyInviteButtonProps {
	isCopied: boolean;
	onPress: () => void;
}

export function CopyInviteButton({ isCopied, onPress }: CopyInviteButtonProps) {
	const theme = useTheme();

	return (
		<S.CopyButton active={isCopied} activeOpacity={0.8} onPress={onPress}>
			{isCopied && (
				<CheckIcon
					style={{ marginLeft: 0 }}
					width={16}
					height={16}
					color={theme.grayscale.gray200}
				/>
			)}
			<S.CopyButtonText active={isCopied}>
				{isCopied ? "복사 완료!" : "복사하기"}
			</S.CopyButtonText>
		</S.CopyButton>
	);
}
