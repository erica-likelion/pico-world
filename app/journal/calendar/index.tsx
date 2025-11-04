import { CalendarUI } from "@/features/journal/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function JournalCalendar() {
	const router = useRouter();

	const handleDateSelect = (dateString: string) => {
		// TODO: 날짜 선택 시 처리 로직
		console.log("Selected date:", dateString);
	};

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="달력" leftIcon={true} onLeftPress={() => router.back()} />
			<ScrollView
				contentContainerStyle={{
					alignItems: "center",
					paddingHorizontal: 16,
					paddingTop: 16,
					paddingBottom: 34,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ width: "100%" }}>
					<CalendarUI onDateSelect={handleDateSelect} />
				</View>
			</ScrollView>
		</View>
	);
}
