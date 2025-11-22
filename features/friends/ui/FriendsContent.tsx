import {
	type CharacterName,
	DEFAULT_CHARACTER,
} from "@/entities/character/model/characterMessages";
import { useHasRecordedToday } from "@/entities/emotion/model/emotionQueries";
import {
	useUserConnectCode,
	useUserNickname,
	useUserProfileImageUrl,
} from "@/entities/user/model/userQueries";
import type { Friend } from "@/features/friends/api/getFriends";
import {
	useFriendRequestResponse,
	useGetFriends,
	useRemoveFriend,
	useToast,
} from "@/features/friends/model/hooks";
import type { FriendRequest } from "@/features/friends/model/types";
import * as S from "@/features/friends/style/FriendsContent.styles";
import { FriendBottomSheet } from "@/features/friends/ui/FriendBottomSheet";
import { FriendInviteBottomSheet } from "@/features/friends/ui/FriendInviteBottomSheet";
import { FriendRequestCard } from "@/features/friends/ui/FriendRequestCard";
import { FriendsCard } from "@/features/friends/ui/FriendsCard/FriendsCard";
import FriendsPlusIcon from "@/shared/assets/icons/freinds-plus.svg";
import {
	Button,
	CharacterBubble,
	Divider,
	ProfileButton,
	Toast,
} from "@/shared/ui";
import { formatTimeAgo } from "@/shared/utils/date";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

interface FriendsContentProps {
	onScrollToTop?: () => void;
}

const FRIEND_LIMIT = 5;

