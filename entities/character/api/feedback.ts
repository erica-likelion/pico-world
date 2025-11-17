import { axiosInstance } from "@/shared/api/axios";

interface FeedBackResponse {
	feedbackId: number;
	recordId: number;
	aiReply: string;
	attempts: number;
	createdAt: string;
	updatedAt: string;
}

export const getFeedback = async (
	recordId: string | number,
): Promise<FeedBackResponse> => {
	const response = await axiosInstance.get<FeedBackResponse>(
		`/api/v1/feedback?recordId=${recordId}`,
	);
	return response.data;
};

export const postFeedback = async (
	recordId: string | number,
): Promise<FeedBackResponse> => {
	const response = await axiosInstance.post<FeedBackResponse>(
		`/api/v1/feedback`,
		{ recordId },
	);
	return response.data;
};
