import { getEmotionCoordinate } from "@/features/report/lib/emotionCoordinates";
import * as S from "@/features/report/style/MonthlyEmotionChart.styles";
import { EmotionGradientCanvas } from "@/shared/ui/emotion/EmotionGradientCanvas";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { BlurMask, Circle, Group } from "@shopify/react-native-skia";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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
	const { hide, show } = useBottomNavStore();
	const [canvasSize, setCanvasSize] = useState({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	});

	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);

	// 감정 좌표 계산
	const thisMonthCoord = getEmotionCoordinate(
		thisMonthEmotion,
		canvasSize.width,
		canvasSize.height,
	);
	const lastMonthCoord = getEmotionCoordinate(
		lastMonthEmotion,
		canvasSize.width,
		canvasSize.height,
	);

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
								r={100}
								color="rgba(255, 255, 255, 1)"
							>
								<BlurMask blur={16} style="normal" />
							</Circle>
						)}

						{lastMonthCoord && (
							<Circle
								cx={lastMonthCoord.x}
								cy={lastMonthCoord.y}
								r={100}
								color="rgba(255, 255, 255, 1)"
							>
								<BlurMask blur={16} style="normal" />
							</Circle>
						)}
					</Group>
				</EmotionGradientCanvas>
			</S.CanvasContainer>
		</S.Container>
	);
};
