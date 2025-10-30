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

/**
 * 감정 이름으로부터 X, Y 레벨을 찾는 함수
 */
function findEmotionLevels(
	emotion: string,
): { xLabel: XLabel; yLabel: YLabel } | null {
	for (const xLabel of X_LEVELS) {
		for (const yLabel of Y_LEVELS) {
			if (EMOTION_WORD[xLabel][yLabel] === emotion) {
				return { xLabel, yLabel };
			}
		}
	}
	return null;
}

/**
 * X, Y 인덱스를 캔버스 좌표로 변환
 */
function levelToCoordinate(
	xIndex: number,
	yIndex: number,
	canvasWidth: number,
	canvasHeight: number,
): { x: number; y: number } {
	const centerX = canvasWidth / 2;
	const centerY = canvasHeight / 2;
	const maxX = centerX;
	const maxY = centerY;

	const normalizedX = (xIndex / (X_LEVELS.length - 1)) * 2 - 1; // -1 ~ 1
	const x = centerX + normalizedX * maxX;

	const normalizedY = (yIndex / (Y_LEVELS.length - 1)) * 2 - 1; // -1 ~ 1
	const y = centerY - normalizedY * maxY; // Y축 반전

	return { x, y };
}

/**
 * 감정 이름을 캔버스 좌표로 변환
 */
export function getEmotionCoordinate(
	emotion: string,
	canvasWidth: number,
	canvasHeight: number,
): EmotionCoordinate | null {
	const levels = findEmotionLevels(emotion);
	if (!levels) return null;

	const xIndex = X_LEVELS.indexOf(levels.xLabel);
	const yIndex = Y_LEVELS.indexOf(levels.yLabel);

	const { x, y } = levelToCoordinate(xIndex, yIndex, canvasWidth, canvasHeight);

	return { x, y, emotion };
}
