import * as S from "@/features/login/style/Circle.styles";

export function Circle() {
	return (
		<S.CircleWrap>
			<S.CircleImageLeft
				source={require("@/shared/assets/images/circle-left.png")}
				resizeMode="contain"
			/>
			<S.CircleImageCenter
				source={require("@/shared/assets/images/circle-center.png")}
				resizeMode="contain"
			/>
			<S.CircleImageRight
				source={require("@/shared/assets/images/circle-right.png")}
				resizeMode="contain"
			/>
		</S.CircleWrap>
	);
}
