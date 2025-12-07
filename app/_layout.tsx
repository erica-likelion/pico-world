import { useToast } from "@/features/friends/model/hooks/useToast";
import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { queryClient } from "@/shared/config/queryClient";
import { navigationTheme, theme } from "@/shared/config/theme/theme";
import { useAuthStore } from "@/shared/store/auth";
import { useDeepLinkStore } from "@/shared/store/deepLink";
import { ErrorToast } from "@/shared/ui/ErrorToast";
import { Toast } from "@/shared/ui/Toast";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { BottomNav } from "@/widgets/BottomNav/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging, {
	type FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
	type Href,
	Stack,
	useNavigationContainerRef,
	usePathname,
	useRootNavigationState,
	useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<RootLayoutNav />
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

function RootLayoutNav() {
	const router = useRouter();
	const pathname = usePathname();
	const { isVisible } = useBottomNavStore();
	const { isLoggedIn, setIsLoggedIn, isOnboarding, setIsOnboarding } =
		useAuthStore();
	const rootState = useRootNavigationState();
	const navigationRef = useNavigationContainerRef();

	const { pendingDestination, setPendingDestination, clearPendingDestination } =
		useDeepLinkStore();
	const {
		isVisible: isToastVisible,
		message: toastMessage,
		show: showToast,
		hide: hideToast,
	} = useToast();
	const isLogin = pathname.startsWith("/login");

	const [loaded, error] = useFonts({
		"Pretendard-Bold": require("@/shared/assets/fonts/Pretendard-Bold.ttf"),
		"Pretendard-SemiBold": require("@/shared/assets/fonts/Pretendard-SemiBold.ttf"),
		"Pretendard-Medium": require("@/shared/assets/fonts/Pretendard-Medium.ttf"),
		"Pretendard-Regular": require("@/shared/assets/fonts/Pretendard-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		const checkAuthStatus = async () => {
			const accessToken = await AsyncStorage.getItem("accessToken");
			setIsLoggedIn(!!accessToken);

			if (accessToken) {
				const isOnboardingNeeded =
					await AsyncStorage.getItem("isOnboardingNeeded");
				setIsOnboarding(isOnboardingNeeded === "true");
			} else {
				setIsOnboarding(false);
			}
		};
		checkAuthStatus();
	}, [setIsLoggedIn, setIsOnboarding]);

	const handleNotificationNavigation = useCallback(
		async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
			const { type, relatedId, url } = remoteMessage.data || {};

			const destination =
				type === "ai_feedback" && relatedId
					? `/journal/edit?id=${relatedId}`
					: typeof type === "string" && type.startsWith("FRIEND")
						? "/friends"
						: url;
			if (!destination) return;

			const currentIsLoggedIn = !!(await AsyncStorage.getItem("accessToken"));
			if (currentIsLoggedIn) {
				router.push(destination as Href);
			} else {
				setPendingDestination(destination as string);
				router.push("/login");
			}
		},
		[router, setPendingDestination],
	);

	useEffect(() => {
		const isNavigationReady =
			rootState?.key && loaded && navigationRef && navigationRef.isReady();

		if (!isNavigationReady || isLoggedIn === null) return;

		const setupNotifications = async (): Promise<boolean> => {
			messaging().setBackgroundMessageHandler(async (remoteMessage) => {
				console.log("백그라운드 메시지 수신:", remoteMessage);
			});

			messaging().onMessage(async (remoteMessage) => {
				console.log("포그라운드 메시지 수신:", remoteMessage);
				const body = remoteMessage.notification?.body;
				if (body) {
					showToast(body);
				}
			});

			messaging().onNotificationOpenedApp(handleNotificationNavigation);

			const remoteMessage = await messaging().getInitialNotification();
			if (remoteMessage) {
				await handleNotificationNavigation(remoteMessage);
				return true;
			}

			if (isLoggedIn) {
				registerForPushNotificationsAsync();
			}
			return false;
		};

		setupNotifications().then((navigationHandledByNotification) => {
			SplashScreen.hideAsync();
			if (navigationHandledByNotification) {
				return;
			}

			if (pendingDestination) {
				if (isLoggedIn) {
					router.replace(pendingDestination as Href);
					clearPendingDestination();
				} else {
					router.replace("/login");
				}
				return;
			}

			const inAuthGroup = pathname.startsWith("/login");

			if (isLoggedIn && inAuthGroup && !isOnboarding) {
				router.replace("/home");
			}

			if (isLoggedIn && isOnboarding && pathname !== "/onboarding") {
				router.replace("/onboarding");
			}

			if (!isLoggedIn && !inAuthGroup && !isOnboarding) {
				router.replace("/login");
			}
		});
	}, [
		isLoggedIn,
		isOnboarding,
		pathname,
		rootState,
		loaded,
		handleNotificationNavigation,
		clearPendingDestination,
		pendingDestination,
		router,
		showToast,
		navigationRef,
	]);

	if (!loaded || !rootState?.key || isLoggedIn === null) {
		return null;
	}

	const Layout = isLogin ? View : SafeAreaView;

	return (
		<SafeAreaProvider>
			<StyledThemeProvider theme={theme}>
				<ThemeProvider value={navigationTheme}>
					<Layout
						style={{
							flex: 1,
							backgroundColor: isLogin ? "transparent" : "black",
						}}
					>
						<StatusBar style="light" />
						<View style={{ flex: 1 }}>
							<Stack
								screenOptions={{
									headerShown: false,
									animation: "slide_from_right",
								}}
							/>
						</View>
						{isVisible && <BottomNav />}
						<View
							style={{
								position: "absolute",
								bottom: 134,
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
						<ErrorToast />
					</Layout>
				</ThemeProvider>
			</StyledThemeProvider>
		</SafeAreaProvider>
	);
}
