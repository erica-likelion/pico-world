import DeleteIcon from "@/shared/assets/icons/delete.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import { theme } from "@/shared/config/theme/theme";
import * as S from "@/shared/style/MenuBottomSheet.styles";
import { Divider } from "@/shared/ui/Divider";
import {
	CustomBottomSheet,
	type BottomSheetRef,
} from "@/shared/ui/bottomSheet/CustomBottomSheet";
import DeleteModal from "@/shared/ui/modal/DeleteModal";
import { useState } from "react";
import { View } from "react-native";

interface MenuBottomSheetProps {
	bottomSheetRef: BottomSheetRef;
	snapPoints?: Array<string | number>;
	date: string;
	onDeleteConfirm?: () => void;
}
export function MenuBottomSheet({
	bottomSheetRef,
	snapPoints = ["42%"],
	date,
	onDeleteConfirm,
}: MenuBottomSheetProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleEditPress = () => {
		// 기록 수정으로 이동
		bottomSheetRef.current?.dismiss();
		console.log("기록 수정");
	};

	const handleDeletePress = () => {
		bottomSheetRef.current?.dismiss();
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleRecordDeleteConfirm = () => {
		setIsModalVisible(false);
		bottomSheetRef.current?.dismiss();
		onDeleteConfirm?.();
	};

	return (
		<>
			<CustomBottomSheet
				bottomSheetRef={bottomSheetRef}
				snapPoints={snapPoints}
			>
				<S.MenuHeader>
					<S.Text>{date}</S.Text>
				</S.MenuHeader>
				<Divider size="small" />
				<S.MenuItem onPress={handleEditPress}>
					<EditIcon width={24} height={24} color={theme.grayscale.gray200} />
					<S.Text>수정하기</S.Text>
				</S.MenuItem>
				<Divider size="small" />
				<S.MenuItem onPress={handleDeletePress}>
					<DeleteIcon width={24} height={24} color={theme.grayscale.gray200} />
					<S.Text>삭제하기</S.Text>
				</S.MenuItem>
				<View style={{ height: 30 }} />
			</CustomBottomSheet>
			<DeleteModal
				isVisible={isModalVisible}
				onConfirm={handleRecordDeleteConfirm}
				onCancel={handleCancel}
				date={date}
			/>
		</>
	);
}
