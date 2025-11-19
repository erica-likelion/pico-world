import { getFriendFeed } from "@/features/friends/api/getFriendFeed";
import { getFriendRequests } from "@/features/friends/api/getFriendRequests";
import { getFriends } from "@/features/friends/api/getFriends";
import { getGreeting } from "@/features/friends/api/getGreeting";
import { useQuery } from "@tanstack/react-query";

export function useGetFriends() {
	const friends = useQuery({
		queryKey: ["friends"],
		queryFn: getFriends,
	});

	const friendRequests = useQuery({
		queryKey: ["friendRequests"],
		queryFn: getFriendRequests,
	});

	const friendFeed = useQuery({
		queryKey: ["friendFeed"],
		queryFn: getFriendFeed,
	});

	const greeting = useQuery({
		queryKey: ["greeting", "friend-reminder"],
		queryFn: () => getGreeting("friend-reminder"),
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
