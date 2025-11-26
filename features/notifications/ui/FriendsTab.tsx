import React from "react";
import type { RefreshControlProps } from "react-native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import type { Notification } from "../model/types";
import { NotificationItem } from "./NotificationItem";

interface FriendsTabProps {
	notifications: Notification[];
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage?: boolean;
	refreshControl: React.ReactElement<RefreshControlProps>;
}

export const FriendsTab = ({
	notifications,
	isLoading,
	fetchNextPage,
	hasNextPage,
	refreshControl,
}: FriendsTabProps) => {
	if (isLoading && !notifications.length) {
		return <ActivityIndicator style={{ marginTop: 20 }} />;
	}

	if (!notifications.length) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "black",
				}}
			>
				<Text style={{ color: "white" }}>친구 알림이 없습니다.</Text>
			</View>
		);
	}

	return (
		<View style={{ marginTop: 24 }}>
			<FlatList
				data={notifications}
				renderItem={({ item }) => <NotificationItem item={item} />}
				keyExtractor={(item) => item.notificationId.toString()}
				onEndReached={() => hasNextPage && fetchNextPage()}
				onEndReachedThreshold={0.5}
				ListFooterComponent={hasNextPage ? <ActivityIndicator /> : null}
				ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
				style={{ backgroundColor: "black" }}
				refreshControl={refreshControl}
			/>
		</View>
	);
};
