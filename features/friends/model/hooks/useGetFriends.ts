import { fetchGreeting } from "@/entities/character/api/greeting";
import { getFriendFeed } from "@/features/friends/api/getFriendFeed";
import { getFriendRequests } from "@/features/friends/api/getFriendRequests";
import { getFriends } from "@/features/friends/api/getFriends";
import { useAuthStore } from "@/shared/store/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetFriends() {
	const { isLoggedIn } = useAuthStore();

	const friendList = useQuery({
		queryKey: ["friends", "friendList"],
		queryFn: getFriends,
		enabled: !!isLoggedIn,
	});

	const friendRequests = useQuery({
		queryKey: ["friends", "friendRequests"],
		queryFn: getFriendRequests,
		enabled: !!isLoggedIn,
	});

	const friendFeed = useQuery({
		queryKey: ["friends", "friendFeed"],
		queryFn: getFriendFeed,
		enabled: !!isLoggedIn,
	});

	const greeting = useQuery({
		queryKey: ["friends", "greeting", "friend-reminder"],
		queryFn: () => fetchGreeting({ context: "friend-reminder" }),
		enabled: !!isLoggedIn,
	});

	return {
		friendList: {
			data: friendList.data ?? [],
			error: friendList.error,
		},

		friendRequests: {
			data: friendRequests.data ?? [],
			error: friendRequests.error,
		},

		friendFeed: {
			data: friendFeed.data ?? [],
		},

		greeting: {
			data: greeting.data,
			isLoading: greeting.isLoading,
		},
	};
}
