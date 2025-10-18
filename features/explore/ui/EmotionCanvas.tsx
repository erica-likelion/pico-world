import { useEmotionAnalysis } from "@/features/explore/model/useEmotionAnalysis";
import * as S from "@/features/explore/style/EmotionCanvas.style";
import { EmotionResult } from "@/features/explore/ui/EmotionResult";
import { EmotionGradientCanvas } from "@/shared/ui/emotion";
import { BlurMask, Circle, Group, Line } from "@shopify/react-native-skia";
import React, { useCallback, useRef, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	View,
	type GestureResponderEvent,
} from "react-native";

interface TouchPoint {
	id: string;
	x: number;
	y: number;
	alpha: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BRUSH_SIZE = 60;
const ALPHA_PER_TOUCH = 0.5;

export const EmotionCanvas = () => {
	const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
	const [canvasSize, setCanvasSize] = useState({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	});
	const [selectedChip, setSelectedChip] = useState<number | null>(null);
	const isActiveRef = useRef(false);

	const analysis = useEmotionAnalysis(touchPoints, canvasSize);

	const handleTouchStart = useCallback((event: GestureResponderEvent) => {
		const { locationX: x, locationY: y } = event.nativeEvent;
		isActiveRef.current = true;
		setSelectedChip(null);
		setTouchPoints([
			{ id: Math.random().toString(), x, y, alpha: ALPHA_PER_TOUCH },
		]);
	}, []);

	const handleTouchMove = useCallback((event: GestureResponderEvent) => {
		if (!isActiveRef.current) return;
		const { locationX: x, locationY: y } = event.nativeEvent;
		setTouchPoints((prev) => [
			...prev,
			{ id: Math.random().toString(), x, y, alpha: ALPHA_PER_TOUCH },
		]);
	}, []);

	const handleTouchEnd = useCallback(() => {
		isActiveRef.current = false;
	}, []);

	return (
		<S.Container>
			<S.CanvasContainer
				onLayout={(event) => {
					const { width, height } = event.nativeEvent.layout;
					setCanvasSize({ width, height });
				}}
			>
				<View
					style={StyleSheet.absoluteFill}
					pointerEvents="box-only"
					onStartShouldSetResponder={() => true}
					onMoveShouldSetResponder={() => true}
					onStartShouldSetResponderCapture={() => true}
					onMoveShouldSetResponderCapture={() => true}
					onResponderGrant={handleTouchStart}
					onResponderMove={handleTouchMove}
					onResponderRelease={handleTouchEnd}
					onResponderTerminate={handleTouchEnd}
				>
					<EmotionGradientCanvas
						width={canvasSize.width}
						height={canvasSize.height}
						padding={20}
					>
						<Group blendMode="dstOut">
							{touchPoints.map((point, idx) => {
								if (idx === 0) return null;
								const prevPoint = touchPoints[idx - 1];

								return (
									<Line
										key={`line-${point.id}`}
										p1={{ x: prevPoint.x, y: prevPoint.y }}
										p2={{ x: point.x, y: point.y }}
										strokeWidth={BRUSH_SIZE}
										color={`rgba(255, 255, 255, ${point.alpha})`}
									>
										<BlurMask blur={16} style="normal" />
									</Line>
								);
							})}

							{touchPoints.map((point) => (
								<Circle
									key={`circle-${point.id}`}
									cx={point.x}
									cy={point.y}
									r={BRUSH_SIZE / 2}
									color={`rgba(255, 255, 255, ${point.alpha})`}
								>
									<BlurMask blur={16} style="normal" />
								</Circle>
							))}
						</Group>
					</EmotionGradientCanvas>
				</View>
			</S.CanvasContainer>

			{analysis && (
				<EmotionResult
					chips={analysis.chips}
					selectedChip={selectedChip}
					onChipSelect={setSelectedChip}
				/>
			)}
		</S.Container>
	);
};
