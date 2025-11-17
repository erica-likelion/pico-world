import { axiosInstance } from "@/shared/api/axios";
import type { EmotionOneRecord } from "@/shared/types/emotion";

export const getEmotionRecord = async (
	id: string,
): Promise<EmotionOneRecord | null> => {
	try {
		const response = await axiosInstance.get<EmotionOneRecord>(
			`/api/v1/emotion/${id}`,
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(`Error fetching emotion record for date ${id}:`, error);
		return null;
	}
};

export const deleteEmotionRecord = async (id: number): Promise<boolean> => {
	try {
		await axiosInstance.delete(`/api/v1/emotion/${id}`);
		console.log(`Deleted emotion record with id ${id}`);
		return true;
	} catch (error) {
		console.error(`Error deleting emotion record with id ${id}:`, error);
		return false;
	}
};
