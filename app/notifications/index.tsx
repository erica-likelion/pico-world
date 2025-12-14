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
import { useFocusEffect } from "expo-router";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { AppState, AppStateStatus, RefreshControl, View } from "react-native";
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
	const appState = useRef(AppState.currentState);

	const { isLoggedIn } = useAuthStore();

	const checkPermission = useCallback(async () => {
		const authStatus = await messaging().hasPermission();
		setPermissionStatus(authStatus);

		const isGranted =
			authStatus === AuthorizationStatus.AUTHORIZED ||
			authStatus === AuthorizationStatus.PROVISIONAL;

		if (!isGranted) {
			setShowPermissionGuide(true);
		} else {
			setShowPermissionGuide(false);
		}
	}, []);

	useEffect(() => {
		checkPermission();
	}, [checkPermission]);

	useFocusEffect(
		useCallback(() => {
			checkPermission();
		}, [checkPermission]),
	);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			(nextAppState: AppStateStatus) => {
				if (
					appState.current.match(/inactive|background/) &&
					nextAppState === "active"
				) {
					checkPermission();
				}
				appState.current = nextAppState;
			},
		);

		return () => {
			subscription.remove();
		};
	}, [checkPermission]);

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
					{() => {
						const shouldShowGuide = showPermissionGuide && !isPermissionGranted;
						return (
							<AllTab
								notifications={allNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								headerComponent={
									shouldShowGuide ? (
										<PermissionGuide
											show={true}
											onDismiss={() => setShowPermissionGuide(false)}
										/>
									) : null
								}
								refreshControl={refreshControl}
							/>
						);
					}}
				</Tab.Screen>
				<Tab.Screen name="Replies" options={{ title: "답장" }}>
					{() => {
						const shouldShowGuide = showPermissionGuide && !isPermissionGranted;
						return (
							<RepliesTab
								notifications={repliesNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								headerComponent={
									shouldShowGuide ? (
										<PermissionGuide
											show={true}
											onDismiss={() => setShowPermissionGuide(false)}
										/>
									) : null
								}
								refreshControl={refreshControl}
							/>
						);
					}}
				</Tab.Screen>
				<Tab.Screen name="Friends" options={{ title: "친구" }}>
					{() => {
						const shouldShowGuide = showPermissionGuide && !isPermissionGranted;
						return (
							<FriendsTab
								notifications={friendsNotifications}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								headerComponent={
									shouldShowGuide ? (
										<PermissionGuide
											show={true}
											onDismiss={() => setShowPermissionGuide(false)}
										/>
									) : null
								}
								refreshControl={refreshControl}
							/>
						);
					}}
				</Tab.Screen>
			</Tab.Navigator>
		</View>
	);
}
