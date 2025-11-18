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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

	const { data: allRecords = [], isFetching } = useQuery<EmotionRecord[]>({
		queryKey: ["emotionRecords"],
		queryFn: getEmotionRecords,
	});

	const monthlyRecords = useMemo(() => {
		return allRecords.filter((record) => {
			const recordDate = new Date(record.created_at);
			return (
				recordDate.getFullYear() === currentMonth.getFullYear() &&
				recordDate.getMonth() === currentMonth.getMonth()
			);
		});
	}, [allRecords, currentMonth]);

	useFocusEffect(
		useCallback(() => {
			show();
			queryClient.invalidateQueries({ queryKey: ["emotionRecords"] });
		}, [show, queryClient]),
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
			queryClient.invalidateQueries({ queryKey: ["emotionRecords"] });
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

	const isNextMonthDisabled = useMemo(() => {
		const now = new Date();
		const nextMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			1,
		);
		return nextMonth > now;
	}, [currentMonth]);

	const handlePrevMonth = () => {
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
		);
	};

	const handleNextMonth = () => {
		if (isNextMonthDisabled) return;
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
		);
	};

	const monthLabel = `${currentMonth.getFullYear()}년 ${
		currentMonth.getMonth() + 1
	}월`;

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="기록" />
			<EmotionRecordList
				records={isFetching ? [] : monthlyRecords}
				monthLabel={monthLabel}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
				isNextMonthDisabled={isNextMonthDisabled}
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
