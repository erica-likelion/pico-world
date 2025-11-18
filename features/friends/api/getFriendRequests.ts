import { axiosInstance } from "@/shared/api/axios";

export interface FriendRequestItem {
	requestId: number;
	requesterNickname: string;
	requesterProfileImageUrl: string | null;
	requesterConnectCode: string;
	createdAt: string;
}

export async function getFriendRequests(): Promise<FriendRequestItem[]> {
	const response = await axiosInstance.get<FriendRequestItem[]>(
		"/api/v1/friends/request/received",
	);
	return response.data ?? [];
}
