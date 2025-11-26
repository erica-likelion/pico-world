import {
	CharacterMessageBubble,
	MonthlyEmotion,
	PeakEmotionHours,
	TopEmotion,
} from "@/features/report/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function Report() {
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["report"] });
		setRefreshing(false);
	}, [queryClient]);

	return (
		<>
			<TopNav title="리포트" />
			<ScrollView
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
					<CharacterMessageBubble />
					<MonthlyEmotion
						onPress={({ thisMonthEmotion, lastMonthEmotion }) => {
							router.push({
								pathname: "/report/monthly-emotion",
								params: {
									thisMonthEmotion,
									lastMonthEmotion: lastMonthEmotion ?? "",
								},
							});
						}}
					/>
					<TopEmotion
						onPress={(emotions) => {
							const emotionParam = encodeURIComponent(JSON.stringify(emotions));
							router.push({
								pathname: "/report/top-emotion",
								params: {
									emotions: emotionParam,
								},
							});
						}}
					/>
					<PeakEmotionHours />
				</View>
			</ScrollView>
		</>
	);
}
