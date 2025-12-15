import * as S from "@/shared/style/CharacterBubble.styles";
import { useEffect } from "react";
import Reanimated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";

export const CharacterBubbleSkeleton = () => {
	const theme = useTheme();
	const progress = useSharedValue(0);

	useEffect(() => {
		progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
	}, [progress]);

	const characterAnimatedStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[theme.grayscale.gray900, theme.grayscale.gray800],
		);
		return { backgroundColor };
	});

	const bubbleAnimatedStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[theme.grayscale.gray800, theme.grayscale.gray900],
		);
		return { backgroundColor };
	});

	return (
		<S.Container>
			<Reanimated.View
				style={[
					{
						width: 36,
						aspectRatio: 1,
						borderRadius: 999,
					},
					characterAnimatedStyle,
				]}
			/>
			<Reanimated.View
				style={[
					{
						display: "flex",
						flex: 1,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						borderBottomLeftRadius: 4,
						minHeight: 40,
					},
					bubbleAnimatedStyle,
				]}
			/>
		</S.Container>
	);
};
