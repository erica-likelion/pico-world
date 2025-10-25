import * as S from "@/shared/style/EmotionCard.styles";
import { useId } from "react";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

interface EmotionCardProps {
	mainColor: string;
	subColor: string;
	title: string;
}

export function EmotionCard({ mainColor, subColor, title }: EmotionCardProps) {
	const gradientId = useId();
	return (
		<S.EmotionCardContainer $subColor={subColor}>
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
