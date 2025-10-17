import { EmotionAxis } from "@/shared/ui/emotion/EmotionAxis";
import { BASE_COLORS } from "@/shared/utils/emotion";
import {
	Canvas,
	Group,
	Rect,
	SweepGradient,
	vec,
} from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet } from "react-native";

interface EmotionGradientCanvasProps {
	width: number;
	height: number;
	padding?: number;
	children: React.ReactNode;
}

export const EmotionGradientCanvas: React.FC<EmotionGradientCanvasProps> = ({
	width,
	height,
	padding = 20,
	children,
}) => {
	const centerX = width / 2;
	const centerY = height / 2;

	return (
		<Canvas style={StyleSheet.absoluteFill}>
			<Rect x={0} y={0} width={width} height={height}>
				<SweepGradient
					c={vec(centerX, centerY)}
					colors={[
						BASE_COLORS.comfort,
						BASE_COLORS.depressed,
						BASE_COLORS.discomfort,
						BASE_COLORS.happy,
						BASE_COLORS.comfort,
					]}
				/>
			</Rect>

			<Group layer>
				<Rect x={0} y={0} width={width} height={height} color="black" />
				{children}
			</Group>

			<EmotionAxis padding={padding} width={width} height={height} />
		</Canvas>
	);
};
