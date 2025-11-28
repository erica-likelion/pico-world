import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/shared/style/IconButton.styles";
import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useState,
} from "react";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";
import type { SvgProps } from "react-native-svg";

interface IconButtonProps {
	size?: "large" | "medium";
	icon: ReactNode;
	iconColor?: string;
	color?: "default" | "happy";
	disabled?: boolean;
	onPress?: () => void;
}

/**
 * IconButton
 * @param props - IconButton props
 * @param props.size - 버튼 크기 ("large" | "medium")
 * @param props.icon - 표시할 아이콘
 * @param props.iconColor - 아이콘 색상
 * @param props.color - 버튼 색상 ("default" | "happy")
 * @param props.disabled - 비활성화 상태
 * @param props.onPress - 클릭 시 실행할 함수
 * @returns JSX.Element
 * @example
 * <IconButton size="large" icon={<BellIcon />} iconColor="white" onPress={() => {}} />
 * <IconButton size="medium" icon={<SettingIcon />} color="happy" />
 * <IconButton size="large" icon={<BellIcon />} disabled />
 */
export const IconButton = ({
	size = "large",
	icon,
	iconColor = "white",
	color = "default",
	disabled = false,
	onPress,
}: IconButtonProps) => {
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
				<S.Background $size={size} $pressed={pressed} $color={color}>
					<S.IconContainer>
						{isValidElement(icon)
							? cloneElement(icon as ReactElement<SvgProps>, {
									color: iconColor,
								})
							: icon}
					</S.IconContainer>
				</S.Background>
			</Reanimated.View>
		</TouchableOpacity>
	);
};
