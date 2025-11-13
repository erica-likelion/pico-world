import {
	getPeakHours,
	type PeakHoursResponse,
} from "@/features/report/api/GetPeakHours";
import * as S from "@/features/report/style/PeakEmotionHours.styles";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const PeakEmotionHours: React.FC = () => {
	const [peakEmotion, setPeakEmotion] = useState<PeakHoursResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const peakEmotionMutation = useMutation({
		mutationFn: getPeakHours,
		onSuccess: (peakData) => {
			setPeakEmotion(peakData.data);
			setIsLoading(false);
		},
		onError: (error) => {
			console.error(error);
			setPeakEmotion(null);
			setIsLoading(false);
		},
	});

	useEffect(() => {
		peakEmotionMutation.mutate();
	}, [peakEmotionMutation.mutate]);

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
