import { useRouter } from "expo-router";
import { useCallback } from "react";

export function useFriendsNavigation() {
	const router = useRouter();

	const handleProfilePress = useCallback(() => {
		router.push("/my");
	}, [router]);

	const handleAddFriendPress = useCallback(() => {
		console.log("친구 추가 버튼 클릭");
	}, []);

	return {
		handleProfilePress,
		handleAddFriendPress,
	};
}
