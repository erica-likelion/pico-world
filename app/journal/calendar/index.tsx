import { CalendarUI } from "@/features/journal/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useRouter, type Href } from "expo-router";
import { ScrollView, View } from "react-native";

export default function JournalCalendar() {
	const router = useRouter();

	const handleDateSelect = (dateString: string) => {
		router.push(`/journal/calendar/detail?date=${dateString}` as Href);
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
