import { axiosInstance } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/api";

interface RespondToFriendRequestParams {
	requestId: number;
	accept: boolean;
}

export async function respondToFriendRequest(
	params: RespondToFriendRequestParams,
): Promise<ApiResponse<unknown>> {
	const response = await axiosInstance.put<unknown>(
		"/api/v1/friends/request/respond",
		params,
	);
	return response;
}
