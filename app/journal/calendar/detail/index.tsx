import EditIcon from "@/shared/assets/icons/edit.svg";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function JournalCalendarDetail() {
	const router = useRouter();
	const { date } = useLocalSearchParams<{ date: string }>();

	return (
		<View style={{ flex: 1 }}>
			<TopNav
				title="내 기록"
				leftIcon={true}
				rightIcon={<EditIcon />}
				onLeftPress={() => router.back()}
			/>
		</View>
	);
}
