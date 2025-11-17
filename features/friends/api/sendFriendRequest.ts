import { axiosInstance } from "@/shared/api/axios";

interface SendFriendRequestParams {
	connectCode: string;
}

interface SendFriendRequestResponse {
	code: number;
	message: string;
	data: unknown;
}

export const sendFriendRequest = async (
	params: SendFriendRequestParams,
): Promise<SendFriendRequestResponse> => {
	const response = await axiosInstance.post<SendFriendRequestResponse>(
		"/api/v1/friends/request",
		params,
	);

	return response.data;
};
