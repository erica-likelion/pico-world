import { getEmotionRecords } from "@/features/home/api/emotion";
import { CalendarUI, ClickToJournal, TodayHistory } from "@/features/home/ui";
import { deleteEmotionRecord } from "@/features/journal/api/emotion";
import BellIcon from "@/shared/assets/icons/bell.svg";
import AIImageSrc from "@/shared/assets/images/chch.png";
import type { EmotionRecord } from "@/shared/types/emotion";
import { CharacterBubble, MenuBottomSheet, Toast } from "@/shared/ui"; // Import Toast
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

const getTodayKST = () => {
	const now = new Date();
	const utc = now.getTime() + now.getTimezoneOffset() * 60000;
	const kstOffset = 9 * 60 * 60000;
	const kstDate = new Date(utc + kstOffset);
	return format(kstDate, "yyyy-MM-dd");
};

export default function Home() {
	const { show } = useBottomNavStore();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const today = getTodayKST();
	const queryClient = useQueryClient();

	const [selectedDate, setSelectedDate] = useState<string>(today);
	const [selectedRecord, setSelectedRecord] = useState<EmotionRecord | null>(
		null,
	);
	const [currentMonth, setCurrentMonth] = useState<string>(today.slice(0, 7));

	const [isToastVisible, setIsToastVisible] = useState(false); // Toast state
	const [toastMessage, setToastMessage] = useState(""); // Toast message state

	const handleShowToast = useCallback((message: string) => {
		setToastMessage(message);
		setIsToastVisible(true);
	}, []);

	const handleHideToast = useCallback(() => {
		setIsToastVisible(false);
	}, []);

	const { data: emotionRecords = [], refetch } = useQuery<EmotionRecord[]>({
		queryKey: ["emotionRecords", currentMonth],
		queryFn: () => getEmotionRecords(currentMonth),
	});

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch]),
	);

	const deleteRecordMutation = useMutation({
		mutationFn: deleteEmotionRecord,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["emotionRecords", currentMonth],
			});
			setSelectedRecord(null);
			bottomSheetRef.current?.dismiss();
		},
		onError: (error) => {
			console.error("Error deleting record:", error);
		},
	});

	useEffect(() => {
		show();
	}, [show]);

	useEffect(() => {
		if (selectedDate.startsWith(currentMonth)) {
			const recordForSelectedDate = emotionRecords.find((r) => {
				const recordDate = new Date(r.created_at);
				const utc =
					recordDate.getTime() + recordDate.getTimezoneOffset() * 60000;
				const kstOffset = 9 * 60 * 60000;
				const kstDate = new Date(utc + kstOffset);
				return format(kstDate, "yyyy-MM-dd") === selectedDate;
			});
			setSelectedRecord(recordForSelectedDate || null);
		}
	}, [emotionRecords, selectedDate, currentMonth]);

	const handleDateSelect = (dateString: string) => {
		setSelectedDate(dateString);
		const record = emotionRecords.find((r) => {
			const recordDate = new Date(r.created_at);
			const utc = recordDate.getTime() + recordDate.getTimezoneOffset() * 60000;
			const kstOffset = 9 * 60 * 60000;
			const kstDate = new Date(utc + kstOffset);
			return format(kstDate, "yyyy-MM-dd") === dateString;
		});
		setSelectedRecord(record || null);
	};

	const handleMonthChange = (month: string) => {
		setCurrentMonth(month);
	};

	const handleDeleteConfirm = () => {
		if (selectedRecord) {
			deleteRecordMutation.mutate(selectedRecord.record_id);
		}
	};

	const isTodayHistory = selectedRecord !== null;
	const isSelectedDateToday = selectedDate === today;

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<TopNav
				title="홈"
				rightIcon={<BellIcon />}
				onRightPress={() => {
					router.push("/notifications");
				}}
			/>
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
						record={selectedRecord}
						AIImage={AIImageSrc}
						onMenuPress={() => bottomSheetRef.current?.present()}
					/>
				) : (
					<ClickToJournal
						date={selectedDate}
						isToday={isSelectedDateToday}
						onShowToast={handleShowToast}
					/>
				)}
				<View
					style={{ width: "100%", paddingHorizontal: 16, marginBottom: 34 }}
				>
					<CalendarUI
						isTodayHistory={isTodayHistory}
						onDateSelect={handleDateSelect}
						emotionRecords={emotionRecords}
						currentMonth={currentMonth}
						onMonthChange={handleMonthChange}
					/>
				</View>
			</ScrollView>
			{selectedRecord && (
				<MenuBottomSheet
					bottomSheetRef={bottomSheetRef}
					date={formatDate(selectedRecord.created_at, { korean: true })}
					onEditPress={() => {
						router.push(`/record/edit?id=${selectedRecord.record_id}` as any);
					}}
					onDeleteConfirm={handleDeleteConfirm}
				/>
			)}
			<View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
				<Toast
					message={toastMessage}
					visible={isToastVisible}
					onHide={handleHideToast}
				/>
			</View>
		</View>
	);
}
