import { useFriendAlarm } from "@/features/friends/hooks/useFriendAlarm";
import type { Friend } from "@/features/friends/model/types";
import { useFriendAlarmStore } from "@/features/friends/store/friendAlarm";
import { FriendDeleteModal } from "@/features/friends/ui/FriendDeleteModal";
import BellOffIcon from "@/shared/assets/icons/bell-off.svg";
import BellIcon from "@/shared/assets/icons/bell.svg";
import RemoveFriendIcon from "@/shared/assets/icons/remove-minus-circle.svg";
import { colors, grayscale } from "@/shared/config/theme/Colors";
import * as S from "@/shared/style/MenuBottomSheet.styles";
import { Avatar, Divider } from "@/shared/ui";
import {
	type BottomSheetRef,
	CustomBottomSheet,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { useState } from "react";
import { View } from "react-native";

interface FriendBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	friend: Friend | null;
	onDeleteConfirm?: (connectCode: string) => void;
}

interface FriendBottomSheetContentProps {
	bottomSheetRef: BottomSheetRef;
	friend: Friend;
	onDeleteConfirm?: (connectCode: string) => void;
}

function FriendBottomSheetContent({
	bottomSheetRef,
	friend,
	onDeleteConfirm,
}: FriendBottomSheetContentProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { block, unblock } = useFriendAlarm(friend);
	const { blockedFriends } = useFriendAlarmStore();

	const isBlocked = blockedFriends[friend.connectCode] ?? false;

	const handleToggleNotifications = () => {
		bottomSheetRef.current?.close();
		if (isBlocked) {
			unblock();
		} else {
			block();
		}
	};

	const handleRemoveFriendPress = () => {
		bottomSheetRef.current?.close();
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleRemoveConfirm = () => {
		setIsModalVisible(false);
		bottomSheetRef.current?.close();
		if (friend) {
			onDeleteConfirm?.(friend.connectCode);
		}
	};

	const notificationActionLabel = isBlocked
		? "푸시 알림 켜기"
		: "푸시 알림 끄기";

	return (
		<>
			<S.MenuHeader>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
						alignSelf: "stretch",
					}}
				>
					<Avatar size="small" imageUrl={friend.profileImageUrl ?? undefined} />
					<S.Text>{friend.nickname}</S.Text>
				</View>
			</S.MenuHeader>
			<Divider size="small" />
			<S.MenuItem onPress={handleToggleNotifications}>
				{isBlocked ? (
					<BellIcon width={24} height={24} color={grayscale.gray200} />
				) : (
					<BellOffIcon width={24} height={24} color={grayscale.gray200} />
				)}
				<S.Text>{notificationActionLabel}</S.Text>
			</S.MenuItem>
			<Divider size="small" />
			<S.MenuItem onPress={handleRemoveFriendPress}>
				<RemoveFriendIcon width={24} height={24} color={colors.happy} />
				<S.Text style={{ color: colors.happy }}>친구 끊기</S.Text>
			</S.MenuItem>
			<FriendDeleteModal
				isVisible={isModalVisible}
				onConfirm={handleRemoveConfirm}
				onCancel={handleCancel}
				friendName={friend.nickname}
			/>
		</>
	);
}

export function FriendBottomSheet({
	bottomSheetRef,
	snapPoints = ["42%"],
	friend,
	onDeleteConfirm,
}: FriendBottomSheetProps) {
	return (
		<CustomBottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			initialIndex={-1}
		>
			{friend && (
				<FriendBottomSheetContent
					friend={friend}
					bottomSheetRef={bottomSheetRef}
					onDeleteConfirm={onDeleteConfirm}
				/>
			)}
		</CustomBottomSheet>
	);
}
