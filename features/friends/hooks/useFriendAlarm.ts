import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	friendAlarmBlock,
	friendAlarmUnBlock,
} from "@/features/friends/api/FriendAlarm";
import type { Friend } from "@/features/friends/model/types";
import { useFriendAlarmStore } from "@/features/friends/store/friendAlarm";

export const useFriendAlarm = (friend: Friend) => {
	const queryClient = useQueryClient();
	const { setBlocked } = useFriendAlarmStore();

	const { mutate: block } = useMutation({
		mutationFn: () => friendAlarmBlock(friend.connectCode),
		onMutate: async () => {
			const previousState = useFriendAlarmStore.getState().blockedFriends;
			setBlocked(friend.connectCode, true);
			return { previousState };
		},
		onError: (err, newTodo, context) => {
			if (context) {
				useFriendAlarmStore.setState({ blockedFriends: context.previousState });
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		},
	});

	const { mutate: unblock } = useMutation({
		mutationFn: () => friendAlarmUnBlock(friend.connectCode),
		onMutate: async () => {
			const previousState = useFriendAlarmStore.getState().blockedFriends;
			setBlocked(friend.connectCode, false);
			return { previousState };
		},
		onError: (err, newTodo, context) => {
			if (context) {
				useFriendAlarmStore.setState({ blockedFriends: context.previousState });
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		},
	});

	return { block, unblock };
};
