import { sendFriendRequest } from "@/features/friends/api/sendFriendRequest";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseFriendRequestOptions {
	onSuccess?: () => void;
	onError?: (message: string) => void;
}

export function useFriendRequest({
	onSuccess,
	onError,
}: UseFriendRequestOptions = {}) {
	const { mutate } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error: unknown) => {
			let errorMessage = "친구 요청에 실패했습니다.";

			if (error && typeof error === "object" && "response" in error) {
				const axiosError = error as {
					response?: { data?: { message?: string } };
				};
				if (axiosError.response?.data?.message) {
					errorMessage = axiosError.response.data.message;
				}
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}

			onError?.(errorMessage);
		},
	});

	const friendRequest = useCallback(
		(connectCode: string, friendsCount: number, friendLimit: number) => {
			const trimmed = connectCode.trim();
			if (trimmed.length === 0) {
				return false;
			}

			if (friendsCount >= friendLimit) {
				onError?.("친구가 이미 꽉찼어요");
				return false;
			}

			mutate({ connectCode: trimmed });
			return true;
		},
		[mutate, onError],
	);

	return { friendRequest };
}
