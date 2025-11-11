import { axiosInstance } from "@/shared/api/axios";

interface UpdateNicknameRequest {
	nickname: string;
}

interface UpdateNicknameResponse {
	success: boolean;
	data: null;
	message: string;
}

export const updateNickname = async (
	params: UpdateNicknameRequest,
): Promise<UpdateNicknameResponse> => {
	const response = await axiosInstance.patch<UpdateNicknameResponse>(
		"/api/v1/users/me",
		params,
	);

	return response.data;
};
