import { Circle, Line, Text, matchFont } from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

//스타일 상수
const AXIS_COLOR = "#313131";
const DASH_LENGTH = 2;
const DASH_GAP = 6;
const END_DOT_RADIUS = 3;
const OFFSET = 6;
const FONT_COLOR = "rgba(255, 255, 255, 0.45)";
const FONT_SIZE = 14;

interface EmotionAxisProps {
	padding?: number;
	width: number;
	height: number;
}

export const EmotionAxis: React.FC<EmotionAxisProps> = ({
	padding = 0,
	width = SCREEN_WIDTH,
	height = SCREEN_HEIGHT,
}) => {
	const font = useMemo(() => {
		return matchFont({
			fontFamily: "Pretendard",
			fontSize: FONT_SIZE,
			fontWeight: "600",
		});
	}, []);

	const centerX = width / 2;
	const centerY = height / 2;

	const createDots = (length: number, isVertical: boolean) => {
		const dotCount = Math.floor(length / DASH_GAP);
		const dots = [];

		for (let i = 0; i <= dotCount; i++) {
			const position = padding + i * DASH_GAP;
			const maxPosition = (isVertical ? height : width) - padding;

			if (position <= maxPosition) {
				dots.push(
					<Line
						key={`${isVertical ? "v" : "h"}-${i}`}
						p1={{
							x: isVertical ? centerX : position,
							y: isVertical ? position : centerY,
						}}
						p2={{
							x: isVertical ? centerX : position + DASH_LENGTH,
							y: isVertical ? position + DASH_LENGTH : centerY,
						}}
						color={AXIS_COLOR}
						strokeWidth={1}
					/>,
				);
			}
		}
		return dots;
	};

	const verticalDots = createDots(height - 2 * padding, true);
	const horizontalDots = createDots(width - 2 * padding, false);

	const endPoints = [
		{ cx: centerX, cy: padding },
		{ cx: centerX, cy: height - padding },
		{ cx: padding, cy: centerY },
		{ cx: width - padding, cy: centerY },
	];

	const labels = [
		{
			x: centerX + OFFSET,
			y: padding + FONT_SIZE - 5,
			text: "행복한",
		},
		{
			x: centerX + OFFSET,
			y: height - padding,
			text: "우울한",
		},
		{
			x: padding,
			y: centerY + OFFSET + FONT_SIZE,
			text: "불안한",
		},
		{
			x: width - padding - 36,
			y: centerY + OFFSET + FONT_SIZE,
			text: "편안한",
		},
	];

	return (
		<>
			{verticalDots}
			{horizontalDots}

			{endPoints.map((point) => (
				<Circle
					key={`endpoint-${point.cx}-${point.cy}`}
					cx={point.cx}
					cy={point.cy}
					r={END_DOT_RADIUS}
					color={AXIS_COLOR}
				/>
			))}

			{labels.map((label) => (
				<Text
					key={`label-${label.text}`}
					x={label.x}
					y={label.y}
					text={label.text}
					font={font}
					color={FONT_COLOR}
				/>
			))}
		</>
	);
};
