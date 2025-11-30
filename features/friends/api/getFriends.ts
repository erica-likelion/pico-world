import type { Friend } from "@/features/friends/model/types";
import { axiosInstance } from "@/shared/api/axios";

export async function getFriends(): Promise<Friend[]> {
	const response = await axiosInstance.get<Friend[]>("/api/v1/friends");
	return response.data ?? [];
}
