import { useNotifications } from "@/features/notifications/model/useNotifications";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { useAuthStore } from "@/shared/store/auth";
import { Button } from "@/shared/ui/Button";
import { TopNav } from "@/widgets/TopNav/ui";
import messaging, {
	AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Linking, RefreshControl, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function NotificationsScreen() {
	useHideBottomNav();
	const theme = useTheme();
	const queryClient = useQueryClient();

	const [permissionStatus, setPermissionStatus] = useState<
		number | undefined
	>();
	const [refreshing, setRefreshing] = useState(false);

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
		enabled: isPermissionGranted && !!isLoggedIn,
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

			{isPermissionGranted ? (
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
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
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
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
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
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										tintColor="#ffffff"
										colors={["#ffffff"]}
									/>
								}
							/>
						)}
					</Tab.Screen>
				</Tab.Navigator>
			) : (
				<PermissionGuideContainer>
					<Title>알림을 켜고 소식을 받아보세요</Title>
					<Description>
						친구의 새로운 소식과 답장을{"\n"}
						놓치지 않고 받아볼 수 있어요.
					</Description>
					<Button
						size="large"
						onPress={() => Linking.openSettings()}
						text={"설정에서 알림 켜기"}
					/>
				</PermissionGuideContainer>
			)}
		</View>
	);
}

const PermissionGuideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Title = styled.Text`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  color: ${({ theme }) => theme.grayscale.white};
  margin-bottom: 8px;
  text-align: center;
`;

const Description = styled.Text`
  font-family: "Pretendard-Regular";
  font-size: 16px;
  color: ${({ theme }) => theme.grayscale.gray300};
  text-align: center;
  margin-bottom: 24px;
  line-height: 24px;
`;
