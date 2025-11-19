import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { navigationTheme, theme } from "@/shared/config/theme/theme";
import { useAuthStore } from "@/shared/store/auth";
import { useDeepLinkStore } from "@/shared/store/deepLink";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { BottomNav } from "@/widgets/BottomNav/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";
import { Href, Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
	const notificationListener = useRef<Notifications.Subscription | null>(null);
	const responseListener = useRef<Notifications.Subscription | null>(null);

	const [loaded, error] = useFonts({
		"Pretendard-Bold": require("@/shared/assets/fonts/Pretendard-Bold.ttf"),
		"Pretendard-SemiBold": require("@/shared/assets/fonts/Pretendard-SemiBold.ttf"),
		"Pretendard-Medium": require("@/shared/assets/fonts/Pretendard-Medium.ttf"),
		"Pretendard-Regular": require("@/shared/assets/fonts/Pretendard-Regular.ttf"),
		...FontAwesome.font,
	});
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const accessToken = await AsyncStorage.getItem("accessToken");
				setIsLoggedIn(!!accessToken);
			} catch (e) {
				setIsLoggedIn(false);
			}
		};
		checkAuthStatus();
	}, [setIsLoggedIn]);

	useEffect(() => {
		if (isLoggedIn === null) {
			return;
		}
		const inAuthGroup = pathname.startsWith("/login");

		if (!isLoggedIn && !inAuthGroup) {
			router.replace("/login");
		} else if (isLoggedIn && inAuthGroup) {
			router.replace("/home");
		}
	}, [isLoggedIn, pathname, router]);

	useEffect(() => {
		if (loaded && isLoggedIn !== null) {
			SplashScreen.hideAsync();
		}
	}, [loaded, isLoggedIn]);

	// 4. 알림 리스너 설정
	useEffect(() => {
		registerForPushNotificationsAsync();

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				console.log("알림 수신:", notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				async (response) => {
					console.log("사용자 알림 반응:", response);
					const url = response.notification.request.content.data?.url as
						| string
						| undefined;

					if (!url) return;

					if (isLoggedIn) {
						router.push(url as Href);
					} else {
						const { setPendingDestination } = useDeepLinkStore.getState();
						setPendingDestination(url);
						router.push("/login");
					}
				},
			);

		return () => {
			if (notificationListener.current) {
				notificationListener.current.remove();
			}
			if (responseListener.current) {
				responseListener.current.remove();
			}
		};
	}, [isLoggedIn, router]);

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	// 폰트 로드 및 인증 확인 전에는 아무것도 렌더링하지 않음 (스플래시 화면 표시)
	if (!loaded || isLoggedIn === null) {
		return null;
	}

	const isLogin = pathname.startsWith("/login");
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
					</Layout>
				</ThemeProvider>
			</StyledThemeProvider>
		</SafeAreaProvider>
	);
}
