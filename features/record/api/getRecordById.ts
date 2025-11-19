import { axiosInstance } from "@/shared/api/axios";
import type { EmotionRecord } from "@/shared/types/emotion";

export const getRecordById = async (
	recordId: string,
): Promise<EmotionRecord> => {
	const response = await axiosInstance.get<EmotionRecord>(
		`/api/v1/emotion/${recordId}`,
	);
	return response.data;
};
