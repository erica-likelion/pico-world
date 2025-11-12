import * as S from "@/shared/style/Toast.style";
import { useEffect, useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Animated } from "react-native";

interface ToastProps {
	message: string;
	visible: boolean;
	offset?: number;
	containerStyle?: StyleProp<ViewStyle>;
	duration?: number;
}

export function Toast({
	message,
	visible,
	offset = 0,
	containerStyle,
	duration = 2000,
}: ToastProps) {
	const opacity = useRef(new Animated.Value(0)).current;
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (visible) {
			Animated.timing(opacity, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				Animated.timing(opacity, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}).start();
			}, duration);
		} else {
			Animated.timing(opacity, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start();
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [duration, opacity, visible]);

	return (
		<S.Container
			pointerEvents="none"
			style={[{ bottom: offset, opacity }, containerStyle]}
		>
			<S.Content>
				<S.Message>{message}</S.Message>
			</S.Content>
		</S.Container>
	);
}
