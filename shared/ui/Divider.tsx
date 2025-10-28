import * as S from "@/shared/style/Divider.styles";

interface DividerProps {
	size?: "small" | "large";
}
export function Divider({ size = "large" }: DividerProps) {
	return <S.DividerContainer size={size} />;
}
