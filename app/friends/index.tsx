import { FriendsContent } from "@/features/friends/ui";
import { NotificationBell } from "@/features/notifications/ui/NotificationBell";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function Friends() {
	const { show } = useBottomNavStore();
	const router = useRouter();
	const scrollViewRef = useRef<ScrollView>(null);
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	useFocusEffect(
		useCallback(() => {
			show();
		}, [show]),
	);

	const handleScrollToTop = useCallback(() => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
	}, []);

	const handleNotificationPress = useCallback(() => {
		router.push("/notifications");
	}, [router]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["friends"] });
		setRefreshing(false);
	}, [queryClient]);

	return (
		<View style={{ flex: 1 }}>
			<TopNav
				title="친구"
				rightIcon={<NotificationBell />}
				onRightPress={handleNotificationPress}
			/>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
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
				<FriendsContent onScrollToTop={handleScrollToTop} />
			</ScrollView>
		</View>
	);
}
