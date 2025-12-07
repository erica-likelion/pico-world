import { create } from "zustand";

interface AuthState {
	isLoggedIn: boolean | null;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	isOnboarding: boolean;
	setIsOnboarding: (isOnboarding: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: null,
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	isOnboarding: false,
	setIsOnboarding: (isOnboarding) => set({ isOnboarding }),
}));
