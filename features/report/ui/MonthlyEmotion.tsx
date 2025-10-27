import * as S from "@/features/report/style/MonthlyEmotion.styles";
import RightIcon from "@/shared/assets/icons/right.svg";
import { theme } from "@/shared/config/theme/theme";
import { TouchableOpacity } from "react-native";

interface MonthlyEmotionProps {
	mainColor: string;
	subColor: string;
	description: string;
	onPress: () => void;
}

export const MonthlyEmotion: React.FC<MonthlyEmotionProps> = ({
	mainColor,
	subColor,
	description,
	onPress,
}) => {
	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>저번 달과 상태 비교</S.Title>
				<TouchableOpacity onPress={onPress}>
					<RightIcon width={18} height={18} color={theme.grayscale.gray200} />
				</TouchableOpacity>
			</S.TopWrapper>
			<S.EmotionBox mainColor={mainColor} subColor={subColor} />
			<S.Description>{description}</S.Description>
		</S.Container>
	);
};
