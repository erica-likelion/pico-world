import { axiosInstance } from "@/shared/api/axios";

export interface CharacterInfo {
	id: number;
	name: string;
	tag: string;
	description: string;
	imageUrl: string;
}

export interface UserInfo {
	userId: number;
	nickname: string;
	email: string;
	connectCode: string;
	profileImageUrl: string;
	characterInfo: CharacterInfo;
}

interface ApiResponse<T> {
	success: boolean;
	data: T;
	message: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
	const response = await axiosInstance.get<UserInfo>("/api/v1/users/me");
	return response.data;
};
