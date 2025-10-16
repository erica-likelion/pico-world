import * as S from "@/features/login/style/LoginBackground.styles";

export function LoginBackground() {
	return (
		<>
			<S.BackgroundGradient
				colors={[
					"rgba(255, 104, 91, 0.15)",
					"rgba(0, 0, 0, 0.85)",
					"rgba(82, 82, 82, 0.85)",
				]}
			/>
			<S.BackgroundBlur />
			<S.Title>{`안녕하세요,
피코월드를 시작해볼까요?`}</S.Title>
			<S.EclipseImage
				source={require("@/shared/assets/images/eclipse-wrapper.png")}
				resizeMode="contain"
			/>
		</>
	);
}
