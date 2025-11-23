import styled from "styled-components/native";

export const LogoutModalContainer = styled.View`
  padding: ${({ theme }) => theme.rem(16)};
  background-color: ${({ theme }) => theme.grayscale.gray950};
  border-radius: 36px;
  justify-items: center;
  align-items: center;
  gap: ${({ theme }) => theme.rem(25)};
`;

export const LogoutTitle = styled.Text`
  ${({ theme }) => theme.typography["title2-semibold"]};
  color: ${({ theme }) => theme.grayscale.white};
  text-align: center;
`;

export const LogoutModalText = styled.Text`
  ${({ theme }) => theme.typography["title2-medium"]};
  color: ${({ theme }) => theme.grayscale.gray50};
  text-align: center;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: ${({ theme }) => theme.rem(6)};
`;
