import { Pressable } from "react-native";
import * as S from "@/features/login/style/LoginButton.styles";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";

export function LoginButton() {
	const {
		scale: kakaoScale,
		handlePressIn: kakaoPressIn,
		handlePressOut: kakaoPressOut,
	} = usePressAnimation();
	const {
		scale: appleScale,
		handlePressIn: applePressIn,
		handlePressOut: applePressOut,
	} = usePressAnimation();

	return (
		<S.LoginButtonContainer>
			<Pressable onPressIn={kakaoPressIn} onPressOut={kakaoPressOut}>
				<S.KaKaoLoginButton style={{ transform: [{ scale: kakaoScale }] }}>
					<S.KaKaoLogo />
					<S.LoginButtonText isKakao>카카오로 계속하기</S.LoginButtonText>
				</S.KaKaoLoginButton>
			</Pressable>
			<Pressable onPressIn={applePressIn} onPressOut={applePressOut}>
				<S.AppleLoginButton style={{ transform: [{ scale: appleScale }] }}>
					<S.AppleLogo />
					<S.LoginButtonText>Apple로 계속하기</S.LoginButtonText>
				</S.AppleLoginButton>
			</Pressable>
		</S.LoginButtonContainer>
	);
}
