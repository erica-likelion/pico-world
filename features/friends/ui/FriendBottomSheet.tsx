import { useFriendAlarm } from "@/features/friends/hooks/useFriendAlarm";
import type { Friend } from "@/features/friends/model/types";
import { useFriendAlarmStore } from "@/features/friends/store/friendAlarm";
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
import { View } from "react-native";

interface FriendBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	friend: Friend | null;
	onDeleteConfirm?: (connectCode: string) => void;
	onRemoveFriendPress?: () => void;
}

interface FriendBottomSheetContentProps {
	bottomSheetRef: BottomSheetRef;
	friend: Friend;
	onRemoveFriendPress?: () => void;
}

function FriendBottomSheetContent({
	bottomSheetRef,
	friend,
	onRemoveFriendPress,
}: FriendBottomSheetContentProps) {
	const { block, unblock } = useFriendAlarm(friend);
	const { blockedFriends } = useFriendAlarmStore();

	const isBlocked = blockedFriends[friend.connectCode] ?? false;
	console.log(
		`[FriendBottomSheet] Friend: ${friend.nickname}, ConnectCode: ${friend.connectCode}, isBlocked: ${isBlocked}`,
	);

	const handleToggleNotifications = () => {
		console.log("[FriendBottomSheet] handleToggleNotifications called.");
		bottomSheetRef.current?.close();
		if (isBlocked) {
			console.log("[FriendBottomSheet] Calling unblock...");
			unblock();
		} else {
			console.log("[FriendBottomSheet] Calling block...");
			block();
		}
	};

	const handleRemoveFriendPress = () => {
		bottomSheetRef.current?.close();
		onRemoveFriendPress?.();
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
		</>
	);
}

export function FriendBottomSheet({
	bottomSheetRef,
	snapPoints = ["42%"],
	friend,
	onRemoveFriendPress,
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
					onRemoveFriendPress={onRemoveFriendPress}
				/>
			)}
		</CustomBottomSheet>
	);
}
