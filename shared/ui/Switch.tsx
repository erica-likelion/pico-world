import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import * as S from "@/shared/style/Switch.style";

interface SwitchProps {
	value?: boolean;
	onValueChange?: (value: boolean) => void;
	disabled?: boolean;
}

/**
 * Switch - 토글 스위치
 * @param props - Switch props
 * @param props.value - 스위치 활성화 상태
 * @param props.onValueChange - 값 변경 시 실행할 함수
 * @param props.disabled - 비활성화 상태
 * @returns JSX.Element
 * @example
 * const [checked, setChecked] = useState(false);
 * <Switch value={checked} onValueChange={setChecked} />
 *
 * <Switch value={false} disabled />
 */
export const Switch = ({
	value = false,
	onValueChange,
	disabled = false,
}: SwitchProps) => {
	const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [value, animatedValue]);

	const handlePress = () => {
		if (disabled) return;
		onValueChange?.(!value);
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
			<S.Track $active={value} $disabled={disabled}>
				<Animated.View style={{ transform: [{ translateX }] }}>
					<S.Thumb $disabled={disabled} />
				</Animated.View>
			</S.Track>
		</TouchableOpacity>
	);
};
