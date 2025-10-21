import { CharacterDialog } from "@/entities/character/ui";
import { CalendarUI, ClickToJournal } from "@/features/home/ui";
import BellIcon from "@/shared/assets/icons/bell.svg";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
	const { show } = useBottomNavStore();

	useEffect(() => {
		show();
	}, [show]);

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="홈" rightIcon={<BellIcon />} />
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<CharacterDialog />
				<ClickToJournal />
				<CalendarUI />
			</ScrollView>
		</View>
	);
}