export function FriendsContent({ onScrollToTop }: FriendsContentProps) {
	const theme = useTheme();
	const nickname = useUserNickname();
	const profileImageUrl = useUserProfileImageUrl();
	const hasRecordedToday = useHasRecordedToday();
	const inviteCode = useUserConnectCode();
	const { friends, friendRequests, friendFeed, greeting } = useGetFriends();

	const {
		isVisible: isToastVisible,
		message: toastMessage,
		show: showToast,
		hide: hideToast,
	} = useToast();
	const [selectedFriend, setSelectedFriend] = useState<FriendRequest | null>(
		null,
	);
	const [friendNotifications, setFriendNotifications] = useState<
		Record<string, boolean>
	>({});
	const addFriendBottomSheetRef = useRef<BottomSheetModal>(null);
	const menuBottomSheetRef = useRef<BottomSheetModal>(null);
	const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const acceptedFriends = friends.data ?? [];
	const friendRequestsData = friendRequests.data ?? [];
	const friendFeedData = friendFeed.data ?? [];
	const greetingData = greeting.data;

	const friendCount = acceptedFriends.length;
	const friendAddProgress = `${friendCount}/${FRIEND_LIMIT}`;

	const characterName: CharacterName =
		(greetingData?.characterName as CharacterName) || DEFAULT_CHARACTER;
	const greetingMessage =
		greetingData?.message ||
		"Pico World는 친구랑 할 때 더 재밌는 거 알지? 5명까지 초대할 수 있으니 같이 기록해봐.";

	const showToastWithAutoHide = useCallback(
		(message: string) => {
			showToast(message);
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
			toastTimerRef.current = setTimeout(() => {
				hideToast();
			}, 2000);
		},
		[showToast, hideToast],
	);

	const { friendAccept, friendReject } = useFriendRequestResponse({
		onError: showToastWithAutoHide,
	});
	const { disconnectFriend } = useRemoveFriend({
		onSuccess: () => showToastWithAutoHide("친구를 끊었습니다."),
		onError: showToastWithAutoHide,
	});

	useEffect(() => {
		setFriendNotifications({});

		return () => {
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (friends.error) {
			console.error("친구 목록 조회 실패:", friends.error);
			showToastWithAutoHide("친구 목록을 불러오는데 실패했습니다.");
		}
	}, [friends.error, showToastWithAutoHide]);

	useEffect(() => {
		if (friendRequests.error) {
			console.error("친구 요청 목록 조회 실패:", friendRequests.error);
			showToastWithAutoHide("친구 요청 목록을 불러오는데 실패했습니다.");
		}
	}, [friendRequests.error, showToastWithAutoHide]);

	const handleAcceptRequest = useCallback(
		(request: FriendRequest) => {
			const requestId = parseInt(request.id, 10);
			if (Number.isNaN(requestId)) {
				showToastWithAutoHide("잘못된 요청 ID입니다.");
				return;
			}
			friendAccept(requestId);
			showToastWithAutoHide("친구 요청을 수락했습니다.");
		},
		[friendAccept, showToastWithAutoHide],
	);

	const handleRejectRequest = useCallback(
		(id: string) => {
			const requestId = parseInt(id, 10);
			if (Number.isNaN(requestId)) {
				showToastWithAutoHide("잘못된 요청 ID입니다.");
				return;
			}
			friendReject(requestId);
			showToastWithAutoHide("친구 요청을 거절했습니다.");
		},
		[friendReject, showToastWithAutoHide],
	);

	const handleAddFriendButtonPress = useCallback(() => {
		addFriendBottomSheetRef.current?.present();
	}, []);

	const openFriendBottomSheet = useCallback((friend: Friend) => {
		setSelectedFriend({
			id: friend.connectCode,
			name: friend.nickname,
			profileImageUrl: friend.profileImageUrl ?? undefined,
		});
		menuBottomSheetRef.current?.present();
	}, []);

	const handleToggleFriendNotifications = useCallback(
		(friendId: string) => {
			if (!friendId) {
				return;
			}
			setFriendNotifications((prev) => {
				const current = prev[friendId] ?? true;
				const next = !current;
				showToastWithAutoHide(
					next ? "푸시 알림을 받습니다." : "푸시 알림을 받지 않습니다.",
				);
				return {
					...prev,
					[friendId]: next,
				};
			});
		},
		[showToastWithAutoHide],
	);

	const handleRemoveFriend = useCallback(
		(connectCode: string) => {
			disconnectFriend(connectCode);
		},
		[disconnectFriend],
	);

	return (
		<S.Container>
			<S.ProfileRow>
				<S.ProfileButtonWrapper>
					<ProfileButton
						logged={hasRecordedToday}
						imageUrl={profileImageUrl ?? undefined}
					/>
					<S.ProfileLabel numberOfLines={1} ellipsizeMode="tail">
						{nickname}
					</S.ProfileLabel>
				</S.ProfileButtonWrapper>

				<S.FriendsList>
					{acceptedFriends.map((friend) => (
						<S.ProfileButtonWrapper key={friend.connectCode}>
							<ProfileButton
								imageUrl={friend.profileImageUrl ?? undefined}
								logged={friend.hasRecordedToday ?? false}
								pressable
								onPress={() => openFriendBottomSheet(friend)}
							/>
							<S.ProfileLabel numberOfLines={1} ellipsizeMode="tail">
								{friend.nickname}
							</S.ProfileLabel>
						</S.ProfileButtonWrapper>
					))}

					<S.ProfileButtonWrapperPressable onPress={handleAddFriendButtonPress}>
						<S.ProfileButtonContent>
							<FriendsPlusIcon width={theme.rem(64)} height={theme.rem(64)} />
						</S.ProfileButtonContent>
						<S.ProfileLabel numberOfLines={1} ellipsizeMode="tail">
							친구 추가 {friendAddProgress}
						</S.ProfileLabel>
					</S.ProfileButtonWrapperPressable>
				</S.FriendsList>
			</S.ProfileRow>

			<S.Spacing>
				<CharacterBubble character={characterName} message={greetingMessage} />
			</S.Spacing>

			{friendRequestsData.length > 0 &&
				friendRequestsData.map((request, index) => (
					<View key={request.requestId}>
						<S.DividerSpacing>
							<Divider size="large" />
						</S.DividerSpacing>

						<FriendRequestCard
							request={{
								id: request.requestId.toString(),
								name: request.requesterNickname,
								profileImageUrl: request.requesterProfileImageUrl ?? undefined,
							}}
							timeLabel={formatTimeAgo(request.createdAt)}
							onAccept={handleAcceptRequest}
							onReject={handleRejectRequest}
						/>

						{index === friendRequestsData.length - 1 && (
							<S.DividerSpacing>
								<Divider size="large" />
							</S.DividerSpacing>
						)}
					</View>
				))}

			{friendFeedData.map((feed, index) => (
				<View key={feed.recordId}>
					<FriendsCard
						name={feed.authorNickname}
						date={formatTimeAgo(feed.createdAt)}
						emotionLabel={feed.emotionName}
						description={feed.record}
						avatarUrl={feed.authorProfileImageUrl ?? ""}
						mainColor={feed.mainColor}
						textColor={feed.textColor}
					/>
					{index < friendFeedData.length - 1 && (
						<S.DividerSpacing>
							<Divider size="large" />
						</S.DividerSpacing>
					)}
				</View>
			))}

			{friendFeedData.length > 0 && (
				<S.DividerSpacing>
					<Divider size="large" />
				</S.DividerSpacing>
			)}

			<S.Footer>
				<S.FooterText>
					기록을 모두 확인했습니다.
					{"\n"}친구들과 꾸준히 기록을 더 쌓아보세요.
				</S.FooterText>
				<S.FooterButtonWrapper>
					<Button
						text="위로 돌아가기"
						size="small"
						color="gray"
						onPress={onScrollToTop}
					/>
				</S.FooterButtonWrapper>
			</S.Footer>

			<View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
				<Toast
					visible={isToastVisible}
					message={toastMessage}
					onHide={hideToast}
				/>
			</View>
			<FriendInviteBottomSheet
				bottomSheetRef={addFriendBottomSheetRef}
				inviteCode={inviteCode}
			/>

			<FriendBottomSheet
				bottomSheetRef={menuBottomSheetRef}
				friendId={selectedFriend?.id}
				friendName={selectedFriend?.name ?? ""}
				friendAvatarUrl={selectedFriend?.profileImageUrl ?? undefined}
				notificationsEnabled={
					selectedFriend
						? (friendNotifications[selectedFriend.id] ?? true)
						: true
				}
				onToggleNotifications={handleToggleFriendNotifications}
				onDeleteConfirm={handleRemoveFriend}
			/>
		</S.Container>
	);
}
