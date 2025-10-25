import * as S from "@/shared/style/EmotionCard.styles";
import { useId } from "react";
import { TouchableOpacity } from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

interface EmotionCardProps {
	mainColor: string;
	subColor: string;
	title: string;
	isEditor?: boolean;
	onPress?: () => void;
}

export function EmotionCard({
	mainColor,
	subColor,
	title,
	isEditor = false,
	onPress,
}: EmotionCardProps) {
	const gradientId = useId();
	return (
		<S.EmotionCardContainer $subColor={subColor}>
			{isEditor && (
				<S.EditBox>
					<S.EditDateBox>
						<S.EditDate>2025. 10. 6</S.EditDate>
						<S.EditTime>오후 3:45</S.EditTime>
					</S.EditDateBox>
					<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
						<S.MenuIcon />
					</TouchableOpacity>
				</S.EditBox>
			)}
			<Svg width="313" height="190" style={{ position: "absolute" }}>
				<Defs>
					<RadialGradient
						id={gradientId}
						cx="50%"
						cy="50%"
						rx="31.85%"
						ry="50%"
					>
						<Stop offset="0%" stopColor={mainColor} />
						<Stop offset="100%" stopColor={subColor} />
					</RadialGradient>
				</Defs>
				<Rect width="313" height="190" fill={`url(#${gradientId})`} rx="999" />
			</Svg>
			<S.EmotionCardTextBox>
				<S.EmotionCardText>{title}</S.EmotionCardText>
			</S.EmotionCardTextBox>
		</S.EmotionCardContainer>
	);
}
