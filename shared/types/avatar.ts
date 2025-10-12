export type AvatarSize = "large" | "medium" | "small" | "xsSmall" | "xxsSmall";

export const SIZE_MAP: Record<AvatarSize, { bg: number; icon: number }> = {
	large: { bg: 64, icon: 48 },
	medium: { bg: 48, icon: 36 },
	small: { bg: 36, icon: 24 },
	xsSmall: { bg: 24, icon: 18 },
	xxsSmall: { bg: 18, icon: 16 },
};
