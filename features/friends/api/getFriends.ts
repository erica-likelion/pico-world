import { axiosInstance } from "@/shared/api/axios";

export interface Friend {
	nickname: string;
	profileImageUrl: string | null;
	connectCode: string;
	name: string;
}

export async function getFriends(): Promise<Friend[]> {
	const response = await axiosInstance.get<Friend[]>("/api/v1/friends");
	return response.data ?? [];
}
