import MenuIconSvg from "@/shared/assets/icons/menu.svg";
import styled from "styled-components/native";

export const EmotionCardContainer = styled.View<{ $subColor: string }>`
  position: relative;
  display: flex;
  height: ${({ theme }) => theme.rem(193)};
  padding: ${({ theme }) => theme.rem(58.5)} 0;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 32px;
  background-color: ${({ $subColor }) => $subColor};
`;

export const EditBox = styled.View`
  position: absolute;
  flex-direction: row;
  z-index: 10;
  top: ${({ theme }) => theme.rem(16)};
  left: ${({ theme }) => theme.rem(20)};
  width: 88%;
  height: ${({ theme }) => theme.rem(18)};
  align-items: center;
  justify-content: space-between;
`;

export const EditDateBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(6)};
`;

export const EditDate = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-medium"]};
`;

export const EditTime = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title4-medium"]};
`;

export const MenuIcon = styled(MenuIconSvg)`
  width: ${({ theme }) => theme.rem(18)};
  height: ${({ theme }) => theme.rem(18)};
  color: ${({ theme }) => theme.grayscale.white};
`;

export const EmotionCardTextBox = styled.View`
  display: flex;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(14)};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.rem(10)};
  border-radius: 60px;
  background-color: rgba(255, 255, 255, 0.28);
`;

export const EmotionCardText = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.h4};
`;
