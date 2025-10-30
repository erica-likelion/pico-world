import { TopNav } from "@/widgets/TopNav/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function JournalCalendar() {
	const router = useRouter();

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="달력" leftIcon={true} onLeftPress={() => router.back()} />
		</View>
	);
}
