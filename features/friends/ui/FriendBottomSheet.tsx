import { FriendDeleteModal } from "@/features/friends/ui/FriendDeleteModal";
import BellOffIcon from "@/shared/assets/icons/bell-off.svg";
import BellIcon from "@/shared/assets/icons/bell.svg";
import RemoveFriendIcon from "@/shared/assets/icons/remove-minus-circle.svg";
import { colors, grayscale } from "@/shared/config/theme/Colors";
import * as S from "@/shared/style/MenuBottomSheet.styles";
import { Avatar } from "@/shared/ui";
import { Divider } from "@/shared/ui/Divider";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import { useState } from "react";
import { View } from "react-native";

interface FriendBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	friendId?: string;
	friendName: string;
	friendAvatarUrl?: string;
	notificationsEnabled?: boolean;
	onToggleNotifications?: (friendId: string) => void;
	onDeleteConfirm?: (friendId: string) => void;
}

export function FriendBottomSheet({
	bottomSheetRef,
	snapPoints = ["42%"],
	friendId,
	friendName,
	friendAvatarUrl,
	notificationsEnabled = true,
	onToggleNotifications,
	onDeleteConfirm,
}: FriendBottomSheetProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleToggleNotifications = () => {
		bottomSheetRef.current?.close();
		if (friendId) {
			onToggleNotifications?.(friendId);
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
		if (friendId) {
			onDeleteConfirm?.(friendId);
		} else {
			onDeleteConfirm?.("");
		}
	};

	const notificationActionLabel = notificationsEnabled
		? "푸시 알림 끄기"
		: "푸시 알림 켜기";

	return (
		<>
			<CustomBottomSheet
				bottomSheetRef={bottomSheetRef}
				snapPoints={snapPoints}
				initialIndex={-1}
			>
				<S.MenuHeader>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 10,
							alignSelf: "stretch",
						}}
					>
						<Avatar size="small" imageUrl={friendAvatarUrl} />
						<S.Text>{friendName}</S.Text>
					</View>
				</S.MenuHeader>
				<Divider size="small" />
				<S.MenuItem onPress={handleToggleNotifications}>
					{notificationsEnabled ? (
						<BellOffIcon width={24} height={24} color={grayscale.gray200} />
					) : (
						<BellIcon width={24} height={24} color={grayscale.gray200} />
					)}
					<S.Text>{notificationActionLabel}</S.Text>
				</S.MenuItem>
				<Divider size="small" />
				<S.MenuItem onPress={handleRemoveFriendPress}>
					<RemoveFriendIcon width={24} height={24} color={colors.happy} />
					<S.Text style={{ color: colors.happy }}>친구 끊기</S.Text>
				</S.MenuItem>
			</CustomBottomSheet>
			<FriendDeleteModal
				isVisible={isModalVisible}
				onConfirm={handleRemoveConfirm}
				onCancel={handleCancel}
				friendName={friendName}
			/>
		</>
	);
}
