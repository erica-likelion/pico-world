import * as S from "@/shared/style/PlusButton.styles";
import type { StyleProp, ViewStyle } from "react-native";

interface PlusButtonProps {
	style?: StyleProp<ViewStyle>;
}

export function PlusButton({ style }: PlusButtonProps) {
	return (
		<S.OuterWrapper style={style}>
			<S.OuterGradient colors={["#000", "#000"]} />
			<S.OuterBlur intensity={15}>
				<S.InnerWrapper intensity={2}>
					<S.InnerGradient colors={["#000", "#000"]} />
					<S.InnerContentWrapper />
				</S.InnerWrapper>
			</S.OuterBlur>
		</S.OuterWrapper>
	);
}
