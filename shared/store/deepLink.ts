import { create } from "zustand";

interface DeepLinkState {
	pendingDestination: string | null;
	setPendingDestination: (destination: string) => void;
	clearPendingDestination: () => void;
}

export const useDeepLinkStore = create<DeepLinkState>((set) => ({
	pendingDestination: null,
	setPendingDestination: (destination) =>
		set({ pendingDestination: destination }),
	clearPendingDestination: () => set({ pendingDestination: null }),
}));
