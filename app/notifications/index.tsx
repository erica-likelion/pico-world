import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Notification } from "@/features/notifications/model/types";
import { useNotifications } from "@/features/notifications/model/useNotifications";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { TopNav } from "@/widgets/TopNav/ui";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function NotificationsScreen() {
	useHideBottomNav();
	const theme = useTheme();

	const { data, fetchNextPage, hasNextPage, isLoading } = useNotifications();

	const allNotifications = useMemo(() => {
		return data?.pages.flatMap((page) => page.notifications) ?? [];
	}, [data]);

	const repliesNotifications = useMemo(() => {
		return allNotifications.filter((n) => !n.type.startsWith("FRIEND"));
	}, [allNotifications]);

	const friendsNotifications = useMemo(() => {
		return allNotifications.filter((n) => n.type.startsWith("FRIEND"));
	}, [allNotifications]);

	const renderAllTab = () => (
		<AllTab
			notifications={allNotifications}
			isLoading={isLoading}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
		/>
	);

	const renderRepliesTab = () => (
		<RepliesTab
			notifications={repliesNotifications}
			isLoading={isLoading}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
		/>
	);

	const renderFriendsTab = () => (
		<FriendsTab
			notifications={friendsNotifications}
			isLoading={isLoading}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
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
				<Tab.Screen
					name="All"
					component={renderAllTab}
					options={{ title: "전체" }}
				/>
				<Tab.Screen
					name="Replies"
					component={renderRepliesTab}
					options={{ title: "답장" }}
				/>
				<Tab.Screen
					name="Friends"
					component={renderFriendsTab}
					options={{ title: "친구" }}
				/>
			</Tab.Navigator>
		</View>
	);
}
