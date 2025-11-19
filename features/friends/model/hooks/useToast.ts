import { useCallback, useState } from "react";

export function useToast() {
	const [isVisible, setIsVisible] = useState(false);
	const [message, setMessage] = useState("");

	const show = useCallback((msg: string) => {
		setMessage(msg);
		setIsVisible(true);
	}, []);

	const hide = useCallback(() => {
		setIsVisible(false);
		setMessage("");
	}, []);

	return {
		isVisible,
		message,
		show,
		hide,
	};
}
