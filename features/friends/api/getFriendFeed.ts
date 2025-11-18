import { axiosInstance } from "@/shared/api/axios";

export interface FriendFeedItem {
	recordId: number;
	record: string;
	emotionName: string;
	mainColor: string;
	subColor: string;
	textColor: string;
	createdAt: string;
	authorNickname: string;
	isRead: boolean;
	readCount: number;
	requesterProfileImageUrl?: string | null;
}

export async function getFriendFeed(): Promise<FriendFeedItem[]> {
	const response = await axiosInstance.get<FriendFeedItem[]>(
		"/api/v1/friend-feed",
	);
	return response.data ?? [];
}
