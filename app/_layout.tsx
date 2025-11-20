import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { navigationTheme, theme } from "@/shared/config/theme/theme";
import { useAuthStore } from "@/shared/store/auth";
import { useDeepLinkStore } from "@/shared/store/deepLink";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { BottomNav } from "@/widgets/BottomNav/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { type Href, Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
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
	const isLogin = pathname.startsWith("/login");

	const [loaded, error] = useFonts({
		"Pretendard-Bold": require("@/shared/assets/fonts/Pretendard-Bold.ttf"),
		"Pretendard-SemiBold": require("@/shared/assets/fonts/Pretendard-SemiBold.ttf"),
		"Pretendard-Medium": require("@/shared/assets/fonts/Pretendard-Medium.ttf"),
		"Pretendard-Regular": require("@/shared/assets/fonts/Pretendard-Regular.ttf"),
		...FontAwesome.font,
	});

	// 앱 초기화 로직
	useEffect(() => {
		const initializeApp = async () => {
			// 1. 인증 상태 확인
			const accessToken = await AsyncStorage.getItem("accessToken");
			const isUserLoggedIn = !!accessToken;
			setIsLoggedIn(isUserLoggedIn);

			// 2. 알림 리스너 설정 (로그인 여부와 관계 없이)
			messaging().setBackgroundMessageHandler(async (remoteMessage) => {
				console.log("백그라운드 메시지 수신:", remoteMessage);
			});
			messaging().onMessage(async (remoteMessage) => {
				console.log("포그라운드 메시지 수신:", remoteMessage);
				alert("메시지 수신" + remoteMessage);
			});

			messaging().onNotificationOpenedApp(async (remoteMessage) => {
				console.log("백그라운드/종료 알림 탭:", remoteMessage);
				const url = remoteMessage.data?.url as string | undefined;
				if (!url) return;

				// 이 시점의 로그인 상태를 다시 확인
				const currentIsLoggedIn = !!(await AsyncStorage.getItem("accessToken"));
				if (currentIsLoggedIn) {
					router.push(url as Href);
				} else {
					const { setPendingDestination } = useDeepLinkStore.getState();
					setPendingDestination(url);
					router.push("/login");
				}
			});

			messaging()
				.getInitialNotification()
				.then(async (remoteMessage) => {
					if (remoteMessage) {
						console.log("앱 종료 상태에서 알림 탭:", remoteMessage);
						const url = remoteMessage.data?.url as string | undefined;
						if (!url) return;
						const currentIsLoggedIn =
							!!(await AsyncStorage.getItem("accessToken"));
						if (currentIsLoggedIn) {
							router.push(url as Href);
						} else {
							const { setPendingDestination } = useDeepLinkStore.getState();
							setPendingDestination(url);
						}
					}
				});

			// 3. 로그인된 경우, FCM 토큰 등록
			if (isUserLoggedIn) {
				await registerForPushNotificationsAsync();
			}

			// 4. 모든 준비가 끝나면 스플래시 화면 숨기기
			if (loaded) {
				await SplashScreen.hideAsync();
			}
		};

		initializeApp();
	}, [loaded, setIsLoggedIn, router]);

	// 인증 상태에 따른 경로 보호
	useEffect(() => {
		if (isLoggedIn === null) {
			return; // 아직 인증 상태 확인 중
		}
		const inAuthGroup = pathname.startsWith("/login");

		if (!isLoggedIn && !inAuthGroup) {
			router.replace("/login");
		} else if (isLoggedIn && inAuthGroup) {
			router.replace("/home");
		}
	}, [isLoggedIn, pathname, router]);

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	// 폰트 로드 및 인증 확인 전에는 아무것도 렌더링하지 않음 (스플래시 화면 표시)
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
					</Layout>
				</ThemeProvider>
			</StyledThemeProvider>
		</SafeAreaProvider>
	);
}
