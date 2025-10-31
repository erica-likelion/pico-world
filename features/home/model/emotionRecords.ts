import type { EmotionChip } from "@/shared/types/emotion";

export interface EmotionRecord {
	id: string;
	date: string; // YYYY-MM-DD format
	time: string;
	emotion: EmotionChip;
	text: string;
	isFriendOnly: boolean;
	createdAt: string;
}

// Mock data for demonstration
export const mockEmotionRecords: EmotionRecord[] = [
	{
		id: "1",
		date: "2025-10-03",
		time: "오후 2:30",
		emotion: {
			label: "기쁨",
			mainColor: "#FF6F61",
			subColor: "#FFE5E1",
		},
		text: "오늘은 정말 좋은 일이 있었어! 프로젝트가 성공적으로 완료됐고 팀원들과도 즐겁게 식사했다.",
		isFriendOnly: false,
		createdAt: "2025-10-03T14:30:00Z",
	},
	{
		id: "2",
		date: "2025-10-07",
		time: "오전 10:15",
		emotion: {
			label: "평온",
			mainColor: "#FFD700",
			subColor: "#FFF8E1",
		},
		text: "조용한 카페에서 책을 읽으며 평온한 시간을 보냈다. 마음이 차분해지는 느낌이다.",
		isFriendOnly: true,
		createdAt: "2025-10-07T10:15:00Z",
	},
	{
		id: "3",
		date: "2025-10-08",
		time: "오후 7:45",
		emotion: {
			label: "우울",
			mainColor: "#8A2BE2",
			subColor: "#E1D4F3",
		},
		text: "오늘은 왠지 모르게 기분이 가라앉는다. 날씨도 흐리고 뭔가 의욕이 없어진다.",
		isFriendOnly: false,
		createdAt: "2025-10-08T19:45:00Z",
	},
	{
		id: "4",
		date: "2025-10-15",
		time: "오후 4:20",
		emotion: {
			label: "설렘",
			mainColor: "#1E90FF",
			subColor: "#E3F2FD",
		},
		text: "내일 여행을 떠나는데 너무 설레서 잠이 안 온다. 오랜만의 휴식이라 정말 기대된다.",
		isFriendOnly: false,
		createdAt: "2025-10-15T16:20:00Z",
	},
	{
		id: "5",
		date: "2025-10-22",
		time: "오후 1:10",
		emotion: {
			label: "만족",
			mainColor: "#32CD32",
			subColor: "#E8F5E8",
		},
		text: "운동을 열심히 하고 건강한 식단을 유지하니까 몸도 마음도 건강해지는 것 같다.",
		isFriendOnly: true,
		createdAt: "2025-10-22T13:10:00Z",
	},
];

export const getEmotionRecordByDate = (date: string): EmotionRecord | null => {
	return mockEmotionRecords.find((record) => record.date === date) || null;
};

export const getEmotionColorByDate = (
	date: string,
): { bg?: string; text?: string } => {
	const record = getEmotionRecordByDate(date);
	if (!record) return {};

	return {
		bg: record.emotion.mainColor,
		text: "#FFFFFF",
	};
};
