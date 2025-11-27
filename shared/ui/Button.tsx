import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/shared/style/Button.styles";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";

interface ButtonProps {
	text: string;
	size?: "large" | "medium" | "small";
	color?: "white" | "gray" | "black";
	disabled?: boolean;
	onPress?: () => void;
}

/**
 * Button
 * @param props - Button props
 * @param props.text - 텍스트
 * @param props.size - 크기 ("large" | "medium" | "small")
 * @param props.color - 색상 ("white" | "gray" | "black")
 * @param props.disabled - 비활성화 상태
 * @param props.onPress - 클릭 시 실행할 함수
 * @returns JSX.Element
 * @example
 * <Button text="대형" size="large" color="white" onPress={() => {}} />
 * <Button text="중형" size="medium" color="gray" disabled />
 * <Button text="소형" size="small" color="gray" />
 */

export const Button = ({
	text,
	size = "large",
	color = "white",
	disabled = false,
	onPress,
}: ButtonProps) => {
	const [pressed, setPressed] = useState(false);
	const {
		animatedStyle,
		handlePressIn: animatePressIn,
		handlePressOut: animatePressOut,
	} = usePressAnimation({
		disabled,
	});

	const handlePressIn = () => {
		if (!disabled) {
			setPressed(true);
			animatePressIn();
		}
	};

	const handlePressOut = () => {
		setPressed(false);
		animatePressOut();
	};

	const handlePress = () => {
		if (!disabled && onPress) {
			onPress();
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			disabled={disabled}
			activeOpacity={1}
		>
			<Reanimated.View style={animatedStyle}>
				<S.Background
					$size={size}
					$color={color}
					$disabled={disabled}
					$pressed={pressed}
				>
					<S.Text $size={size} $color={color} $disabled={disabled}>
						{text}
					</S.Text>
				</S.Background>
			</Reanimated.View>
		</TouchableOpacity>
	);
};
