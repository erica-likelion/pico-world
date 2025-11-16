import { axiosInstance } from "@/shared/api/axios";
import type { EmotionRecord } from "@/shared/types/emotion";

export const getEmotionRecord = async (
	date: string,
): Promise<EmotionRecord | null> => {
	try {
		const response = await axiosInstance.get<EmotionRecord[]>(
			`/api/v1/emotion?date=${date}`,
		);
		if (response.data && response.data.length > 0) {
			return response.data[0];
		}
		return null;
	} catch (error) {
		console.error(`Error fetching emotion record for date ${date}:`, error);
		return null;
	}
};
