import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

/**
 * 화면이 활성화될 때 바텀 네비게이션을 숨기고, 비활성화될 때 다시 보이게 하는 훅
 */

export function useHideBottomNav() {
	const { hide, show } = useBottomNavStore();

	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);
}
