import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(16)};
  align-self: stretch;
  padding-horizontal: ${({ theme }) => theme.rem(16)};
  margin-vertical: ${({ theme }) => theme.rem(24)};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

export const TitleStrong = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-bold"]};
`;

export const TitleText = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-medium"]};
`;

export const Time = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  text-align: right;
  ${({ theme }) => theme.typography["title4-medium"]};
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(10)};
  align-self: stretch;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-semibold"]};
`;

export const ActionsWrapper = styled.View`
  align-self: stretch;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.rem(8)};
  align-self: stretch;
`;
