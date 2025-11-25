import { fetchGreeting } from "@/entities/character/api/greeting";
import { Character } from "@/entities/character/model/character";
import type { CharacterName } from "@/entities/character/model/characterMessages";
import { getEmotionRecords } from "@/features/home/api/emotion";
import { CalendarUI, ClickToJournal, TodayHistory } from "@/features/home/ui";
import { deleteEmotionRecord } from "@/features/journal/api/emotion";
import { NotificationBell } from "@/features/notifications/ui/NotificationBell";
import { useAuthStore } from "@/shared/store/auth";
import { MyCharacter } from "@/shared/store/myCharacter";
import type { EmotionRecord } from "@/shared/types/emotion";
import { CharacterBubble, MenuBottomSheet, Toast } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	View,
} from "react-native";

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
	const { isLoggedIn } = useAuthStore();
	const { name } = MyCharacter();

	const [selectedDate, setSelectedDate] = useState<string>(today);
	const [currentMonth, setCurrentMonth] = useState<string>(today.slice(0, 7));
	const [refreshing, setRefreshing] = useState(false);

	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const { data: greetingData } = useQuery({
		queryKey: ["greeting", "home"],
		queryFn: () => fetchGreeting({ context: "home" }),
		enabled: !!isLoggedIn,
	});

	const handleShowToast = useCallback((message: string) => {
		setToastMessage(message);
		setIsToastVisible(true);
	}, []);

	const handleHideToast = useCallback(() => {
		setIsToastVisible(false);
	}, []);

	const {
		data: emotionRecords = [],
		refetch,
		isLoading,
	} = useQuery<EmotionRecord[]>({
		queryKey: ["emotionRecords"],
		queryFn: getEmotionRecords,
		enabled: !!isLoggedIn,
	});

	const selectedRecord = useMemo(() => {
		const recordForSelectedDate = emotionRecords.find((r) => {
			const recordDate = new Date(r.created_at);
			const utc = recordDate.getTime() + recordDate.getTimezoneOffset() * 60000;
			const kstOffset = 9 * 60 * 60000;
			const kstDate = new Date(utc + kstOffset);
			return format(kstDate, "yyyy-MM-dd") === selectedDate;
		});
		return recordForSelectedDate || null;
	}, [emotionRecords, selectedDate]);

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch]),
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["emotionRecords"] });
		await queryClient.refetchQueries({ queryKey: ["greeting", "home"] });
		setRefreshing(false);
	}, [queryClient]);

	const deleteRecordMutation = useMutation({
		mutationFn: deleteEmotionRecord,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["emotionRecords"],
			});
			bottomSheetRef.current?.dismiss();
		},
		onError: (error) => {
			console.error("Error deleting record:", error);
		},
	});

	useEffect(() => {
		show();
	}, [show]);

	const handleDateSelect = (dateString: string) => {
		setSelectedDate(dateString);
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

	const characterName = (greetingData?.characterName as CharacterName) ?? name;
	const characterImage = useMemo(() => {
		const foundCharacter = Character.find((c) => c.name === characterName);
		return foundCharacter ? foundCharacter.image : undefined;
	}, [characterName]);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<TopNav
				title="홈"
				rightIcon={<NotificationBell />}
				onRightPress={() => {
					router.push("/notifications");
				}}
			/>
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#ffffff"
						colors={["#ffffff"]}
					/>
				}
			>
				<View style={{ width: "100%", paddingHorizontal: 16 }}>
					<CharacterBubble
						character={characterName}
						message={greetingData?.message?.replace(/"/g, "") ?? "..."}
					/>
				</View>
				{isLoading ? (
					<ActivityIndicator style={{ marginVertical: 20 }} />
				) : isTodayHistory && selectedRecord ? (
					<TodayHistory
						recordId={selectedRecord.record_id}
						AIImage={characterImage}
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
						router.push(`/record/edit?id=${selectedRecord.record_id}`);
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
