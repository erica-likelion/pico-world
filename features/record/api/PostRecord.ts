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
	code: number;
	data: null;
	message: string;
}

export const postRecord = async (
	params: PostRecordRequest,
): Promise<PostRecordResponse> => {
	const response = await axiosInstance.post<PostRecordResponse>(
		"/api/v1/emotion",
		params,
	);

	console.log("postRecord response:");

	return response.data;
};
