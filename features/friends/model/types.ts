export type FriendCharacter = "츠츠" | "루루" | "동동" | "티티" | "파파";

export interface FriendMessage {
	id: string;
	character: FriendCharacter;
	message: string;
}
