import { useFriendsNavigation } from "@/features/friends/model/hooks/useFriendsNavigation";
import { FriendsContent } from "@/features/friends/ui";
import BellIcon from "@/shared/assets/icons/bell.svg";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";

export default function Friends() {
	const { show } = useBottomNavStore();
	const { handleAddFriendPress, handleProfilePress } = useFriendsNavigation();
	const scrollViewRef = useRef<ScrollView>(null);

	useFocusEffect(
		useCallback(() => {
			show();
		}, [show]),
	);

	const handleScrollToTop = useCallback(() => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="친구" rightIcon={<BellIcon />} />
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={{ alignItems: "center" }}
				showsVerticalScrollIndicator={false}
			>
				<FriendsContent
					onProfilePress={handleProfilePress}
					onAddFriendPress={handleAddFriendPress}
					onScrollToTop={handleScrollToTop}
					profileName="하룰라라"
				/>
			</ScrollView>
		</View>
	);
}
