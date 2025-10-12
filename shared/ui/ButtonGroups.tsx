import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/shared/style/ButtonGroups.style";
import {
	cloneElement,
	isValidElement,
	ReactElement,
	ReactNode,
	useState,
} from "react";
import { Animated, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

interface ButtonGroupsProps {
	text: string;
	icon: ReactNode;
	leftDisabled?: boolean;
	rightDisabled?: boolean;
	onLeftPress?: () => void;
	onRightPress?: () => void;
}

/**
 * ButtonGroups
 * @param props - ButtonGroups props
 * @param props.text - 왼쪽 버튼에 표시할 텍스트
 * @param props.icon - 오른쪽 버튼에 표시할 아이콘
 * @param props.leftDisabled - 왼쪽 버튼 비활성화 상태
 * @param props.rightDisabled - 오른쪽 버튼 비활성화 상태
 * @param props.onLeftPress - 왼쪽 버튼 클릭 시 실행할 함수
 * @param props.onRightPress - 오른쪽 버튼 클릭 시 실행할 함수
 * @returns JSX.Element
 * @example
 * <ButtonGroups text="확인" icon={<CheckIcon />} leftDisabled rightDisabled />
 * <ButtonGroups text="확인" icon={<CheckIcon />} onLeftPress={() => console.log('left')} onRightPress={() => console.log('right')} />
 */
export const ButtonGroups = ({
	text,
	icon,
	leftDisabled = false,
	rightDisabled = false,
	onLeftPress,
	onRightPress,
}: ButtonGroupsProps) => {
	const theme = useTheme();

	const [leftPressed, setLeftPressed] = useState(false);
	const [rightPressed, setRightPressed] = useState(false);

	const {
		scale: rightScale,
		handlePressIn: rightPressIn,
		handlePressOut: rightPressOut,
	} = usePressAnimation({ disabled: rightDisabled });

	const {
		scale: leftScale,
		handlePressIn: leftPressIn,
		handlePressOut: leftPressOut,
	} = usePressAnimation({ disabled: leftDisabled });

	const handleLeftPressIn = () => {
		if (!leftDisabled) {
			setLeftPressed(true);
			leftPressIn();
		}
	};

	const handleLeftPressOut = () => {
		setLeftPressed(false);
		leftPressOut();
	};

	const handleLeftPress = () => {
		if (!leftDisabled && onLeftPress) {
			onLeftPress();
		}
	};

	const handleRightPressIn = () => {
		if (!rightDisabled) {
			setRightPressed(true);
			rightPressIn();
		}
	};

	const handleRightPressOut = () => {
		setRightPressed(false);
		rightPressOut();
	};

	const handleRightPress = () => {
		if (!rightDisabled && onRightPress) {
			onRightPress();
		}
	};

	const iconColor = rightDisabled
		? theme.grayscale.gray600
		: theme.grayscale.white;

	return (
		<S.Container>
			<S.TextButtonWrapper>
				<TouchableOpacity
					onPress={handleLeftPress}
					onPressIn={handleLeftPressIn}
					onPressOut={handleLeftPressOut}
					disabled={leftDisabled}
					activeOpacity={1}
					style={{ flex: 1 }}
				>
					<Animated.View
						style={{ transform: [{ scale: leftScale }], height: "100%" }}
					>
						<S.TextButton $disabled={leftDisabled} $pressed={leftPressed}>
							<S.Text $disabled={leftDisabled}>{text}</S.Text>
						</S.TextButton>
					</Animated.View>
				</TouchableOpacity>
			</S.TextButtonWrapper>

			<S.IconButtonWrapper>
				<TouchableOpacity
					onPress={handleRightPress}
					onPressIn={handleRightPressIn}
					onPressOut={handleRightPressOut}
					disabled={rightDisabled}
					activeOpacity={1}
					style={{ flex: 1 }}
				>
					<Animated.View
						style={{ transform: [{ scale: rightScale }], height: "100%" }}
					>
						<S.IconButton $disabled={rightDisabled} $pressed={rightPressed}>
							{isValidElement(icon)
								? cloneElement(icon as ReactElement<SvgProps>, {
										width: 24,
										height: 24,
										color: iconColor,
									})
								: icon}
						</S.IconButton>
					</Animated.View>
				</TouchableOpacity>
			</S.IconButtonWrapper>
		</S.Container>
	);
};
