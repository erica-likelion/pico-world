import * as S from "@/app/login/style/Login.styles";
import { Circle, LoginButton } from "@/features/login/ui";
import { useBottomNavStore } from "@/widgets/BottomNav";
import { useEffect } from "react";

export default function Login() {
	const { show, hide } = useBottomNavStore();
	useEffect(() => {
		hide();
		return () => {
			show();
		};
	}, [hide, show]);
	return (
		<S.LoginContainer>
			<S.BackgroundGradient
				colors={[
					"rgba(255, 104, 91, 0.15)",
					"rgba(0, 0, 0, 0.85)",
					"rgba(82, 82, 82, 0.85)",
				]}
			/>
			<S.BackgroundBlur />
			<S.Title>{`안녕하세요,\n피코월드를 시작해볼까요?`}</S.Title>
			<S.EclipseImage
				source={require("@/shared/assets/images/eclipse-wrapper.png")}
				resizeMode="contain"
			/>
			<Circle />
			<LoginButton />
		</S.LoginContainer>
	);
}
