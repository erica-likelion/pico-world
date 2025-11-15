import type { EmotionRecord } from "@/features/home/model/emotionRecords";
import { EmotionRecordList } from "@/features/journal/ui";
import { MenuBottomSheet } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";

export default function Journal() {
	const { show } = useBottomNavStore();
	const router = useRouter();
	const bottomSheetRef = useRef<BottomSheet>(null);
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
		bottomSheetRef.current?.expand();
	};

	const handleEditPress = () => {
		if (selectedRecord) {
			router.push(`/record/edit?date=${selectedRecord.date}` as any);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="기록" />
			<EmotionRecordList onRecordSelect={handleRecordSelect} />
			{selectedRecord && (
				<MenuBottomSheet
					bottomSheetRef={bottomSheetRef}
					date={formatDate(selectedRecord.date, { korean: true })}
					onEditPress={handleEditPress}
				/>
			)}
		</View>
	);
}
