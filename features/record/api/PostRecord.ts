import { axiosInstance } from "@/shared/api/axios";

interface PostRecordRequest {
	record: string;
	emotion_name: string;
	main_color: string;
	sub_color: string;
	text_color: string;
	is_shared: boolean;
	ai_feedback_count: number;
}

interface PostRecordResponse {
	record_id: number;
}

export const postRecord = async (
	params: PostRecordRequest,
): Promise<PostRecordResponse> => {
	const response = await axiosInstance.post<PostRecordResponse>(
		"/api/v1/emotion",
		params,
	);

	return response.data;
};
