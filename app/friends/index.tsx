import { useToast } from "@/features/friends/model/hooks/useToast";
import { FriendsContent } from "@/features/friends/ui";
import { NotificationBell } from "@/features/notifications/ui/NotificationBell";
import { Toast } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function Friends() {
	const router = useRouter();
	const scrollViewRef = useRef<ScrollView>(null);
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();
	const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const {
		isVisible: isToastVisible,
		message: toastMessage,
		show: showToast,
		hide: hideToast,
	} = useToast();

	const showToastWithAutoHide = useCallback(
		(message: string) => {
			showToast(message);
			if (toastTimerRef.current) {
				clearTimeout(toastTimerRef.current);
			}
			toastTimerRef.current = setTimeout(() => {
				hideToast();
			}, 2000);
		},
		[showToast, hideToast],
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
				<FriendsContent
					onScrollToTop={handleScrollToTop}
					onShowToast={showToastWithAutoHide}
				/>
			</ScrollView>
			<View
				style={{
					position: "absolute",
					bottom: 20,
					left: 0,
					right: 0,
					alignItems: "center",
				}}
			>
				<Toast
					visible={isToastVisible}
					message={toastMessage}
					onHide={hideToast}
				/>
			</View>
		</View>
	);
}
