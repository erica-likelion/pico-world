import FriendsPlusIcon from "@/shared/assets/icons/freinds-plus.svg";
import {
	Button,
	CharacterBubble,
	Divider,
	ProfileButton,
	Toast,
} from "@/shared/ui";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

import type { FriendRequest } from "@/features/friends/model/types";
import { createFriendsContentStyles } from "@/features/friends/style/FriendsContent.styles";
import { FriendBottomSheet } from "@/features/friends/ui/FriendBottomSheet";
import { FriendInviteBottomSheet } from "@/features/friends/ui/FriendInviteBottomSheet";
import { FriendRequestCard } from "@/features/friends/ui/FriendRequestCard";
import { FriendsCard } from "@/features/friends/ui/FriendsCard/FriendsCard";

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
	const { styles, profileButtonSize } = useMemo(
		() => createFriendsContentStyles(theme),
		[theme],
	);

	const [friendRequests, setFriendRequests] =
		useState<FriendRequest[]>(INITIAL_REQUESTS);
	const [acceptedFriends, setAcceptedFriends] = useState<FriendRequest[]>([]);
	const addFriendBottomSheetRef = useRef<BottomSheet>(null);
	const menuBottomSheetRef = useRef<BottomSheet>(null);
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
		addFriendBottomSheetRef.current?.expand();
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
		menuBottomSheetRef.current?.expand();
	}, []);

	const toastOffset = useMemo(
		() => Math.max(parseFloat(theme.rem(72)) - 8, 0),
		[theme],
	);

	return (
		<View style={styles.container}>
			<View style={styles.profileRow}>
				<View style={styles.profileButtonWrapper}>
					<ProfileButton logged />
					<Text style={styles.profileLabel}>{profileName}</Text>
				</View>

				<View style={styles.friendsList}>
					{acceptedFriends.map((friend) => (
						<View key={friend.id} style={styles.profileButtonWrapper}>
							<ProfileButton
								imageUrl={friend.avatarUrl}
								pressable
								onPress={() => openFriendBottomSheet(friend)}
							/>
							<Text style={styles.profileLabel}>{friend.name}</Text>
						</View>
					))}

					<Pressable
						style={[styles.profileButtonWrapper, styles.profileActionButton]}
						onPress={handleAddFriendButtonPress}
					>
						<View style={styles.profileButtonContent}>
							<FriendsPlusIcon
								width={profileButtonSize}
								height={profileButtonSize}
							/>
						</View>
						<Text style={styles.profileLabel}>
							친구 추가 {friendAddProgress}
						</Text>
					</Pressable>
				</View>
			</View>

			<View style={styles.spacing}>
				<CharacterBubble
					character="츠츠"
					message="Pico World는 친구랑 할 때 더 재밌는 거 알지? 5명까지 초대할 수 있으니 같이 기록해봐."
				/>
			</View>

			{pendingRequest && (
				<>
					<View style={styles.dividerSpacing}>
						<Divider size="large" />
					</View>

					<FriendRequestCard
						profileName={profileName}
						request={pendingRequest}
						onAccept={handleAcceptRequest}
						onReject={handleRejectRequest}
					/>

					<View style={styles.dividerSpacing}>
						<Divider size="large" />
					</View>
				</>
			)}

			<FriendsCard
				name="루루"
				date={new Date().toISOString().split("T")[0].replace(/-/g, ". ")}
				emotionLabel="잔잔한"
				description="한적한 카페에서 늦은 오후를 보냈어. 창밖으로 비가 내려서 마음이 조용히 가라앉더라. 따뜻한 라떼 한 잔에 마음이 느긋해진 느낌이야."
			/>

			<View style={styles.dividerSpacing}>
				<Divider size="large" />
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>
					기록을 모두 확인했습니다.
					{"\n"}친구들과 꾸준히 기록을 더 쌓아보세요.
				</Text>
				<View style={styles.footerButtonWrapper}>
					<Button
						text="위로 돌아가기"
						size="small"
						color="gray"
						onPress={onScrollToTop}
					/>
				</View>
			</View>

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
		</View>
	);
}
