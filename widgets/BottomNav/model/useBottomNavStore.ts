import { create } from "zustand";

interface BottomNavStore {
	isVisible: boolean;
	show: () => void;
	hide: () => void;
	toggle: () => void;
}

/**
 * BottomNav 표시 여부를 관리하는 전역 상태
 *
 * @example
 * // 레이아웃에서 사용
 * const { isVisible } = useBottomNavStore();
 * {isVisible && <BottomNav />}
 *
 * // 페이지에서 숨기기
 * const { hide } = useBottomNavStore();
 * useEffect(() => {
 *   hide();
 *   return () => show(); // cleanup
 * }, []);
 */
export const useBottomNavStore = create<BottomNavStore>((set) => ({
	isVisible: true,
	show: () => set({ isVisible: true }),
	hide: () => set({ isVisible: false }),
	toggle: () => set((state) => ({ isVisible: !state.isVisible })),
}));
