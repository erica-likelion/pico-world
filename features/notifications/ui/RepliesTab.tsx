import type { Notification } from "@/features/notifications/model/types";
import { NotificationItem } from "@/features/notifications/ui/NotificationItem";
import type React from "react";
import type { RefreshControlProps } from "react-native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

interface RepliesTabProps {
	notifications: Notification[];
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage?: boolean;
	headerComponent: React.ReactNode;
	refreshControl: React.ReactElement<RefreshControlProps>;
}

export const RepliesTab = ({
	notifications,
	isLoading,
	fetchNextPage,
	hasNextPage,
	headerComponent,
	refreshControl,
}: RepliesTabProps) => {
	if (isLoading && !notifications.length) {
		return <ActivityIndicator style={{ marginTop: 20 }} />;
	}

	return (
		<FlatList
			data={notifications}
			renderItem={({ item }) => <NotificationItem item={item} />}
			keyExtractor={(item) => item.notificationId.toString()}
			ListHeaderComponent={
				<>
					{headerComponent}
					{notifications.length > 0 && <View style={{ marginTop: 24 }} />}
				</>
			}
			ListEmptyComponent={
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ color: "white" }}>답장 알림이 없습니다.</Text>
				</View>
			}
			onEndReached={() => hasNextPage && fetchNextPage()}
			onEndReachedThreshold={0.5}
			ListFooterComponent={hasNextPage ? <ActivityIndicator /> : null}
			ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
			style={{ backgroundColor: "black" }}
			contentContainerStyle={{ flexGrow: 1 }}
			refreshControl={refreshControl}
		/>
	);
};
