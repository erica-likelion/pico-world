import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { sendFcmToken } from "@/shared/api/notification";
import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { navigationTheme, theme } from "@/shared/config/theme/theme";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { BottomNav } from "@/widgets/BottomNav/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
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
	useEffect(() => {
		const setupNotifications = async () => {
			const token = await registerForPushNotificationsAsync();
			if (token) {
				await sendFcmToken(token);
			}
		};
		setupNotifications();
	}, []);

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
	const { isVisible } = useBottomNavStore();
	const pathname = usePathname();
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
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
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
