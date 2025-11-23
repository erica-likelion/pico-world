import { create } from "zustand";

interface FriendAlarmState {
	blockedFriends: Record<string, boolean>;
	setBlocked: (connectCode: string, isBlocked: boolean) => void;
}

export const useFriendAlarmStore = create<FriendAlarmState>((set) => ({
	blockedFriends: {},
	setBlocked: (connectCode, isBlocked) =>
		set((state) => ({
			blockedFriends: {
				...state.blockedFriends,
				[connectCode]: isBlocked,
			},
		})),
}));
