import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/widgets/BottomNav/style/BottomNav.style";
import { usePathname, useRouter, type Href } from "expo-router";
import {
	cloneElement,
	isValidElement,
	useState,
	type ReactElement,
	type ReactNode,
} from "react";
import { Animated, TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

import HouseIcon from "@/shared/assets/icons/house.svg";
import LayersIcon from "@/shared/assets/icons/layers.svg";
import QuotesIcon from "@/shared/assets/icons/quotes.svg";
import SettingIcon from "@/shared/assets/icons/setting.svg";
import UsersIcon from "@/shared/assets/icons/users.svg";

export interface NavItem {
	icon: ReactNode;
	label: string;
	route?: string; // 라우트 이름 (예: "Home", "Profile")
	activeIcon?: ReactNode; // active 상태일 때 표시할 아이콘 (optional)
	activePaths?: string[]; // 이 탭을 active로 표시할 추가 경로들
}

const NAV_ITEMS: NavItem[] = [
	{ icon: <HouseIcon />, label: "홈", route: "home" },
	{ icon: <QuotesIcon />, label: "기록", route: "journal" },
	{ icon: <UsersIcon />, label: "친구", route: "friends" },
	{ icon: <LayersIcon />, label: "리포트", route: "report" },
	{ icon: <SettingIcon />, label: "마이", route: "user" },
];

interface BottomNavBarProps {
	activeIndex?: number;
	setActiveIndex?: (index: number) => void;
}

/**
 * BottomNav - 하단 네비게이션 바
 * @param props - BottomNav props
 * @param props.activeIndex - 활성화된 아이템 인덱스 (선택사항)
 * @param props.setActiveIndex - 인덱스 변경 시 실행할 함수 (선택사항)
 * @returns JSX.Element
 * @example
 * // 1. 기본 사용 (자동 상태 관리)
 * <BottomNav />
 *
 * // 2. 외부 상태 관리
 * const [activeIndex, setActiveIndex] = useState(0);
 * <BottomNav
 *   activeIndex={activeIndex}
 *   setActiveIndex={setActiveIndex}
 * />
 */
// NavItem 컴포넌트 (usePressAnimation 사용)
const NavItemComponent = ({
	item,
	index,
	isActive,
	onPress,
}: {
	item: NavItem;
	index: number;
	isActive: boolean;
	onPress: () => void;
}) => {
	const theme = useTheme();
	const { scale, handlePressIn, handlePressOut } = usePressAnimation();

	return (
		<TouchableOpacity
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={1}
		>
			<Animated.View style={{ transform: [{ scale }] }}>
				<S.NavItem>
					<S.IconContainer>
						{isValidElement(item.icon)
							? cloneElement(item.icon as ReactElement<SvgProps>, {
									color: isActive
										? theme.grayscale.white
										: theme.grayscale.gray500,
								})
							: item.icon}
					</S.IconContainer>
					<S.Label $active={isActive}>{item.label}</S.Label>
				</S.NavItem>
			</Animated.View>
		</TouchableOpacity>
	);
};

export const BottomNav = ({
	activeIndex: controlledActiveIndex,
	setActiveIndex,
}: BottomNavBarProps) => {
	const [internalActiveIndex, setInternalActiveIndex] = useState(0);

	const router = useRouter();
	const pathname = usePathname();

	// 🔽 현재 경로를 기반으로 activeIndex 자동 계산
	const autoActiveIndex = NAV_ITEMS.findIndex((item) => {
		if (!item.route) return false;

		// 직접 매칭 (예: /home, /journal)
		if (pathname === `/${item.route}`) return true;

		// activePaths 매칭 (여러 경로를 하나의 탭으로)
		if (item.activePaths) {
			return item.activePaths.some((path) => pathname.startsWith(path));
		}

		// 하위 경로 매칭 (예: /journal/explore -> journal 탭 활성화)
		if (pathname.startsWith(`/${item.route}/`)) return true;

		return false;
	});

	// 🔽 자동 계산된 activeIndex 사용 (route 기능 활성화 시)
	const activeIndex =
		controlledActiveIndex ??
		(autoActiveIndex !== -1 ? autoActiveIndex : internalActiveIndex);

	const handlePress = (index: number) => {
		setInternalActiveIndex(index);
		if (setActiveIndex) {
			setActiveIndex(index);
		}

		const item = NAV_ITEMS[index];
		if (item.route) {
			router.push(`/${item.route}` as Href);
		}
	};

	return (
		<S.Container>
			{NAV_ITEMS.map((item, index) => {
				const isActive = index === activeIndex;
				return (
					<NavItemComponent
						key={`nav-${item.label}-${index}`}
						item={item}
						index={index}
						isActive={isActive}
						onPress={() => handlePress(index)}
					/>
				);
			})}
		</S.Container>
	);
};
