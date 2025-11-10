import { getEmotionRecordByDate } from "@/features/home/model/emotionRecords";
import { CalendarUI, ClickToJournal, TodayHistory } from "@/features/home/ui";
import BellIcon from "@/shared/assets/icons/bell.svg";
import AIImageSrc from "@/shared/assets/images/chch.png";
import { CharacterBubble, MenuBottomSheet } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
	const { show } = useBottomNavStore();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toISOString().split("T")[0],
	);
	const [selectedRecord, setSelectedRecord] = useState(
		getEmotionRecordByDate(new Date().toISOString().split("T")[0]),
	);

	useEffect(() => {
		show();
	}, [show]);

	const handleDateSelect = (dateString: string) => {
		setSelectedDate(dateString);
		const record = getEmotionRecordByDate(dateString);
		setSelectedRecord(record);
	};

	const isTodayHistory = selectedRecord !== null;

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<TopNav title="홈" rightIcon={<BellIcon />} />
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ width: "100%", paddingHorizontal: 16 }}>
					<CharacterBubble
						character="츠츠"
						message={
							isTodayHistory
								? `너의 기록을 보고 있어. 나름 괜찮네.`
								: `기록이 없네. 뭐 했는지 기억도 안 나나?`
						}
					/>
				</View>
				{isTodayHistory && selectedRecord ? (
					<TodayHistory
						date={formatDate(selectedRecord.date)}
						time={selectedRecord.time}
						emotion={selectedRecord.emotion}
						text={selectedRecord.text}
						AIImage={AIImageSrc}
						onMenuPress={() => bottomSheetRef.current?.present()}
					/>
				) : (
					<ClickToJournal date={selectedDate} />
				)}
				<View
					style={{ width: "100%", paddingHorizontal: 16, marginBottom: 34 }}
				>
					<CalendarUI
						isTodayHistory={isTodayHistory}
						onDateSelect={handleDateSelect}
					/>
				</View>
			</ScrollView>
			{selectedRecord && (
				<MenuBottomSheet
					bottomSheetRef={bottomSheetRef}
					date={formatDate(selectedRecord.date, { korean: true })}
				/>
			)}
		</View>
	);
}
