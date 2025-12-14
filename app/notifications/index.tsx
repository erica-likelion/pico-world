import { useNotifications } from "@/features/notifications/model/useNotifications";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { PermissionGuide } from "@/features/notifications/ui/PermissionGuide";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { useAuthStore } from "@/shared/store/auth";
import { TopNav } from "@/widgets/TopNav/ui";
import messaging, {
	AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { useTheme } from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function NotificationsScreen() {
	useHideBottomNav();
	const theme = useTheme();
	const queryClient = useQueryClient();

	const [permissionStatus, setPermissionStatus] = useState<
		number | undefined
	>();
	const [refreshing, setRefreshing] = useState(false);
	const [showPermissionGuide, setShowPermissionGuide] = useState(true);

	const { isLoggedIn } = useAuthStore();

	useEffect(() => {
		const checkPermission = async () => {
			const authStatus = await messaging().hasPermission();
			setPermissionStatus(authStatus);
		};
		checkPermission();
	}, []);

	const isPermissionGranted =
		permissionStatus === AuthorizationStatus.AUTHORIZED ||
		permissionStatus === AuthorizationStatus.PROVISIONAL;

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
		setRefreshing(false);
	}, [queryClient]);

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
						<>
							<PermissionGuide
								show={showPermissionGuide && !isPermissionGranted}
								onDismiss={() => setShowPermissionGuide(false)}
							/>
							<AllTab
								notifications={allNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
							/>
						</>
					)}
				</Tab.Screen>
				<Tab.Screen name="Replies" options={{ title: "답장" }}>
					{() => (
						<>
							<PermissionGuide
								show={showPermissionGuide && !isPermissionGranted}
								onDismiss={() => setShowPermissionGuide(false)}
							/>
							<RepliesTab
								notifications={repliesNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
							/>
						</>
					)}
				</Tab.Screen>
				<Tab.Screen name="Friends" options={{ title: "친구" }}>
					{() => (
						<>
							<PermissionGuide
								show={showPermissionGuide && !isPermissionGranted}
								onDismiss={() => setShowPermissionGuide(false)}
							/>
							<FriendsTab
								notifications={friendsNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
							/>
						</>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</View>
	);
}
