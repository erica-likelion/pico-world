import * as S from "./BottomNav.style";
import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useState,
} from "react";
import { TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
// import { useNavigation, useRoute } from "@react-navigation/native";

export interface NavItem {
	icon: ReactNode;
	label: string;
	// === 고급 네비게이션 기능 (주석 해제 시 사용) ===
	// route?: string; // 라우트 이름 (예: "Home", "Profile")
	// activeIcon?: ReactNode; // active 상태일 때 표시할 아이콘 (optional)
	// activePaths?: string[]; // 이 탭을 active로 표시할 추가 경로들
}

interface BottomNavBarProps {
	items: NavItem[];
	activeIndex?: number;
	setActiveIndex?: (index: number) => void;
}

/**
 * BottomNavBar - 하단 네비게이션 바
 * @param props - BottomNavBar props
 * @param props.items - 네비게이션 아이템 배열
 * @param props.activeIndex - 활성화된 아이템 인덱스 (선택사항)
 * @param props.setActiveIndex - 인덱스 변경 시 실행할 함수 (선택사항)
 * @returns JSX.Element
 * @example
 * // 1. 기본 사용 (자동 상태 관리)
 * <BottomNavBar
 *   items={[
 *     { icon: <HomeIcon />, label: "홈" },
 *     { icon: <CalendarIcon />, label: "캘린더" }
 *   ]}
 * />
 *
 * // 2. 외부 상태 관리
 * const [activeIndex, setActiveIndex] = useState(0);
 * <BottomNavBar
 *   items={[...]}
 *   activeIndex={activeIndex}
 *   setActiveIndex={setActiveIndex}
 * />
 *
 * // 3. React Navigation 연동 (주석 해제 후)
 * // <BottomNavBar
 * //   items={[
 * //     { icon: <HomeIcon />, label: "홈", route: "Home" },
 * //     { icon: <RecordIcon />, label: "기록", route: "Record" },
 * //     {
 * //       icon: <FriendsIcon />,
 * //       label: "친구",
 * //       route: "Friends",
 * //       activePaths: ["Friends", "FriendDetail"] // 친구 상세도 같은 탭으로
 * //     }
 * //   ]}
 * // />
 *
 * // 4. active/inactive 아이콘 분리 (주석 해제 후)
 * // <BottomNavBar
 * //   items={[
 * //     {
 * //       icon: <HomeIcon />,
 * //       activeIcon: <HomeFilledIcon />,
 * //       label: "홈",
 * //       route: "Home"
 * //     }
 * //   ]}
 * // />
 */
export const BottomNav = ({
	items,
	activeIndex: controlledActiveIndex,
	setActiveIndex,
}: BottomNavBarProps) => {
	const [internalActiveIndex, setInternalActiveIndex] = useState(0);
	const theme = useTheme();

	// === 고급 네비게이션 기능 (주석 해제 시 사용) ===
	// const navigation = useNavigation();
	// const route = useRoute();

	// 🔽 현재 경로를 기반으로 activeIndex 자동 계산
	// const autoActiveIndex = items.findIndex((item, index) => {
	//   if (!item.route) return false;
	//   const currentRouteName = route.name;
	//
	//   // 직접 매칭
	//   if (currentRouteName === item.route) return true;
	//
	//   // activePaths 매칭 (여러 경로를 하나의 탭으로)
	//   if (item.activePaths) {
	//     return item.activePaths.some(path => currentRouteName.startsWith(path));
	//   }
	//
	//   return false;
	// });

	// 🔽 자동 계산된 activeIndex 사용 (route 기능 활성화 시)
	// const activeIndex = controlledActiveIndex ?? (autoActiveIndex !== -1 ? autoActiveIndex : internalActiveIndex);

	// 기본 모드 (route 기능 비활성화)
	const activeIndex = controlledActiveIndex ?? internalActiveIndex;

	const handlePress = (index: number) => {
		setInternalActiveIndex(index);
		if (setActiveIndex) {
			setActiveIndex(index);
		}

		// 🔽 라우트 네비게이션 (주석 해제 시 사용)
		// const item = items[index];
		// if (item.route) {
		//   navigation.navigate(item.route);
		// }
	};

	return (
		<S.Container>
			{items.map((item, index) => {
				const isActive = index === activeIndex;
				return (
					<TouchableOpacity
						key={`nav-${item.label}-${index}`}
						onPress={() => handlePress(index)}
						activeOpacity={0.7}
					>
						<S.NavItem>
							<S.IconContainer>
								{/* active/inactive 아이콘 분리 기능 (activeIcon prop 사용 시) */}
								{/* {isActive && item.activeIcon
                  ? (isValidElement(item.activeIcon)
                      ? cloneElement(item.activeIcon as ReactElement<SvgProps>, {
                          color: theme.grayscale.white,
                        })
                      : item.activeIcon)
                  : (isValidElement(item.icon)
                      ? cloneElement(item.icon as ReactElement<SvgProps>, {
                          color: isActive
                            ? theme.grayscale.white
                            : theme.grayscale.gray500,
                        })
                      : item.icon)} */}

								{/* 기본 모드: 하나의 아이콘에 색상만 변경 */}
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
					</TouchableOpacity>
				);
			})}
		</S.Container>
	);
};
