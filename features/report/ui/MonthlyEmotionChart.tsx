import * as S from "@/features/report/style/MonthlyEmotionChart.styles";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { EmotionGradientCanvas } from "@/shared/ui/emotion/EmotionGradientCanvas";
import { getEmotionCoordinate } from "@/shared/utils/emotionCoordinates";
import { useSkiaFont } from "@/shared/utils/skiaFont";
import { BlurMask, Circle, Group, Text } from "@shopify/react-native-skia";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface MonthlyEmotionChartProps {
	thisMonthEmotion: string;
	lastMonthEmotion: string;
}

export const MonthlyEmotionChart: React.FC<MonthlyEmotionChartProps> = ({
	thisMonthEmotion,
	lastMonthEmotion,
}) => {
	useHideBottomNav();
	const [canvasSize, setCanvasSize] = useState({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	});
	const font = useSkiaFont();

	const isSameEmotion = thisMonthEmotion === lastMonthEmotion;

	const thisMonthCoord = getEmotionCoordinate(
		thisMonthEmotion,
		canvasSize.width,
		canvasSize.height,
	);
	const lastMonthCoord = !isSameEmotion
		? getEmotionCoordinate(
				lastMonthEmotion,
				canvasSize.width,
				canvasSize.height,
			)
		: null;

	return (
		<S.Container>
			<S.CanvasContainer
				onLayout={(event) => {
					const { width, height } = event.nativeEvent.layout;
					setCanvasSize({ width, height });
				}}
			>
				<View style={StyleSheet.absoluteFill} />

				<EmotionGradientCanvas
					width={canvasSize.width}
					height={canvasSize.height}
					padding={20}
				>
					<Group blendMode="dstOut">
						{thisMonthCoord && (
							<Circle
								cx={thisMonthCoord.x}
								cy={thisMonthCoord.y}
								r={90}
								color="rgba(255, 255, 255, 1)"
							>
								<BlurMask blur={16} style="normal" />
							</Circle>
						)}

						{!isSameEmotion && lastMonthCoord && (
							<Circle
								cx={lastMonthCoord.x}
								cy={lastMonthCoord.y}
								r={90}
								color="rgba(255, 255, 255, 0.6)"
							>
								<BlurMask blur={16} style="normal" />
							</Circle>
						)}
					</Group>

					{thisMonthCoord && (
						<Text
							x={thisMonthCoord.x - 50}
							y={thisMonthCoord.y + 5}
							text="이번 달 평균 상태"
							font={font}
							color="rgba(255, 255, 255, 1)"
						/>
					)}

					{!isSameEmotion && lastMonthCoord && (
						<Text
							x={lastMonthCoord.x - 50}
							y={lastMonthCoord.y + 5}
							text="지난 달 평균 상태"
							font={font}
							color="rgba(255, 255, 255, 1)"
						/>
					)}
				</EmotionGradientCanvas>
			</S.CanvasContainer>
		</S.Container>
	);
};
