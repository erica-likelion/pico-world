import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";
import { TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import * as S from "@/shared/style/TopNavBar.style";

interface TopNavBarProps {
	title?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	onLeftPress?: () => void;
	onRightPress?: () => void;
	showBorder?: boolean;
}

/**
 * TopNavBar - 상단 네비게이션 바
 * @param props - TopNavBar props
 * @param props.title - 타이틀 텍스트
 * @param props.leftIcon - 왼쪽 아이콘 (뒤로가기 등)
 * @param props.rightIcon - 오른쪽 아이콘 (메뉴 등)
 * @param props.onLeftPress - 왼쪽 아이콘 클릭 시 실행할 함수
 * @param props.onRightPress - 오른쪽 아이콘 클릭 시 실행할 함수
 * @param props.showBorder - 하단 보더 표시 여부
 * @returns JSX.Element
 * @example
 * // leftIcon 없을 때 - H4 스타일 (20px, bold)
 * <TopNavBar title="페이지 제목" showBorder />
 *
 * // leftIcon 있을 때 - Title2 스타일 (16px, semibold), 200px width, ellipsis
 * <TopNavBar
 *   title="매우 긴 페이지 제목이 들어가면 말줄임표로 처리됩니다"
 *   leftIcon={<LeftIcon />}
 *   onLeftPress={() => navigation.goBack()}
 *   showBorder
 * />
 *
 * // rightIcon도 추가 가능
 * <TopNavBar
 *   title="페이지 제목"
 *   leftIcon={<LeftIcon />}
 *   rightIcon={<MenuIcon />}
 *   onLeftPress={() => {}}
 *   onRightPress={() => {}}
 * />
 */
export const TopNavBar = ({
	title,
	leftIcon,
	rightIcon,
	onLeftPress,
	onRightPress,
	showBorder = true,
}: TopNavBarProps) => {
	const hasLeftIcon = !!leftIcon;
	const theme = useTheme();

	return (
		<S.Container $showBorder={showBorder}>
			{hasLeftIcon ? (
				<>
					<S.LeftSection>
						<TouchableOpacity onPress={onLeftPress} activeOpacity={0.7}>
							<S.IconContainer>
								{isValidElement(leftIcon)
									? cloneElement(leftIcon as ReactElement<SvgProps>, {
											color: theme.grayscale.white,
										})
									: leftIcon}
							</S.IconContainer>
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
							<TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
								<S.IconContainer>
									{isValidElement(rightIcon)
										? cloneElement(rightIcon as ReactElement<SvgProps>, {
												color: theme.grayscale.white,
											})
										: rightIcon}
								</S.IconContainer>
							</TouchableOpacity>
						)}
					</S.RightSection>
				</>
			) : (
				<>
					{title && <S.Title $hasLeftIcon={false}>{title}</S.Title>}
					{rightIcon && (
						<TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
							<S.IconContainer>
								{isValidElement(rightIcon)
									? cloneElement(rightIcon as ReactElement<SvgProps>, {
											color: theme.grayscale.white,
										})
									: rightIcon}
							</S.IconContainer>
						</TouchableOpacity>
					)}
				</>
			)}
		</S.Container>
	);
};
