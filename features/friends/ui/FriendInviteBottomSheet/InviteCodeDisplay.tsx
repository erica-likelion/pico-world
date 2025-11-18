import * as S from "@/features/friends/style/FriendInviteBottomSheet.styles";
import { CopyInviteButton } from "@/features/friends/ui/FriendInviteBottomSheet/CopyInviteButton";

interface InviteCodeDisplayProps {
	inviteCode: string;
	isCopied: boolean;
	onCopy: () => void;
}

export function InviteCodeDisplay({
	inviteCode,
	isCopied,
	onCopy,
}: InviteCodeDisplayProps) {
	return (
		<S.CodeDisplay>
			<S.CodeText>{inviteCode}</S.CodeText>
			<CopyInviteButton isCopied={isCopied} onPress={onCopy} />
		</S.CodeDisplay>
	);
}
