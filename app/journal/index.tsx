import { getEmotionRecords } from "@/features/home/api/emotion";
import { deleteEmotionRecord } from "@/features/journal/api/emotion";
import { EmotionRecordList } from "@/features/journal/ui";
import type { EmotionRecord } from "@/shared/types/emotion";
import { MenuBottomSheet } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Journal() {
	const { show } = useBottomNavStore();
	const router = useRouter();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const queryClient = useQueryClient();
	const [selectedRecord, setSelectedRecord] = useState<EmotionRecord | null>(
		null,
	);
	const [currentMonth, setCurrentMonth] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});

	const monthQueryKey = `${currentMonth.getFullYear()}-${String(
		currentMonth.getMonth() + 1,
	).padStart(2, "0")}`;

	const { data: records = [] } = useQuery<EmotionRecord[]>({
		queryKey: ["emotionRecords", monthQueryKey],
		queryFn: () => getEmotionRecords(monthQueryKey),
	});

	useFocusEffect(
		useCallback(() => {
			show();
			queryClient.invalidateQueries({
				queryKey: ["emotionRecords", monthQueryKey],
			});
		}, [show, queryClient, monthQueryKey]),
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
			queryClient.invalidateQueries({
				queryKey: ["emotionRecords", monthQueryKey],
			});
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

	const handlePrevMonth = () => {
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
		);
	};

	const handleNextMonth = () => {
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
		);
	};

	const monthLabel = `${currentMonth.getMonth() + 1}월`;

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="기록" />
			<EmotionRecordList
				records={records}
				monthLabel={monthLabel}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
				onMenuPress={handleRecordSelect}
			/>
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
