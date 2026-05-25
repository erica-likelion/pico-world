import HouseIcon from "@/shared/assets/icons/house.svg";
import LayersIcon from "@/shared/assets/icons/layers.svg";
import QuotesIcon from "@/shared/assets/icons/quotes.svg";
import SettingIcon from "@/shared/assets/icons/setting.svg";
import UsersIcon from "@/shared/assets/icons/users.svg";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import * as S from "@/widgets/BottomNav/style/BottomNav.styles";
import React, { type ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { useBottomNav } from "../model/useBottomNav";

export interface NavItem {
	icon: React.ComponentType<SvgProps>;
	label: string;
	route?: string; // 라우트 이름 (예: "Home", "Profile")
	activeIcon?: ReactNode; // active 상태일 때 표시할 아이콘 (optional)
	activePaths?: string[]; // 이 탭을 active로 표시할 추가 경로들
}

const NAV_ITEMS: NavItem[] = [
	{ icon: HouseIcon, label: "홈", route: "home" },
	{ icon: QuotesIcon, label: "기록", route: "journal" },
	{ icon: UsersIcon, label: "친구", route: "friends" },
	{ icon: LayersIcon, label: "리포트", route: "report" },
	{ icon: SettingIcon, label: "마이", route: "my" },
] as const;

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
const NavItemComponent = React.memo(
	({
		item,
		index,
		isActive,
		onPress,
	}: {
		item: NavItem;
		index: number;
		isActive: boolean;
		onPress: (index: number) => void;
	}) => {
		const theme = useTheme();
		const { animatedStyle, handlePressIn, handlePressOut } =
			usePressAnimation();
		const Icon = item.icon;

		return (
			<TouchableOpacity
				onPress={() => onPress(index)}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				activeOpacity={1}
			>
				<Reanimated.View style={animatedStyle}>
					<S.NavItem>
						<S.IconContainer>
							<Icon
								color={
									isActive ? theme.grayscale.white : theme.grayscale.gray500
								}
							/>
						</S.IconContainer>
						<S.Label $active={isActive}>{item.label}</S.Label>
					</S.NavItem>
				</Reanimated.View>
			</TouchableOpacity>
		);
	},
	(prev, next) => {
		return (
			prev.isActive === next.isActive &&
			prev.item === next.item &&
			prev.index === next.index &&
			prev.onPress === next.onPress
		);
	},
);

export const BottomNav = ({
	activeIndex: controlledActiveIndex,
	setActiveIndex,
}: BottomNavBarProps) => {
	const { activeIndex, handlePress } = useBottomNav({
		navItems: NAV_ITEMS,
		controlledActiveIndex,
		setActiveIndex,
	});

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
						onPress={handlePress}
					/>
				);
			})}
		</S.Container>
	);
};
