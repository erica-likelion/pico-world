import { deleteEmotionRecord } from "@/features/journal/api/emotion";
import { EmotionRecordList } from "@/features/journal/ui";
import type { EmotionRecord } from "@/shared/types/emotion";
import { MenuBottomSheet } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Journal() {
	const { show } = useBottomNavStore();
	const router = useRouter();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [selectedRecord, setSelectedRecord] = useState<EmotionRecord | null>(
		null,
	);

	useFocusEffect(
		useCallback(() => {
			show();
		}, [show]),
	);

	const handleRecordSelect = (record: EmotionRecord) => {
		setSelectedRecord(record);
	};

	useEffect(() => {
		if (selectedRecord) {
			bottomSheetRef.current?.present();
		}
	}, [selectedRecord]);

	const handleEditPress = () => {
		if (selectedRecord) {
			router.push(`/record/edit?id=${selectedRecord.record_id}` as any);
		}
	};

	const deleteRecordMutation = useMutation({
		mutationFn: deleteEmotionRecord,
		onSuccess: () => {
			setSelectedRecord(null);
			bottomSheetRef.current?.dismiss();
		},
		onError: (error) => {
			console.error("Error deleting record:", error);
		},
	});

	const handleDeleteConfirm = () => {
		if (selectedRecord) {
			deleteRecordMutation.mutate(selectedRecord.record_id);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="기록" />
			<EmotionRecordList onMenuPress={handleRecordSelect} />
			{selectedRecord && (
				<MenuBottomSheet
					bottomSheetRef={bottomSheetRef}
					date={formatDate(selectedRecord.created_at, { korean: true })}
					onEditPress={handleEditPress}
					onDeleteConfirm={handleDeleteConfirm}
				/>
			)}
		</View>
	);
}
