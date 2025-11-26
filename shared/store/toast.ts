import { create } from "zustand";

interface ToastState {
	isVisible: boolean;
	message: string;
	show: (message: string) => void;
	hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
	isVisible: false,
	message: "",
	show: (message: string) => set({ isVisible: true, message }),
	hide: () => set({ isVisible: false, message: "" }),
}));
