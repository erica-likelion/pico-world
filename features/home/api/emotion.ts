import { axiosInstance } from "@/shared/api/axios";
import type { EmotionRecord } from "@/shared/types/emotion";

export const getEmotionRecords = async (): Promise<EmotionRecord[]> => {
	try {
		const response =
			await axiosInstance.get<EmotionRecord[]>(`/api/v1/emotion`);
		return response.data;
	} catch (error) {
		console.error("Error fetching emotion records:", error);
		return [];
	}
};
