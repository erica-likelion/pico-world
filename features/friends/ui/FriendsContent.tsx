import {
	CharacterName,
	DEFAULT_CHARACTER,
} from "@/entities/character/model/characterMessages";
import { useHasRecordedToday } from "@/entities/emotion/model/emotionQueries";
import {
	useUserConnectCode,
	useUserNickname,
	useUserProfileImageUrl,
} from "@/entities/user/model/userQueries";
import { getFriendRequests } from "@/features/friends/api/getFriendRequests";
import { getFriends, type Friend } from "@/features/friends/api/getFriends";
import { getGreeting } from "@/features/friends/api/getGreeting";
import { removeFriend } from "@/features/friends/api/removeFriend";
import { respondToFriendRequest } from "@/features/friends/api/respondToFriendRequest";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

interface FriendsContentProps {
	onProfilePress: () => void;
	onAddFriendPress: () => void;
	onScrollToTop?: () => void;
	profileName: string;
}

const FRIEND_LIMIT = 5;

export function FriendsContent({
	onProfilePress,
	onAddFriendPress,
	onScrollToTop,
	profileName,
}: FriendsContentProps) {
	const theme = useTheme();
	const nickname = useUserNickname();
	const profileImageUrl = useUserProfileImageUrl();
	const hasRecordedToday = useHasRecordedToday();

	const { data: friendsData, error: friendsError } = useQuery({
		queryKey: ["friends"],
		queryFn: getFriends,
	});

	const queryClient = useQueryClient();

	const { data: friendRequestsData = [], error: friendRequestsError } =
		useQuery({
			queryKey: ["friendRequests"],
			queryFn: getFriendRequests,
		});

	const { data: greetingData } = useQuery({
		queryKey: ["greeting", "friend-reminder"],
		queryFn: () => getGreeting("friend-reminder"),
	});

	const acceptedFriends = friendsData ?? [];
	const addFriendBottomSheetRef = useRef<BottomSheetModal>(null);
	const menuBottomSheetRef = useRef<BottomSheetModal>(null);
	const [selectedFriend, setSelectedFriend] = useState<FriendRequest | null>(
		null,
	);
	const [friendNotifications, setFriendNotifications] = useState<
		Record<string, boolean>
	>({});
	const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	useEffect(() => {
		setFriendNotifications({});

		return () => {
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
		};
	}, []);

	const friendCount = acceptedFriends.length;
	const friendAddProgress = `${friendCount}/${FRIEND_LIMIT}`;
	const inviteCode = useUserConnectCode();

	const characterName: CharacterName =
		(greetingData?.characterName as CharacterName) || DEFAULT_CHARACTER;
	const greetingMessage =
		greetingData?.message ||
		"Pico World는 친구랑 할 때 더 재밌는 거 알지? 5명까지 초대할 수 있으니 같이 기록해봐.";

	//친구 요청 수락/거절
	const { mutate: respondToRequest } = useMutation({
		mutationFn: respondToFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: "친구 요청 응답에 실패했습니다.";
			showToast(errorMessage);
		},
	});

	//친국 끊기
	const { mutate: removeFriendMutate } = useMutation({
		mutationFn: removeFriend,
		onSuccess: () => {
			// 친구 목록 갱신
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			showToast("친구를 끊었습니다.");
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error ? error.message : "친구 끊기에 실패했습니다.";
			showToast(errorMessage);
		},
	});

	const showToast = useCallback((message: string) => {
		setToastMessage(message);
		setIsToastVisible(true);
		if (toastTimerRef.current) {
			clearTimeout(toastTimerRef.current);
		}
		toastTimerRef.current = setTimeout(() => {
			setIsToastVisible(false);
			setToastMessage("");
		}, 2000);
	}, []);

	useEffect(() => {
		if (friendsError) {
			console.error("친구 목록 조회 실패:", friendsError);
			showToast("친구 목록을 불러오는데 실패했습니다.");
		}
	}, [friendsError, showToast]);

	useEffect(() => {
		if (friendRequestsError) {
			console.error("친구 요청 목록 조회 실패:", friendRequestsError);
			showToast("친구 요청 목록을 불러오는데 실패했습니다.");
		}
	}, [friendRequestsError, showToast]);

	//친구 요청 거절
	const handleRejectRequest = useCallback(
		(id: string) => {
			const requestId = parseInt(id, 10);
			if (isNaN(requestId)) {
				showToast("잘못된 요청 ID입니다.");
				return;
			}
			respondToRequest({ requestId, accept: false });
			showToast("친구 요청을 거절했습니다.");
		},
		[respondToRequest, showToast],
	);

	//친구 요청 수락
	const handleAcceptRequest = useCallback(
		(request: FriendRequest) => {
			const requestId = parseInt(request.id, 10);
			if (isNaN(requestId)) {
				showToast("잘못된 요청 ID입니다.");
				return;
			}
			respondToRequest({ requestId, accept: true });
			showToast("친구 요청을 수락했습니다.");
		},
		[respondToRequest, showToast],
	);

	//친구 추가 버튼 클릭
	const handleAddFriendButtonPress = useCallback(() => {
		addFriendBottomSheetRef.current?.present();
	}, []);

	//초대 코드 입력
	const handleEnterInviteCode = useCallback(
		(code: string) => {
			if (code.length === 0) {
				return;
			}
			onAddFriendPress();
			showToast("친구 요청을 보냈어요!");
		},
		[onAddFriendPress, showToast],
	);

	//푸시 알림 토글
	const handleToggleFriendNotifications = useCallback(
		(friendId: string) => {
			if (!friendId) {
				return;
			}
			setFriendNotifications((prev) => {
				const current = prev[friendId] ?? true;
				const next = !current;
				showToast(
					next ? "푸시 알림을 받습니다." : "푸시 알림을 받지 않습니다.",
				);
				return {
					...prev,
					[friendId]: next,
				};
			});
		},
		[showToast],
	);

	//친구 끊기
	const handleRemoveFriend = useCallback(
		(connectCode: string) => {
			if (!connectCode) {
				return;
			}
			removeFriendMutate({ connectCode });
			showToast("친구를 끊었습니다.");
		},

		[removeFriendMutate, showToast],
	);

	const openFriendBottomSheet = useCallback((friend: Friend) => {
		setSelectedFriend({
			id: friend.connectCode,
			name: friend.nickname,
			profileImageUrl: friend.profileImageUrl ?? undefined,
		});
		menuBottomSheetRef.current?.present();
	}, []);

	return (
		<S.Container>
			<S.ProfileRow>
				<S.ProfileButtonWrapper>
					<ProfileButton
						logged={hasRecordedToday}
						imageUrl={profileImageUrl ?? undefined}
					/>
					<S.ProfileLabel>{nickname}</S.ProfileLabel>
				</S.ProfileButtonWrapper>

				<S.FriendsList>
					{acceptedFriends.map((friend) => (
						<S.ProfileButtonWrapper key={friend.connectCode}>
							<ProfileButton
								imageUrl={friend.profileImageUrl ?? undefined}
								pressable
								onPress={() => openFriendBottomSheet(friend)}
							/>
							<S.ProfileLabel>{friend.nickname}</S.ProfileLabel>
						</S.ProfileButtonWrapper>
					))}

					<S.ProfileButtonWrapperPressable onPress={handleAddFriendButtonPress}>
						<S.ProfileButtonContent>
							<FriendsPlusIcon width={theme.rem(64)} height={theme.rem(64)} />
						</S.ProfileButtonContent>
						<S.ProfileLabel numberOfLines={2} ellipsizeMode="tail">
							친구 추가 {friendAddProgress}
						</S.ProfileLabel>
					</S.ProfileButtonWrapperPressable>
				</S.FriendsList>
			</S.ProfileRow>

			<S.Spacing>
				<CharacterBubble character={characterName} message={greetingMessage} />
			</S.Spacing>

			{friendRequestsData.length > 0 && (
				<>
					{friendRequestsData.map((request, index) => (
						<View key={request.requestId}>
							<S.DividerSpacing>
								<Divider size="large" />
							</S.DividerSpacing>

							<FriendRequestCard
								request={{
									id: request.requestId.toString(),
									name: request.requesterNickname,
									profileImageUrl: request.profileImageUrl ?? undefined,
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
				</>
			)}

			<FriendsCard
				name="루루"
				date={new Date().toISOString().split("T")[0].replace(/-/g, ". ")}
				emotionLabel="잔잔한"
				description="한적한 카페에서 늦은 오후를 보냈어. 창밖으로 비가 내려서 마음이 조용히 가라앉더라. 따뜻한 라떼 한 잔에 마음이 느긋해진 느낌이야."
			/>

			<S.DividerSpacing>
				<Divider size="large" />
			</S.DividerSpacing>

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

			<Toast
				visible={isToastVisible}
				message={toastMessage}
				onHide={() => setIsToastVisible(false)}
			/>

			<FriendInviteBottomSheet
				bottomSheetRef={addFriendBottomSheetRef}
				profileName={profileName}
				inviteCode={inviteCode}
				onEnterCode={handleEnterInviteCode}
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
