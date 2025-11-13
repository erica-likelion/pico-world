import type { EmotionRecord } from "@/features/home/model/emotionRecords";
import { mockEmotionRecords } from "@/features/home/model/emotionRecords";

/**
 * 모든 감정 기록을 가져옵니다 (최신순 정렬)
 */
export const getAllEmotionRecords = (): EmotionRecord[] => {
	return [...mockEmotionRecords].sort((a, b) => {
		// createdAt 기준 최신순 정렬
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
};
