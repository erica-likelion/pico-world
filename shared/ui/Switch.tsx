import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import * as S from "@/shared/style/Switch.style";

interface SwitchProps {
	value?: boolean;
	defaultValue?: boolean;
	onValueChange?: (value: boolean) => void;
	disabled?: boolean;
}

/**
 * Switch - 토글 스위치
 * @param props - Switch props
 * @param props.value - 스위치 활성화 상태 (제어 컴포넌트)
 * @param props.defaultValue - 초기값 (비제어 컴포넌트)
 * @param props.onValueChange - 값 변경 시 실행할 함수
 * @param props.disabled - 비활성화 상태
 * @returns JSX.Element
 * @example
 * <Switch value={true} onValueChange={(value) => {}} />
 * <Switch defaultValue={true} />
 * <Switch value={false} disabled />
 */
export const Switch = ({
	value,
	defaultValue = false,
	onValueChange,
	disabled = false,
}: SwitchProps) => {
	const [internalValue, setInternalValue] = useState(value ?? defaultValue);
	const [animatedValue] = useState(
		new Animated.Value((value ?? defaultValue) ? 1 : 0),
	);

	useEffect(() => {
		if (value !== undefined) {
			setInternalValue(value);
			Animated.timing(animatedValue, {
				toValue: value ? 1 : 0,
				duration: 200,
				useNativeDriver: false,
			}).start();
		}
	}, [value, animatedValue]);

	const currentValue = value !== undefined ? value : internalValue;

	const handlePress = () => {
		if (disabled) return;

		const newValue = !currentValue;

		// 비제어 컴포넌트인 경우 내부 state 업데이트
		if (value === undefined) {
			setInternalValue(newValue);
			Animated.timing(animatedValue, {
				toValue: newValue ? 1 : 0,
				duration: 200,
				useNativeDriver: false,
			}).start();
		}

		// 콜백 호출
		onValueChange?.(newValue);
	};

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 20],
	});

	return (
		<TouchableOpacity
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.8}
		>
			<S.Track $active={currentValue} $disabled={disabled}>
				<Animated.View style={{ transform: [{ translateX }] }}>
					<S.Thumb $disabled={disabled} />
				</Animated.View>
			</S.Track>
		</TouchableOpacity>
	);
};
