import { CharacterDialog } from "@/entities/character/ui";
import BellIcon from "@/shared/assets/icons/bell.svg";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useEffect } from "react";
import { View } from "react-native";

export default function Home() {
	const { show } = useBottomNavStore();

	useEffect(() => {
		show();
	}, [show]);

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<TopNav title="홈" rightIcon={<BellIcon />} />
			<CharacterDialog />
		</View>
	);
}
