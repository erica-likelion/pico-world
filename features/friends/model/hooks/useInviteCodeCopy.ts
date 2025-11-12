import { useCallback, useEffect, useRef, useState } from "react";

interface UseInviteCodeCopyOptions {
	resetDelay?: number;
	onCopy?: () => void;
}

export function useInviteCodeCopy(options: UseInviteCodeCopyOptions = {}) {
	const { resetDelay = 1500, onCopy } = options;

	const [isCopied, setIsCopied] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleCopy = useCallback(() => {
		onCopy?.();
		setIsCopied(true);

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			setIsCopied(false);
		}, resetDelay);
	}, [onCopy, resetDelay]);

	return {
		isCopied,
		handleCopy,
	};
}
