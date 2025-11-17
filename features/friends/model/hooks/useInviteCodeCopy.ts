import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseInviteCodeCopyOptions {
	inviteCode: string;
	resetDelay?: number;
	onCopy?: () => void;
}

export function useInviteCodeCopy(options: UseInviteCodeCopyOptions) {
	const { inviteCode, resetDelay = 1500, onCopy } = options;

	const [isCopied, setIsCopied] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleCopy = useCallback(async () => {
		try {
			await Clipboard.setStringAsync(inviteCode);
			onCopy?.();
			setIsCopied(true);

			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				setIsCopied(false);
			}, resetDelay);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	}, [inviteCode, onCopy, resetDelay]);

	return {
		isCopied,
		handleCopy,
	};
}
