import { create } from "zustand";

interface AuthState {
	isLoggedIn: boolean | null;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: null,
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
