import { axiosInstance } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/api";

interface SendFriendRequestParams {
	connectCode: string;
}

export const sendFriendRequest = async (
	params: SendFriendRequestParams,
): Promise<ApiResponse<unknown>> => {
	const response = await axiosInstance.post<unknown>(
		"/api/v1/friends/request",
		params,
	);
	return response;
};
