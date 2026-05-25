import { type Href, usePathname, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import type { NavItem } from "../ui/BottomNav";

interface UseBottomNavProps {
	navItems: readonly NavItem[];
	controlledActiveIndex?: number;
	setActiveIndex?: (index: number) => void;
}

export const useBottomNav = ({
	navItems,
	controlledActiveIndex,
	setActiveIndex,
}: UseBottomNavProps) => {
	const [internalActiveIndex, setInternalActiveIndex] = useState(0);
	const router = useRouter();
	const pathname = usePathname();

	const autoActiveIndex = navItems.findIndex((item) => {
		if (!item.route) return false;

		if (pathname === `/${item.route}`) return true;

		if (item.activePaths) {
			return item.activePaths.some((path) => pathname.startsWith(path));
		}

		if (pathname.startsWith(`/${item.route}/`)) return true;

		return false;
	});

	const activeIndex =
		controlledActiveIndex ??
		(autoActiveIndex !== -1 ? autoActiveIndex : internalActiveIndex);

	const handlePress = useCallback(
		(index: number) => {
			if (index === activeIndex) return;

			setInternalActiveIndex(index);

			if (setActiveIndex) {
				setActiveIndex(index);
			}

			const item = navItems[index];
			if (item.route) {
				router.replace(`/${item.route}` as Href);
			}
		},
		[activeIndex, navItems, router, setActiveIndex],
	);

	return {
		activeIndex,
		handlePress,
	};
};
