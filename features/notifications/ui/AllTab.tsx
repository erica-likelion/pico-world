import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Notification } from "../model/types";
import { NotificationItem } from "./NotificationItem";

interface AllTabProps {
	notifications: Notification[];
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage?: boolean;
}

export const AllTab = ({
	notifications,
	isLoading,
	fetchNextPage,
	hasNextPage,
}: AllTabProps) => {
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
				<Text style={{ color: "white" }}>알림이 없습니다.</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={notifications}
			renderItem={({ item }) => <NotificationItem item={item} />}
			keyExtractor={(item) => item.notificationId.toString()}
			onEndReached={() => hasNextPage && fetchNextPage()}
			onEndReachedThreshold={0.5}
			ListFooterComponent={hasNextPage ? <ActivityIndicator /> : null}
			ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
			style={{ backgroundColor: "black" }}
		/>
	);
};
