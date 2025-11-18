import { axiosInstance } from "@/shared/api/axios";

export interface Friend {
	nickname: string;
	profileImageUrl: string | null;
	connectCode: string;
	name: string;
	hasRecordedToday: boolean;
}

export async function getFriends(): Promise<Friend[]> {
	const response = await axiosInstance.get<Friend[]>("/api/v1/friends");
	return response.data ?? [];
}
