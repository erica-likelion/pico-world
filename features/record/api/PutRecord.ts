import { axiosInstance } from "@/shared/api/axios";

export interface PutRecordRequest {
	record: string;
	emoji_emotion?: string;
	emotion_name: string;
	main_color: string;
	sub_color: string;
	text_color: string;
	is_shared: boolean;
	ai_feedback_count: number;
}

export interface PutRecordData {
	record_id: number;
	user_id: number;
	record: string;
	emoji_emotion?: string;
	emotion_name: string;
	main_color: string;
	sub_color: string;
	text_color: string;
	is_shared: boolean;
	ai_feedback_count: number;
	created_at: string;
	updated_at: string;
}

export const putRecord = async (
	recordId: string | number,
	params: PutRecordRequest,
): Promise<PutRecordData> => {
	// Debug logging for development: request URL and payload
	try {
		// eslint-disable-next-line no-console
		console.log(
			"putRecord -> url:/api/v1/emotion/" + recordId,
			"payload:",
			params,
		);
	} catch (_e) {}

	const response = await axiosInstance.put<PutRecordData>(
		`/api/v1/emotion/${recordId}`,
		params,
	);

	// Debug logging for development: server response
	try {
		// eslint-disable-next-line no-console
		console.log("putRecord response:", response);
	} catch (_e) {}

	return response.data;
};
