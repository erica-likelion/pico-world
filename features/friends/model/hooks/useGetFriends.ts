import { getFriendFeed } from "@/features/friends/api/getFriendFeed";
import { getFriendRequests } from "@/features/friends/api/getFriendRequests";
import { getFriends } from "@/features/friends/api/getFriends";
import { getGreeting } from "@/features/friends/api/getGreeting";
import { useAuthStore } from "@/shared/store/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetFriends() {
	const { isLoggedIn } = useAuthStore();

	const friends = useQuery({
		queryKey: ["friends"],
		queryFn: getFriends,
		enabled: !!isLoggedIn,
	});

	const friendRequests = useQuery({
		queryKey: ["friendRequests"],
		queryFn: getFriendRequests,
		enabled: !!isLoggedIn,
	});

	const friendFeed = useQuery({
		queryKey: ["friendFeed"],
		queryFn: getFriendFeed,
		enabled: !!isLoggedIn,
	});

	const greeting = useQuery({
		queryKey: ["greeting", "friend-reminder"],
		queryFn: () => getGreeting("friend-reminder"),
		enabled: !!isLoggedIn,
	});

	return {
		friends: {
			data: friends.data ?? [],
			error: friends.error,
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
		},
	};
}
