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
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components/native";

interface FriendsContentProps {
	onProfilePress: () => void;
	onAddFriendPress: () => void;
	onScrollToTop?: () => void;
	profileName: string;
}

const FRIEND_LIMIT = 5;
const INITIAL_REQUESTS: FriendRequest[] = [
	{
		id: "harulala",
		name: "하룰라라",
	},
];

export function FriendsContent({
	onProfilePress,
	onAddFriendPress,
	onScrollToTop,
	profileName,
}: FriendsContentProps) {
	const theme = useTheme();
	const [friendRequests, setFriendRequests] =
		useState<FriendRequest[]>(INITIAL_REQUESTS);
	const [acceptedFriends, setAcceptedFriends] = useState<FriendRequest[]>([]);
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
		setFriendRequests(INITIAL_REQUESTS);
		setAcceptedFriends([]);
		setFriendNotifications({});

		return () => {
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
		};
	}, []);

	const acceptedCount = acceptedFriends.length;
	const friendAddProgress = `${acceptedCount}/${FRIEND_LIMIT}`;
	const pendingRequest = friendRequests[0];
	const inviteCode = "0416";

	const handleRejectRequest = useCallback((id: string) => {
		setFriendRequests((prev) => prev.filter((request) => request.id !== id));
	}, []);

	const handleAcceptRequest = useCallback((request: FriendRequest) => {
		setFriendRequests((prev) => prev.filter((item) => item.id !== request.id));
		setAcceptedFriends((prev) => {
			if (prev.some((friend) => friend.id === request.id)) {
				return prev;
			}
			if (prev.length >= FRIEND_LIMIT) {
				return prev;
			}
			return [...prev, request];
		});
		setFriendNotifications((prev) => {
			if (prev[request.id] !== undefined) {
				return prev;
			}
			return { ...prev, [request.id]: true };
		});
	}, []);

	const handleAddFriendButtonPress = useCallback(() => {
		addFriendBottomSheetRef.current?.present();
	}, []);

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

	const handleRemoveFriend = useCallback(
		(friendId: string) => {
			if (!friendId) {
				return;
			}
			setAcceptedFriends((prev) =>
				prev.filter((friend) => friend.id !== friendId),
			);
			setFriendNotifications((prev) => {
				const { [friendId]: _removed, ...rest } = prev;
				return rest;
			});
			setSelectedFriend((current) =>
				current && current.id === friendId ? null : current,
			);
			showToast("친구를 끊었습니다.");
		},
		[showToast],
	);

	const openFriendBottomSheet = useCallback((friend: FriendRequest) => {
		setSelectedFriend(friend);
		menuBottomSheetRef.current?.present();
	}, []);

	const toastOffset = useMemo(
		() => Math.max(parseFloat(theme.rem(72)) - 8, 0),
		[theme],
	);

	return (
		<S.Container>
			<S.ProfileRow>
				<S.ProfileButtonWrapper>
					<ProfileButton logged />
					<S.ProfileLabel>{profileName}</S.ProfileLabel>
				</S.ProfileButtonWrapper>

				<S.FriendsList>
					{acceptedFriends.map((friend) => (
						<S.ProfileButtonWrapper key={friend.id}>
							<ProfileButton
								imageUrl={friend.avatarUrl}
								pressable
								onPress={() => openFriendBottomSheet(friend)}
							/>
							<S.ProfileLabel>{friend.name}</S.ProfileLabel>
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
				<CharacterBubble
					character="츠츠"
					message="Pico World는 친구랑 할 때 더 재밌는 거 알지? 5명까지 초대할 수 있으니 같이 기록해봐."
				/>
			</S.Spacing>

			{pendingRequest && (
				<>
					<S.DividerSpacing>
						<Divider size="large" />
					</S.DividerSpacing>

					<FriendRequestCard
						profileName={profileName}
						request={pendingRequest}
						onAccept={handleAcceptRequest}
						onReject={handleRejectRequest}
					/>

					<S.DividerSpacing>
						<Divider size="large" />
					</S.DividerSpacing>
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
				offset={toastOffset}
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
				friendAvatarUrl={selectedFriend?.avatarUrl}
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
