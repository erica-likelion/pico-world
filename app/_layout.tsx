import { navigationTheme, theme } from "@/shared/config/theme/theme";
import { BottomNav, useBottomNavStore } from "@/widgets/BottomNav";
import { TopNav } from "@/widgets/TopNav";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const { isVisible } = useBottomNavStore();
	const pathname = usePathname();
	const isLogin = pathname.startsWith("/login");

	const Layout = isLogin ? View : SafeAreaView;

	return (
		<SafeAreaProvider>
			<StyledThemeProvider theme={theme}>
				<ThemeProvider value={navigationTheme}>
					<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
						<StatusBar style="light" />

						<TopNav title="오매가몽" />

						<View style={{ flex: 1 }}>
							<Stack screenOptions={{ headerShown: false }} />
						</View>

						{isVisible && <BottomNav />}
					</SafeAreaView>
				</ThemeProvider>
			</StyledThemeProvider>
		</SafeAreaProvider>
	);
}
