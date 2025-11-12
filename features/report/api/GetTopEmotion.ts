import { axiosInstance } from "@/shared/api/axios";

export interface TopEmotionItem {
	emotion_name: string;
	count: number;
	main_color: string;
	sub_color: string;
}

export interface TopEmotionsResponse {
	emotions: TopEmotionItem[];
}

export async function getTopEmotions() {
	return axiosInstance.get<TopEmotionsResponse>(
		"/api/v1/emotion/report/top-emotions",
	);
}
