import * as S from "@/shared/style/Toast.styles";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ToastProps {
	message: string;
	visible: boolean;
	duration?: number;
	onHide: () => void;
}

export function Toast({
	message,
	visible,
	duration = 2000,
	onHide,
}: ToastProps) {
	const opacity = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(20)).current;

	useEffect(() => {
		let hideTimer: ReturnType<typeof setTimeout> | null = null;

		if (visible) {
			Animated.parallel([
				Animated.timing(opacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();

			hideTimer = setTimeout(() => {
				Animated.parallel([
					Animated.timing(opacity, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true,
					}),
					Animated.timing(translateY, {
						toValue: 20,
						duration: 200,
						useNativeDriver: true,
					}),
				]).start(onHide);
			}, duration);
		} else {
			opacity.setValue(0);
			translateY.setValue(20);
		}

		return () => {
			if (hideTimer) {
				clearTimeout(hideTimer);
			}
		};
	}, [duration, onHide, opacity, translateY, visible]);

	if (!visible) {
		return null;
	}

	return (
		<S.Container pointerEvents="none">
			<S.ToastWrapper
				style={{
					opacity,
					transform: [{ translateY }],
				}}
			>
				<S.ToastText>{message}</S.ToastText>
			</S.ToastWrapper>
		</S.Container>
	);
}
