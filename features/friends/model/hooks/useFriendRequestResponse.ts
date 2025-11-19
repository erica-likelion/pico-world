import { respondToFriendRequest } from "@/features/friends/api/respondToFriendRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseFriendRequestResponseOptions {
	onSuccess?: () => void;
	onError?: (message: string) => void;
}

export function useFriendRequestResponse({
	onSuccess,
	onError,
}: UseFriendRequestResponseOptions = {}) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: respondToFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
			onSuccess?.();
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: "친구 요청 응답에 실패했습니다.";
			onError?.(errorMessage);
		},
	});

	const friendAccept = useCallback(
		(requestId: number) => {
			mutate({ requestId, accept: true });
		},
		[mutate],
	);

	const friendReject = useCallback(
		(requestId: number) => {
			mutate({ requestId, accept: false });
		},
		[mutate],
	);

	return { friendAccept, friendReject };
}
