import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

/**
 * 버튼이나 터치 가능한 요소의 누르기 애니메이션
 *
 * @param options
 * @param options.scale - 스케일
 * @param options.duration - 지속시간
 * @param options.disabled - 비활성화 여부
 * @returns 애니메이션 관련 함수들과 scale 값
 * @example
 * const { scale, handlePressIn, handlePressOut } = usePressAnimation();
 *
 */

export const usePressAnimation = (options?: {
	scale?: number;
	duration?: number;
	disabled?: boolean;
}) => {
	const { scale = 0.95, duration = 150, disabled = false } = options || {};
	const scaleValue = useSharedValue(1);

	const handlePressIn = () => {
		if (!disabled) {
			scaleValue.value = withTiming(scale, { duration });
		}
	};

	const handlePressOut = () => {
		scaleValue.value = withTiming(1, { duration });
	};

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scaleValue.value }],
	}));

	return {
		animatedStyle,
		handlePressIn,
		handlePressOut,
	};
};
