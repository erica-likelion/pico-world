import { Notification } from "@/features/notifications/model/types";
import { useNotifications } from "@/features/notifications/model/useNotifications";
import * as S from "@/features/notifications/style/Tab.styles";
import { AllTab } from "@/features/notifications/ui/AllTab";
import { FriendsTab } from "@/features/notifications/ui/FriendsTab";
import { RepliesTab } from "@/features/notifications/ui/RepliesTab";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { TopNav } from "@/widgets/TopNav/ui";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

type TabName = "all" | "replies" | "friends";

export default function NotificationsScreen() {
	useHideBottomNav();
	const [activeTab, setActiveTab] = useState<TabName>("all");

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

	const tabs: {
		name: TabName;
		title: string;
		component: React.FC<any>;
		data: Notification[];
	}[] = [
		{ name: "all", title: "전체", component: AllTab, data: allNotifications },
		{
			name: "replies",
			title: "답장",
			component: RepliesTab,
			data: repliesNotifications,
		},
		{
			name: "friends",
			title: "친구",
			component: FriendsTab,
			data: friendsNotifications,
		},
	];

	const renderContent = () => {
		const tab = tabs.find((t) => t.name === activeTab);
		if (!tab) return null;

		const { component, data } = tab;
		return React.createElement(component, {
			notifications: data,
			isLoading,
			fetchNextPage,
			hasNextPage,
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: "black" }}>
			<TopNav title="알림" leftIcon />
			<S.TabContainer>
				{tabs.map((tab) => (
					<S.TabButton
						key={tab.name}
						active={activeTab === tab.name}
						onPress={() => setActiveTab(tab.name)}
					>
						<S.TabLabel active={activeTab === tab.name}>{tab.title}</S.TabLabel>
					</S.TabButton>
				))}
			</S.TabContainer>
			<View style={{ flex: 1 }}>{renderContent()}</View>
		</View>
	);
}
