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
import { type Href, Stack, usePathname, useRouter } from "expo-router";
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
	const { isLoggedIn, setIsLoggedIn } = useAuthStore();
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

	const handleNotificationNavigation = useCallback(
		async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
			const { type, relatedId, url } = remoteMessage.data || {};
			console.log("Handling notification navigation:", remoteMessage.data);

			const currentIsLoggedIn = !!(await AsyncStorage.getItem("accessToken"));
			if (!currentIsLoggedIn) {
				const destination =
					type === "ai_feedback"
						? `/journal/edit?id=${relatedId}`
						: typeof type === "string" && type.startsWith("FRIEND")
							? "/friends"
							: (url as string | undefined);
				if (destination) {
					const { setPendingDestination } = useDeepLinkStore.getState();
					setPendingDestination(destination);
					router.push("/login");
				}
				return;
			}

			if (type === "ai_feedback" && relatedId) {
				router.replace(`/journal/edit?id=${relatedId}` as Href);
			} else if (typeof type === "string" && type.startsWith("FRIEND")) {
				router.replace("/friends");
			} else if (url) {
				router.replace(url as Href);
			}
		},
		[router],
	);

	useEffect(() => {
		const initializeApp = async () => {
			const accessToken = await AsyncStorage.getItem("accessToken");
			const isUserLoggedIn = !!accessToken;
			setIsLoggedIn(isUserLoggedIn);

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

			messaging()
				.getInitialNotification()
				.then((remoteMessage) => {
					if (remoteMessage) {
						handleNotificationNavigation(remoteMessage);
					}
				});

			if (isUserLoggedIn) {
				registerForPushNotificationsAsync();
			}

			if (loaded) {
				await SplashScreen.hideAsync();
			}
		};

		initializeApp();
	}, [loaded, setIsLoggedIn, showToast, handleNotificationNavigation]);

	useEffect(() => {
		if (isLoggedIn === null) {
			return;
		}
		const inAuthGroup = pathname.startsWith("/login");

		if (!isLoggedIn && !inAuthGroup) {
			router.replace("/login");
		}
	}, [isLoggedIn, pathname, router]);

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	if (!loaded || isLoggedIn === null) {
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
