import { create } from "zustand";

interface FeedbackTimerState {
	isTimerRunning: boolean;
	targetJournalId: string | null;
	timerEndTime: number | null;
	characterName: string | null;
	actions: {
		startTimer: (
			journalId: string,
			durationInSeconds: number,
			characterName: string,
		) => void;
		clearTimer: () => void;
	};
}

export const useFeedbackTimerStore = create<FeedbackTimerState>((set) => ({
	isTimerRunning: false,
	targetJournalId: null,
	timerEndTime: null,
	characterName: null,
	actions: {
		startTimer: (journalId, durationInSeconds, characterName) =>
			set({
				isTimerRunning: true,
				targetJournalId: journalId,
				timerEndTime: Date.now() + durationInSeconds * 1000,
				characterName,
			}),
		clearTimer: () =>
			set({
				isTimerRunning: false,
				targetJournalId: null,
				timerEndTime: null,
				characterName: null,
			}),
	},
}));

export const useFeedbackTimerActions = () =>
	useFeedbackTimerStore((state) => state.actions);
