import { useNotifications } from "@/features/notifications/model/useNotifications";
import { usePermissionGuide } from "@/features/notifications/model/usePermissionGuide";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { PermissionGuide } from "@/features/notifications/ui/PermissionGuide";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { useAuthStore } from "@/shared/store/auth";
import { TopNav } from "@/widgets/TopNav/ui";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { useTheme } from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function NotificationsPage() {
	useHideBottomNav();
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { isLoggedIn } = useAuthStore();
	const {
		showPermissionGuide,
		isPermissionGranted,
		handleDismiss,
		checkPermission,
	} = usePermissionGuide();

	const [refreshing, setRefreshing] = useState(false);

	const { data, fetchNextPage, hasNextPage, isLoading } = useNotifications({
		enabled: !!isLoggedIn,
	});

	const allNotifications = useMemo(() => {
		return data?.pages.flatMap((page) => page.notifications) ?? [];
	}, [data]);

	const repliesNotifications = useMemo(
		() => allNotifications.filter((n) => !n.type.startsWith("FRIEND")),
		[allNotifications],
	);

	const friendsNotifications = useMemo(
		() => allNotifications.filter((n) => n.type.startsWith("FRIEND")),
		[allNotifications],
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["notifications"] });
		await checkPermission();
		setRefreshing(false);
	}, [queryClient, checkPermission]);

	const refreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			tintColor="#ffffff"
			colors={["#ffffff"]}
		/>
	);

	const shouldShowGuide = showPermissionGuide && !isPermissionGranted;

	return (
		<View style={{ flex: 1, backgroundColor: "black" }}>
			<TopNav title="알림" leftIcon />
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: theme.grayscale.black,
					},
					tabBarIndicatorStyle: {
						backgroundColor: theme.grayscale.white,
					},
					tabBarLabelStyle: {
						fontFamily: "Pretendard-Bold",
						fontSize: 16,
					},
					tabBarActiveTintColor: theme.grayscale.white,
					tabBarInactiveTintColor: theme.grayscale.gray400,
				}}
			>
				<Tab.Screen name="All" options={{ title: "전체" }}>
					{() => (
						<AllTab
							notifications={allNotifications}
							isLoading={isLoading}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							headerComponent={
								shouldShowGuide ? (
									<PermissionGuide show={true} onDismiss={handleDismiss} />
								) : null
							}
							refreshControl={refreshControl}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen name="Replies" options={{ title: "답장" }}>
					{() => (
						<RepliesTab
							notifications={repliesNotifications}
							isLoading={isLoading}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							headerComponent={
								shouldShowGuide ? (
									<PermissionGuide show={true} onDismiss={handleDismiss} />
								) : null
							}
							refreshControl={refreshControl}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen name="Friends" options={{ title: "친구" }}>
					{() => (
						<FriendsTab
							notifications={friendsNotifications}
							isLoading={isLoading}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							headerComponent={
								shouldShowGuide ? (
									<PermissionGuide show={true} onDismiss={handleDismiss} />
								) : null
							}
							refreshControl={refreshControl}
						/>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</View>
	);
}
