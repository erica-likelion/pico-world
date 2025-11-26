import { getPeakHours } from "@/features/report/api/GetPeakHours";
import * as S from "@/features/report/style/PeakEmotionHours.styles";
import { useQuery } from "@tanstack/react-query";

export const PeakEmotionHours: React.FC = () => {
	const { data: peakEmotion, isLoading } = useQuery({
		queryKey: ["report", "peakHours"],
		queryFn: async () => {
			const response = await getPeakHours();
			return response.data;
		},
	});

	const renderDescription = () => {
		if (isLoading) {
			return "...";
		}

		if (!peakEmotion || peakEmotion.dominant_time === "없음") {
			return "기록을 남기면 확인할 수 있어요.";
		}

		return `주로 ${peakEmotion.dominant_time}에 '${peakEmotion.dominant_emotion}' 상태가 많았어요.`;
	};

	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>특정 상태가 많았던 시간대</S.Title>
			</S.TopWrapper>
			<S.Description>{renderDescription()}</S.Description>
		</S.Container>
	);
};
