import {
	BASE_COLORS,
	X_LEVELS,
	Y_LEVELS,
	type XLabel,
	type YLabel,
} from "@/shared/utils/emotion";

export function getXAxisColor(xLabel: XLabel): string {
	if (!xLabel) return BASE_COLORS.discomfort;
	if (xLabel.includes("불안")) {
		return BASE_COLORS.discomfort;
	}
	return BASE_COLORS.comfort;
}

export function getYAxisColor(yLabel: YLabel): string {
	if (!yLabel) return BASE_COLORS.depressed;

	if (yLabel.includes("우울")) {
		return BASE_COLORS.depressed;
	}
	return BASE_COLORS.happy;
}

export function getEmotionColors(
	xLabel: XLabel,
	yLabel: YLabel,
): {
	main: string;
	sub: string;
} {
	const xColor = getXAxisColor(xLabel);
	const yColor = getYAxisColor(yLabel);
	const xIndex = X_LEVELS.indexOf(xLabel);
	const yIndex = Y_LEVELS.indexOf(yLabel);

	if (xIndex === -1 || yIndex === -1) {
		return {
			main: yColor,
			sub: xColor,
		};
	}

	const xCenter = (X_LEVELS.length - 1) / 2;
	const yCenter = (Y_LEVELS.length - 1) / 2;
	const xDistance = Math.abs(xIndex - xCenter);
	const yDistance = Math.abs(yIndex - yCenter);

	if (xDistance > yDistance) {
		return {
			main: xColor,
			sub: yColor,
		};
	} else {
		return {
			main: yColor,
			sub: xColor,
		};
	}
}
