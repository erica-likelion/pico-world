import { appleLogin } from "@/features/login/api/appleLogin";
import { kakaoLogin } from "@/features/login/api/kakaoLogin";
import * as S from "@/features/login/style/LoginButton.styles";
import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import { useAuthStore } from "@/shared/store/auth";
import { useDeepLinkStore } from "@/shared/store/deepLink";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { useMutation } from "@tanstack/react-query";
import * as AppleAuthentication from "expo-apple-authentication";
import { CodedError } from "expo-modules-core";
import { type Href, useRouter } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";

export function LoginButton() {
	const ios = Platform.OS === "ios";
	const router = useRouter();
	const { pendingDestination, clearPendingDestination } = useDeepLinkStore();
	const { setIsLoggedIn, setIsOnboarding } = useAuthStore();

	const {
		animatedStyle: kakaoAnimatedStyle,
		handlePressIn: kakaoPressIn,
		handlePressOut: kakaoPressOut,
	} = usePressAnimation();
	const {
		animatedStyle: appleAnimatedStyle,
		handlePressIn: applePressIn,
		handlePressOut: applePressOut,
	} = usePressAnimation();

	const handleLoginSuccess = (isOnboardingNeeded: boolean) => {
		setIsLoggedIn(true);
		registerForPushNotificationsAsync(); // 로그인 성공 후 FCM 토큰 등록/전송
		console.log(isOnboardingNeeded);

		if (isOnboardingNeeded) {
			setIsOnboarding(true);
			router.replace("/onboarding");
		} else {
			setIsOnboarding(false);
			if (pendingDestination) {
				router.replace(pendingDestination as Href);
				clearPendingDestination();
			} else {
				router.replace("/home");
			}
		}
	};

	const { mutate: kakaoLoginMutate } = useMutation({
		mutationFn: kakaoLogin,
		onSuccess: handleLoginSuccess,
		onError: (error) => {
			console.error("Kakao login error", error);
		},
	});

	const { mutate: appleLoginMutate } = useMutation({
		mutationFn: appleLogin,
		onSuccess: handleLoginSuccess,
		onError: (error) => {
			console.error("Apple login error", error);
		},
	});

	const handleKakaoLogin = async () => {
		try {
			const token = await KakaoLogin.login();
			console.log(token);
			kakaoLoginMutate({
				kakaoAccessToken: token.accessToken,
				device: Platform.OS,
			});
		} catch (error) {
			console.error("Kakao login error", error);
		}
	};

	const handleAppleLogin = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credential.identityToken) {
				appleLoginMutate({
					identity_token: credential.identityToken,
					device: Platform.OS,
				});
			}
		} catch (e: unknown) {
			if (e instanceof CodedError && e.code === "ERR_REQUEST_CANCELED") {
				console.log("Apple login cancelled");
			} else {
				console.error("Apple login error", e);
			}
		}
	};

	return (
		<S.LoginButtonContainer>
			<TouchableOpacity
				onPress={handleKakaoLogin}
				onPressIn={kakaoPressIn}
				onPressOut={kakaoPressOut}
				activeOpacity={1}
			>
				<S.KaKaoLoginButton style={kakaoAnimatedStyle}>
					<S.KaKaoLogo />
					<S.LoginButtonText isKakao>카카오로 계속하기</S.LoginButtonText>
				</S.KaKaoLoginButton>
			</TouchableOpacity>
			{ios && (
				<TouchableOpacity
					onPress={handleAppleLogin}
					onPressIn={applePressIn}
					onPressOut={applePressOut}
					activeOpacity={1}
				>
					<S.AppleLoginButton style={appleAnimatedStyle}>
						<S.AppleLogo />
						<S.LoginButtonText>Apple로 계속하기</S.LoginButtonText>
					</S.AppleLoginButton>
				</TouchableOpacity>
			)}
		</S.LoginButtonContainer>
	);
}
