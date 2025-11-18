import { axiosInstance } from "@/shared/api/axios";
import { ApiResponse } from "@/shared/types/api";

interface RemoveFriendParams {
	connectCode: string;
}

export async function removeFriend(
	params: RemoveFriendParams,
): Promise<ApiResponse<unknown>> {
	const response = await axiosInstance.delete<ApiResponse<unknown>>(
		"/api/v1/friends/remove",
		{
			data: params,
		},
	);
	return response.data;
}
