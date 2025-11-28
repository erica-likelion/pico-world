import { create } from "zustand";

interface FeedbackTimerState {
	isTimerRunning: boolean;
	targetJournalId: string | null;
	timerEndTime: number | null;
	actions: {
		startTimer: (journalId: string, durationInSeconds: number) => void;
		clearTimer: () => void;
	};
}

export const useFeedbackTimerStore = create<FeedbackTimerState>((set) => ({
	isTimerRunning: false,
	targetJournalId: null,
	timerEndTime: null,
	actions: {
		startTimer: (journalId, durationInSeconds) =>
			set({
				isTimerRunning: true,
				targetJournalId: journalId,
				timerEndTime: Date.now() + durationInSeconds * 1000,
			}),
		clearTimer: () =>
			set({
				isTimerRunning: false,
				targetJournalId: null,
				timerEndTime: null,
			}),
	},
}));

export const useFeedbackTimerActions = () =>
	useFeedbackTimerStore((state) => state.actions);
