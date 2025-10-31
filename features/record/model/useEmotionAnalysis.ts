import { getEmotionColors } from "@/features/record/lib/getEmotionColors";
import type { EmotionChip } from "@/shared/types";
import {
	BASE_COLORS,
	EMOTION_WORD,
	X_LEVELS,
	Y_LEVELS,
	type XLabel,
	type YLabel,
} from "@/shared/utils/emotion";
import { useMemo } from "react";

const MIN_DENSITY_RATIO = 0.1;
const MAX_CHIP_COUNT = 15;
const NUM_CELLS = 7;

interface TouchPoint {
	x: number;
	y: number;
	alpha: number;
}

interface EmotionCell {
	sum: number;
	xLabel: XLabel;
	yLabel: YLabel;
	word: string;
	mainColor: string;
	subColor: string;
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

function getEmotionWord(xLabel: XLabel, yLabel: YLabel) {
	return EMOTION_WORD[xLabel][yLabel];
}

/**
 * 7x7 칸 구조에 맞춰 각 터치 포인트를 해당 칸에 매핑하여 감정 분석
 */
export function useEmotionAnalysis(
	touchPoints: TouchPoint[],
	canvasSize: { width: number; height: number },
): { chips: EmotionChip[] } | null {
	return useMemo(() => {
		if (touchPoints.length === 0) return null;

		const cx = canvasSize.width / 2;
		const cy = canvasSize.height / 2;
		const maxX = cx;
		const maxY = cy;

		const cells = new Map<string, EmotionCell>();
		let globalMax = 0;

		for (const p of touchPoints) {
			const rx = clamp(p.x - cx, -maxX, maxX);
			const ry = clamp(p.y - cy, -maxY, maxY);

			const normalizedX = (rx + maxX) / (2 * maxX);
			const normalizedY = (-ry + maxY) / (2 * maxY);

			const xi = clamp(
				Math.floor(normalizedX * NUM_CELLS),
				0,
				X_LEVELS.length - 1,
			);
			const yi = clamp(
				Math.floor(normalizedY * NUM_CELLS),
				0,
				Y_LEVELS.length - 1,
			);

			const key = `${xi},${yi}`;
			let cell = cells.get(key);

			if (!cell) {
				const xLabel = X_LEVELS[xi] as XLabel;
				const yLabel = Y_LEVELS[yi] as YLabel;
				const { main, sub } = getEmotionColors(xLabel, yLabel);

				cell = {
					sum: 0,
					xLabel,
					yLabel,
					word: getEmotionWord(xLabel, yLabel),
					mainColor: main,
					subColor: sub,
				};
				cells.set(key, cell);
			}

			cell.sum += p.alpha;
			if (cell.sum > globalMax) globalMax = cell.sum;
		}

		if (cells.size === 0) return null;

		const minEmotionDensity = globalMax * MIN_DENSITY_RATIO;
		const filteredEmotions = Array.from(cells.values()).filter(
			(e) => e.sum >= minEmotionDensity,
		);

		filteredEmotions.sort((a, b) => b.sum - a.sum);
		const chips = filteredEmotions.slice(0, MAX_CHIP_COUNT).map((e) => ({
			label: e.word,
			mainColor: e.mainColor,
			subColor: e.subColor,
			textColor: e.mainColor === BASE_COLORS.comfort ? "#000000" : "#FFFFFF",
		}));
		return { chips };
	}, [touchPoints, canvasSize]);
}
