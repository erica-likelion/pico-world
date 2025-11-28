import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useFeedbackTimerStore } from "@/shared/store/feedbackTimer";

export const useFeedbackTimer = (journalId: string) => {
	const queryClient = useQueryClient();
	const { isTimerRunning, targetJournalId, timerEndTime, actions } =
		useFeedbackTimerStore();
	const { clearTimer } = actions;

	const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

	const isTarget = isTimerRunning && targetJournalId === journalId;

	useEffect(() => {
		if (!isTarget || !timerEndTime) {
			setRemainingSeconds(null);
			return;
		}

		const intervalId = setInterval(() => {
			const now = Date.now();
			const secondsLeft = Math.round((timerEndTime - now) / 1000);

			if (secondsLeft <= 0) {
				clearInterval(intervalId);
				setRemainingSeconds(0);
				clearTimer();
				queryClient.invalidateQueries({
					queryKey: ["feedback", journalId],
				});
			} else {
				setRemainingSeconds(secondsLeft);
			}
		}, 1000);

		const initialSecondsLeft = Math.round((timerEndTime - Date.now()) / 1000);
		setRemainingSeconds(initialSecondsLeft > 0 ? initialSecondsLeft : 0);

		return () => {
			clearInterval(intervalId);
		};
	}, [isTarget, timerEndTime, journalId, clearTimer, queryClient]);

	return {
		isWaitingForFeedback: isTarget,
		remainingSeconds,
	};
};
