import { removeFriend } from "@/features/friends/api/removeFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseRemoveFriendOptions {
	onSuccess?: () => void;
	onError?: (message: string) => void;
}

export function useRemoveFriend({
	onSuccess,
	onError,
}: UseRemoveFriendOptions = {}) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: removeFriend,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			onSuccess?.();
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error ? error.message : "친구 끊기에 실패했습니다.";
			onError?.(errorMessage);
		},
	});

	const disconnectFriend = useCallback(
		(connectCode: string) => {
			if (!connectCode) {
				return;
			}
			mutate({ connectCode });
		},
		[mutate],
	);

	return { disconnectFriend };
}
