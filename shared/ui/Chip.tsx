import * as S from "@/shared/style/Chip.styles";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
interface ChipProps {
	text: string;
	selected: boolean;
	setSelected?: (selected: boolean) => void;
}

export function Chip({ text, selected, setSelected }: ChipProps) {
	const scale = useRef(new Animated.Value(1)).current;
	const iconOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(iconOpacity, {
			toValue: selected ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [selected, iconOpacity]);

	const handlePressIn = () => {
		Animated.timing(scale, {
			toValue: 0.95,
			useNativeDriver: true,
			duration: 300,
		}).start();
	};

	const handlePressOut = () => {
		Animated.timing(scale, {
			toValue: 1,
			useNativeDriver: true,
			duration: 300,
		}).start();
	};

	const handlePress = () => {
		if (setSelected) {
			setSelected(!selected);
		}
	};

	return (
		<S.ChipPressable
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View style={{ transform: [{ scale }] }}>
				<S.ChipContainer selected={selected}>
					{selected && (
						<Animated.View style={{ opacity: iconOpacity }}>
							<S.CheckIcon />
						</Animated.View>
					)}
					<S.ChipText>{text}</S.ChipText>
				</S.ChipContainer>
			</Animated.View>
		</S.ChipPressable>
	);
}
