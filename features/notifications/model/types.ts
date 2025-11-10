export type NotificationType =
	| "AI_FEEDBACK"
	| "FRIEND_REQUEST"
	| "FRIEND_ACCEPTED"
	| "FRIEND_EMOTION_RECORD";

export interface Notification {
	notificationId: number;
	type: NotificationType;
	title: string;
	message: string;
	relatedId: number;
	isRead: boolean;
	readAt: string | null;
	createdAt: string;
}

export interface NotificationsResponse {
	notifications: Notification[];
	currentPage: number;
	totalPages: number;
	totalElements: number;
	hasNext: boolean;
}
