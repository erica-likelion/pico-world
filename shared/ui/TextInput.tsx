/**
 * TextInput Component
 *
 * @param {number} [height] - Optional height of the TextInput component. Default is 56.
 * @param {string} placeholder - Placeholder text for the TextInput.
 * @param {boolean} [multiline=false] - Optional flag to enable multiline input. Default is false.
 *
 * @example
 * <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 *   <TextInput
 *     height={60}
 *     placeholder="Enter your text here"
 *     multiline={true}
 *   />
 * </TouchableWithoutFeedback>
 */

import * as S from "@/shared/style/TextInput.styles";
import { useTheme } from "styled-components/native";

interface TextInputProps {
	height?: number;
	placeholder: string;
	multiline?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
}

export function TextInput({
	height,
	placeholder,
	multiline = false,
	value,
	onChangeText,
}: TextInputProps) {
	const theme = useTheme();

	return (
		<S.TextInputContainer
			multiline={multiline}
			height={height}
			placeholder={placeholder}
			placeholderTextColor={theme.grayscale.gray400}
			value={value}
			onChangeText={onChangeText}
		/>
	);
}
