import * as S from "@/features/report/style/TopEmotion.styles";
import RightIcon from "@/shared/assets/icons/right.svg";
import { theme } from "@/shared/config/theme/theme";
import type { EmotionChip } from "@/shared/types";
import { TouchableOpacity } from "react-native";

interface TopEmotionProps {
	emotionChip: EmotionChip[];
	onPress: () => void;
}

export const TopEmotion: React.FC<TopEmotionProps> = ({
	emotionChip,
	onPress,
}) => {
	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>제일 많았던 상태</S.Title>
				<TouchableOpacity onPress={onPress}>
					<RightIcon width={18} height={18} color={theme.grayscale.gray200} />
				</TouchableOpacity>
			</S.TopWrapper>

			<S.EmotionWrapper>
				{emotionChip.slice(0, 5).map((chip, index) => (
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
