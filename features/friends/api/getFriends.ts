import { axiosInstance } from "@/shared/api/axios";
import { Friend } from "@/features/friends/model/types";

export async function getFriends(): Promise<Friend[]> {
	const response = await axiosInstance.get<Friend[]>("/api/v1/friends");
	return response.data ?? [];
}
