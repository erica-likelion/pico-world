import * as S from "@/features/home/style/ClickToJournal.styles";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import { PlusButton } from "@/shared/ui";
import React, { useEffect } from "react";
import { Animated, Pressable } from "react-native";
import {
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

export function ClickToJournal() {
	const { scale, handlePressIn, handlePressOut } = usePressAnimation();

	const animatedStyle = {
		transform: [{ scale }],
	};

	return (
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
				<S.CircleText>오늘의 감정 기록하기</S.CircleText>
				<Pressable
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					style={{ zIndex: 40, alignItems: "center", justifyContent: "center" }}
				>
					<Animated.View
						style={{
							...animatedStyle,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<PlusButton />
						<S.PlusIcon />
					</Animated.View>
				</Pressable>
			</S.CircleIn>
		</S.CircleOut>
	);
}
