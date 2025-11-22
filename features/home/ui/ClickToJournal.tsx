import * as S from "@/features/home/style/ClickToJournal.styles";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import { PlusButton } from "@/shared/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import Reanimated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

const AnimatedPlusingEffect = () => {
	const opacity = useSharedValue(1);
	const scale = useSharedValue(1);

	useEffect(() => {
		opacity.value = withRepeat(
			withTiming(0.8, {
				duration: 2000,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
		scale.value = withRepeat(
			withTiming(1.2, {
				duration: 2000,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
	}, [opacity, scale]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<S.PlusingEffectBox style={animatedStyle}>
			<S.PlusingEffect
				source={require("@/shared/assets/images/plusing-effect.png")}
			/>
		</S.PlusingEffectBox>
	);
};

interface ClickToJournalProps {
	date: string;
	isToday: boolean;
	onShowToast: (message: string) => void; // Add onShowToast prop
}

export function ClickToJournal({
	date,
	isToday,
	onShowToast,
}: ClickToJournalProps) {
	const router = useRouter();
	const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation();
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;

	useEffect(() => {
		if (!date) return;
		fadeInAnim.setValue(0);
		slideUpAnim.setValue(50);
		scaleAnim.setValue(0.9);

		//등장 애니메이션
		Animated.parallel([
			Animated.timing(fadeInAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(slideUpAnim, {
				toValue: 0,
				duration: 600,
				easing: Easing.out(Easing.back(3)),
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.back(12)),
				useNativeDriver: true,
			}),
		]).start();
	}, [date, fadeInAnim, scaleAnim, slideUpAnim]);

	const handlePress = useCallback(() => {
		// Wrap handlePress in useCallback
		if (!isToday) {
			onShowToast("감정 기록은 오늘 날짜만 가능합니다.");
			return;
		}
		router.push("/record");
	}, [isToday, onShowToast, router]);

	return (
		<Animated.View
			style={{
				opacity: fadeInAnim,
				transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
			}}
		>
			<S.CircleOut>
				<S.CircleIn>
					<AnimatedPlusingEffect />
					<S.CircleImageLeft
						source={require("@/shared/assets/images/circle-left.png")}
					/>
					<S.CircleImageCenter
						source={require("@/shared/assets/images/circle-black.png")}
					/>
					<S.CircleImageRight
						source={require("@/shared/assets/images/circle-right.png")}
					/>
					<S.CircleText>감정 기록하기</S.CircleText>
					<Pressable
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						onPress={handlePress}
						style={{
							zIndex: 40,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Reanimated.View
							style={{
								...animatedStyle,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<PlusButton />
							<S.PlusIcon />
						</Reanimated.View>
					</Pressable>
				</S.CircleIn>
			</S.CircleOut>
		</Animated.View>
	);
}
