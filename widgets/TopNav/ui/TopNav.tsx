import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";
import { Animated, TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { useRouter } from "expo-router";
import { usePressAnimation } from "@/shared/hooks/usePressAnimation";
import LeftIcon from "@/shared/assets/icons/left.svg";
import * as S from "./TopNav.style";

interface TopNavBarProps {
	title?: string;
	leftIcon?: boolean;
	rightIcon?: ReactNode;
	onRightPress?: () => void;
	showBorder?: boolean;
}

/**
 * TopNav - 상단 네비게이션 바
 * @param props - TopNav props
 * @param props.title - 타이틀 텍스트
 * @param props.leftIcon - 뒤로가기 버튼 표시 여부 (true일 때 자동으로 router.back() 실행)
 * @param props.rightIcon - 오른쪽 아이콘
 * @param props.onRightPress - 오른쪽 아이콘 클릭 시 실행할 함수
 * @param props.showBorder - 하단 보더 표시 여부
 * @returns JSX.Element
 * @example
 * // 뒤로가기 버튼 없음 - H4 스타일 (20px, bold)
 * <TopNav title="홈" />
 *
 * // 뒤로가기 버튼 있음 - Title2 스타일 (16px, semibold), 200px width, ellipsis
 * <TopNav title="상세 페이지" leftIcon={true} />
 *
 * // rightIcon도 추가 가능
 * <TopNav
 *   title="설정"
 *   leftIcon={true}
 *   rightIcon={<MenuIcon />}
 *   onRightPress={() => {}}
 * />
 */
export const TopNav = ({
	title,
	leftIcon = false,
	rightIcon,
	onRightPress,
	showBorder = true,
}: TopNavBarProps) => {
	const router = useRouter();
	const theme = useTheme();
	const leftAnimation = usePressAnimation();
	const rightAnimation = usePressAnimation();

	return (
		<S.Container $showBorder={showBorder}>
			{leftIcon ? (
				<>
					<S.LeftSection>
						<TouchableOpacity
							onPress={() => router.back()}
							onPressIn={leftAnimation.handlePressIn}
							onPressOut={leftAnimation.handlePressOut}
							activeOpacity={1}
						>
							<Animated.View
								style={{ transform: [{ scale: leftAnimation.scale }] }}
							>
								<S.IconContainer>
									<LeftIcon color={theme.grayscale.white} />
								</S.IconContainer>
							</Animated.View>
						</TouchableOpacity>
					</S.LeftSection>

					<S.CenterSection>
						{title && (
							<S.Title
								$hasLeftIcon={true}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{title}
							</S.Title>
						)}
					</S.CenterSection>

					<S.RightSection>
						{rightIcon && (
							<TouchableOpacity
								onPress={onRightPress}
								onPressIn={rightAnimation.handlePressIn}
								onPressOut={rightAnimation.handlePressOut}
								activeOpacity={1}
							>
								<Animated.View
									style={{ transform: [{ scale: rightAnimation.scale }] }}
								>
									<S.IconContainer>
										{isValidElement(rightIcon)
											? cloneElement(rightIcon as ReactElement<SvgProps>, {
													color: theme.grayscale.white,
												})
											: rightIcon}
									</S.IconContainer>
								</Animated.View>
							</TouchableOpacity>
						)}
					</S.RightSection>
				</>
			) : (
				<>
					{title && <S.Title $hasLeftIcon={false}>{title}</S.Title>}
					{rightIcon && (
						<TouchableOpacity
							onPress={onRightPress}
							onPressIn={rightAnimation.handlePressIn}
							onPressOut={rightAnimation.handlePressOut}
							activeOpacity={1}
						>
							<Animated.View
								style={{ transform: [{ scale: rightAnimation.scale }] }}
							>
								<S.IconContainer>
									{isValidElement(rightIcon)
										? cloneElement(rightIcon as ReactElement<SvgProps>, {
												color: theme.grayscale.white,
											})
										: rightIcon}
								</S.IconContainer>
							</Animated.View>
						</TouchableOpacity>
					)}
				</>
			)}
		</S.Container>
	);
};
