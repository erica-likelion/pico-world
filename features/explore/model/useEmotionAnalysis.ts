import { getEmotionColors } from "@/features/explore/lib/getEmotionColors";
import {
	EMOTION_WORD,
	X_LEVELS,
	Y_LEVELS,
	type XLabel,
	type YLabel,
} from "@/shared/utils/emotion";
import { useMemo } from "react";

const BIN_SIZE = 40;
const MIN_DENSITY_RATIO = 0.1;
const MAX_CHIP_COUNT = 15;

interface TouchPoint {
	x: number;
	y: number;
	alpha: number;
}

interface EmotionCell {
	sum: number;
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	cx: number;
	cy: number;
	xLabel: XLabel;
	yLabel: YLabel;
	word: string;
	mainColor: string;
	subColor: string;
}

export interface EmotionChip {
	label: string;
	mainColor: string;
	subColor: string;
}

export interface EmotionAnalysisResult {
	chips: EmotionChip[];
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

function findEmotionIndex(
	value: number,
	maxAbs: number,
	levels: readonly string[],
) {
	const normalized = (value + maxAbs) / (2 * maxAbs);
	let idx = Math.floor(normalized * levels.length);
	if (idx >= levels.length) idx = levels.length - 1;
	return idx;
}

function getEmotionWord(xLabel: XLabel, yLabel: YLabel) {
	return EMOTION_WORD[xLabel][yLabel];
}

/**
 * 40px로 분할해 각 셀의 터치 밀도 계산 후 상위 감정 추출
 */
export function useEmotionAnalysis(
	touchPoints: TouchPoint[],
	canvasSize: { width: number; height: number },
): EmotionAnalysisResult | null {
	return useMemo(() => {
		if (touchPoints.length === 0) return null;

		const cx = canvasSize.width / 2;
		const cy = canvasSize.height / 2;
		const maxX = cx;
		const maxY = cy;

		const bins = new Map<string, EmotionCell>();
		let globalMax = 0;

		for (const p of touchPoints) {
			const rx = clamp(p.x - cx, -maxX, maxX);
			const ry = clamp(p.y - cy, -maxY, maxY);

			const bx0 = Math.floor(rx / BIN_SIZE) * BIN_SIZE;
			const by0 = Math.floor(ry / BIN_SIZE) * BIN_SIZE;
			const key = `${bx0},${by0}`;

			let entry = bins.get(key);

			if (!entry) {
				const midX = bx0 + BIN_SIZE / 2;
				const midY = by0 + BIN_SIZE / 2;

				const xi = findEmotionIndex(midX, maxX, X_LEVELS);
				const yi = findEmotionIndex(-midY, maxY, Y_LEVELS);

				if (
					xi < 0 ||
					xi >= X_LEVELS.length ||
					yi < 0 ||
					yi >= Y_LEVELS.length
				) {
					continue;
				}

				const xLabel = X_LEVELS[xi] as XLabel;
				const yLabel = Y_LEVELS[yi] as YLabel;
				const emotionWord = getEmotionWord(xLabel, yLabel);
				const { main, sub } = getEmotionColors(xLabel, yLabel);

				entry = {
					sum: 0,
					xMin: bx0,
					xMax: bx0 + BIN_SIZE,
					yMin: by0,
					yMax: by0 + BIN_SIZE,
					cx: midX,
					cy: midY,
					xLabel,
					yLabel,
					word: emotionWord,
					mainColor: main,
					subColor: sub,
				};
				bins.set(key, entry);
			}

			entry.sum += p.alpha;
			if (entry.sum > globalMax) globalMax = entry.sum;
		}

		if (bins.size === 0) return null;

		const minEmotionDensity = globalMax * MIN_DENSITY_RATIO;
		const filteredEmotions = Array.from(bins.values()).filter(
			(e) => e.sum >= minEmotionDensity,
		);
		filteredEmotions.sort((a, b) => b.sum - a.sum);
		const chips = filteredEmotions.slice(0, MAX_CHIP_COUNT).map((e) => ({
			label: e.word,
			mainColor: e.mainColor,
			subColor: e.subColor,
		}));

		return { chips };
	}, [touchPoints, canvasSize]);
}
