import * as S from "@/features/report/style/TopEmotionChart.styles";
import type { EmotionChip } from "@/shared/types";

interface TopEmotionChartProps {
	emotionChip: EmotionChip[];
}

export const TopEmotionChart: React.FC<TopEmotionChartProps> = ({
	emotionChip,
}) => {
	return (
		<S.Container>
			<S.EmotionWrapper>
				{emotionChip.map((chip, index) => (
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
				))}
			</S.EmotionWrapper>
		</S.Container>
	);
};
