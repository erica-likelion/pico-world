import { axiosInstance } from "@/shared/api/axios";
import type { EmotionRecord } from "@/shared/types/emotion";

export const getEmotionRecords = async (
	month: string,
): Promise<EmotionRecord[]> => {
	try {
		const response = await axiosInstance.get<EmotionRecord[]>(
			`/api/v1/emotion?date=${month}`,
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching emotion records:", error);
		return [];
	}
};
