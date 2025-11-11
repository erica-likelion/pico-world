import {
	EMOTION_WORD,
	X_LEVELS,
	Y_LEVELS,
	type XLabel,
	type YLabel,
} from "@/shared/utils/emotion";

export interface EmotionCoordinate {
	x: number;
	y: number;
	emotion: string;
}

const EMOTION_TO_LEVELS = new Map<
	string,
	{ xLabel: XLabel; yLabel: YLabel; xIndex: number; yIndex: number }
>();

for (let xIndex = 0; xIndex < X_LEVELS.length; xIndex++) {
	const xLabel = X_LEVELS[xIndex];
	for (let yIndex = 0; yIndex < Y_LEVELS.length; yIndex++) {
		const yLabel = Y_LEVELS[yIndex];
		const emotion = EMOTION_WORD[xLabel][yLabel];
		EMOTION_TO_LEVELS.set(emotion, {
			xLabel,
			yLabel,
			xIndex,
			yIndex,
		});
	}
}

function getEmotionGridPosition(
	emotion: string,
): { xLabel: XLabel; yLabel: YLabel; xIndex: number; yIndex: number } | null {
	return EMOTION_TO_LEVELS.get(emotion) ?? null;
}

function convertGridIndexToPixel(
	xIndex: number,
	yIndex: number,
	canvasWidth: number,
	canvasHeight: number,
): { x: number; y: number } {
	const centerX = canvasWidth / 2;
	const centerY = canvasHeight / 2;
	const maxX = centerX;
	const maxY = centerY;
	const NUM_CELLS = X_LEVELS.length;

	const normalizedX = ((xIndex + 0.5) / NUM_CELLS) * 2 - 1;
	const x = centerX + normalizedX * maxX;

	const normalizedY = ((yIndex + 0.5) / NUM_CELLS) * 2 - 1;
	const y = centerY - normalizedY * maxY;

	return { x, y };
}

export function getEmotionCoordinate(
	emotion: string,
	canvasWidth: number,
	canvasHeight: number,
): EmotionCoordinate | null {
	const levels = getEmotionGridPosition(emotion);
	if (!levels) return null;

	const { x, y } = convertGridIndexToPixel(
		levels.xIndex,
		levels.yIndex,
		canvasWidth,
		canvasHeight,
	);

	return { x, y, emotion };
}
