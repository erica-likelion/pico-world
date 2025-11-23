export interface Friend {
	friendId: number;
	nickname: string;
	profileImageUrl: string | null;
	connectCode: string;
	hasRecordedToday: boolean;
}

export type FriendCharacter = "츠츠" | "루루" | "동동" | "티티" | "파파";

export interface FriendMessage {
	id: string;
	character: FriendCharacter;
	message: string;
}

export interface FriendRequest {
	id: string;
	name: string;
	profileImageUrl?: string;
}
