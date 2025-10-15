import * as S from "@/features/login/style/LoginButton.styles";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import { useRouter } from "expo-router";

import { TouchableOpacity } from "react-native";

export function LoginButton() {
	const router = useRouter();
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

	const handleKakaoLogin = () => {
		router.push("/onboarding");
	};
	const handleAppleLogin = () => {
		router.push("/onboarding");
	};

	return (
		<S.LoginButtonContainer>
			<TouchableOpacity
				onPress={handleKakaoLogin}
				onPressIn={kakaoPressIn}
				onPressOut={kakaoPressOut}
				activeOpacity={1}
			>
				<S.KaKaoLoginButton style={{ transform: [{ scale: kakaoScale }] }}>
					<S.KaKaoLogo />
					<S.LoginButtonText isKakao>카카오로 계속하기</S.LoginButtonText>
				</S.KaKaoLoginButton>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={handleAppleLogin}
				onPressIn={applePressIn}
				onPressOut={applePressOut}
				activeOpacity={1}
			>
				<S.AppleLoginButton style={{ transform: [{ scale: appleScale }] }}>
					<S.AppleLogo />
					<S.LoginButtonText>Apple로 계속하기</S.LoginButtonText>
				</S.AppleLoginButton>
			</TouchableOpacity>
		</S.LoginButtonContainer>
	);
}
