import AppleIcon from "@/shared/assets/icons/apple-logo.svg";
import KaKaoIcon from "@/shared/assets/icons/kakao-logo.svg";
import Reanimated from "react-native-reanimated";
import styled from "styled-components/native";

export const LoginButtonContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.rem(12)};
  width: 100%;
  position: fixed;
  bottom: ${({ theme }) => theme.rem(34)};
  left: 0;
  z-index: 10;
`;

export const KaKaoLoginButton = styled(Reanimated.View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  background-color: #fee500;
  border-radius: 60px;
  gap: ${({ theme }) => theme.rem(8)};
`;

export const AppleLoginButton = styled(Reanimated.View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  border-radius: 60px;
  gap: ${({ theme }) => theme.rem(8)};
`;

export const KaKaoLogo = styled(KaKaoIcon)`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
`;

export const AppleLogo = styled(AppleIcon)`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
`;

export const LoginButtonText = styled.Text<{ isKakao?: boolean }>`
  color: ${({ isKakao, theme }) =>
		isKakao ? theme.grayscale.black : theme.grayscale.white};
  ${({ theme }) => theme.typography["title1-bold"]};
`;
