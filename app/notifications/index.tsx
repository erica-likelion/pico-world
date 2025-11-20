import { useNotifications } from "@/features/notifications/model/useNotifications";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { NotificationPermissionModal } from "@/features/notifications/ui/NotificationPermissionModal";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { Button } from "@/shared/ui/Button";
import { TopNav } from "@/widgets/TopNav/ui";
import messaging, {
	AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Linking, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function NotificationsScreen() {
	useHideBottomNav();
	const theme = useTheme();

	const [permissionStatus, setPermissionStatus] = useState<number>(
		AuthorizationStatus.AUTHORIZED,
	);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const isPermissionGranted =
		permissionStatus === AuthorizationStatus.AUTHORIZED ||
		permissionStatus === AuthorizationStatus.PROVISIONAL;

	const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
		useNotifications({ enabled: isPermissionGranted });

	const checkPermission = useCallback(async () => {
		const authStatus = await messaging().hasPermission();
		setPermissionStatus(authStatus);
		return authStatus;
	}, []);

	useEffect(() => {
		const handleInitialPermissionCheck = async () => {
			const authStatus = await checkPermission();
			if (authStatus === AuthorizationStatus.NOT_DETERMINED) {
				setIsModalVisible(true);
			}
		};
		handleInitialPermissionCheck();
	}, [checkPermission]);

	const handleRequestPermission = async () => {
		setIsModalVisible(false);

		if (permissionStatus === AuthorizationStatus.DENIED) {
			Linking.openSettings();
			return;
		}

		await registerForPushNotificationsAsync();
		const newStatus = await checkPermission();

		if (
			newStatus === AuthorizationStatus.AUTHORIZED ||
			newStatus === AuthorizationStatus.PROVISIONAL
		) {
			refetch();
		}
	};

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

	return (
		<View style={{ flex: 1, backgroundColor: "black" }}>
			<TopNav title="알림" leftIcon />
			<NotificationPermissionModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onConfirm={handleRequestPermission}
			/>

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
						onPress={() => {
							if (permissionStatus === AuthorizationStatus.DENIED) {
								Linking.openSettings();
							} else {
								setIsModalVisible(true);
							}
						}}
						text={
							permissionStatus === AuthorizationStatus.DENIED
								? "설정에서 알림 켜기"
								: "알림 켜기"
						}
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
