import {
	getTopEmotions,
	type TopEmotionItem,
} from "@/features/report/api/GetTopEmotion";
import * as S from "@/features/report/style/TopEmotion.styles";
import RightIcon from "@/shared/assets/icons/right.svg";
import { theme } from "@/shared/config/theme/theme";
import type { EmotionChip } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";

interface TopEmotionProps {
	onPress: (emotions: TopEmotionChip[]) => void;
}

interface TopEmotionChip extends EmotionChip {
	label: string;
	count: number;
}

export const TopEmotion: React.FC<TopEmotionProps> = ({ onPress }) => {
	const { data: topEmotionsData, isLoading } = useQuery({
		queryKey: ["report", "topEmotions"],
		queryFn: async () => {
			const response = await getTopEmotions();
			return response.data;
		},
	});

	const emotionChip = useMemo<TopEmotionChip[]>(() => {
		if (!topEmotionsData) return [];

		return topEmotionsData.emotions.map((emotion: TopEmotionItem) => ({
			label:
				emotion.emotion_name && emotion.emotion_name !== "없음"
					? emotion.emotion_name.replace(/_/g, " ")
					: "없음",
			count: emotion.count,
			mainColor: emotion.main_color,
			subColor: emotion.sub_color,
		}));
	}, [topEmotionsData]);

	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>제일 많았던 상태</S.Title>
				{emotionChip.length > 0 && (
					<TouchableOpacity
						onPress={() => {
							if (isLoading || emotionChip.length === 0) return;
							onPress(emotionChip);
						}}
					>
						<RightIcon width={18} height={18} color={theme.grayscale.gray200} />
					</TouchableOpacity>
				)}
			</S.TopWrapper>

			<S.EmotionWrapper>
				{isLoading ? (
					<S.Label>...</S.Label>
				) : emotionChip.length === 0 ? (
					<S.Description>기록을 남기면 확인할 수 있어요.</S.Description>
				) : (
					emotionChip.slice(0, 5).map((chip, index) => (
						<S.EmotionList key={`${chip.label}-${index}`}>
							<S.Label>{chip.label}</S.Label>
							<S.RightCol>
								<S.Count>{chip.count}</S.Count>
								<S.EmotionBox
									mainColor={chip.mainColor}
									subColor={chip.subColor}
								/>
							</S.RightCol>
						</S.EmotionList>
					))
				)}
			</S.EmotionWrapper>
		</S.Container>
	);
};
