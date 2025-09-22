import EditScreenInfo from "@/features/debug/EditScreenInfo/ui";
import { Text, View } from "@/shared/ui/Themed";

export default function TabOneScreen() {
	return (
		<View className="flex-1 items-center justify-center bg-sky-100 dark:bg-sky-900">
			<Text className="text-2xl font-bold text-sky-800 dark:text-sky-200">
				Tab One
			</Text>
			<View className="my-7 h-px w-4/5 bg-gray-300 dark:bg-gray-700" />
			<EditScreenInfo path="app/(tabs)/index.tsx" />
		</View>
	);
}
