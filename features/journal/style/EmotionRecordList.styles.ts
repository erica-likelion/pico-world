import styled from "styled-components/native";

export const ScrollContent = styled.View`
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.rem(16)};
  padding-bottom: ${({ theme }) => theme.rem(34)};
  width: 100%;
`;

export const ListContainer = styled.View`
  width: ${({ theme }) => theme.rem(343)};
  padding-bottom: ${({ theme }) => theme.rem(60)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const MonthHeader = styled.View`
  flex-direction: row;
  height: ${({ theme }) => theme.rem(18)};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
`;

export const IconButton = styled.Pressable`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
  justify-content: center;
  align-items: center;
`;

export const MonthLabel = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.grayscale.gray200};
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(14)};
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.28)};
`;

export const CardWrapper = styled.View`
  width: 100%;
  align-self: stretch;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.rem(16)};
`;

export const EmptyMonthContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: ${({ theme }) => theme.rem(24)};
  align-items: center;
`;

export const EmptyMonthText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(14)};
  line-height: ${({ theme }) => theme.rem(20)};
  letter-spacing: ${({ theme }) => theme.rem(-0.28)};
`;

export const Footer = styled.View`
  padding-top: ${({ theme }) => theme.rem(8)};
  padding-bottom: ${({ theme }) => theme.rem(24)};
  align-items: center;
  width: 100%;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray500};
  ${({ theme }) => theme.typography["title3-bold"]};
`;

export const ButtonWrapper = styled.View`
  margin-top: ${({ theme }) => theme.rem(16)};
`;
