import type { FriendRequest } from "@/features/friends/model/types";
import * as S from "@/features/friends/style/FriendRequestCard.styles";
import { Avatar, Button } from "@/shared/ui";

interface FriendRequestCardProps {
	request: FriendRequest;
	onAccept: (request: FriendRequest) => void;
	onReject: (requestId: string) => void;
	timeLabel: string;
}

export function FriendRequestCard({
	request,
	onAccept,
	onReject,
	timeLabel,
}: FriendRequestCardProps) {
	return (
		<S.Container>
			<S.Header>
				<S.Title>
					<S.TitleStrong>{request.name}님 </S.TitleStrong>
					<S.TitleText>의 새로운 친구 요청이 있어요.</S.TitleText>
				</S.Title>
				<S.Time>{timeLabel}</S.Time>
			</S.Header>

			<S.User>
				<Avatar size="small" imageUrl={request.profileImageUrl ?? undefined} />
				<S.UserName>{request.name}</S.UserName>
			</S.User>

			<S.ActionsWrapper>
				<S.Actions>
					<Button
						text="거절"
						size="medium"
						color="gray"
						onPress={() => onReject(request.id)}
					/>
					<Button
						text="수락"
						size="medium"
						color="white"
						onPress={() => onAccept(request)}
					/>
				</S.Actions>
			</S.ActionsWrapper>
		</S.Container>
	);
}
