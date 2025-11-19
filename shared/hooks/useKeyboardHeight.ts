import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export function useKeyboardHeight() {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const show = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
			(e) => setKeyboardHeight(e.endCoordinates.height),
		);

		const hide = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
			() => setKeyboardHeight(0),
		);

		return () => {
			show.remove();
			hide.remove();
		};
	}, []);

	return keyboardHeight;
}
