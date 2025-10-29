import styled from "styled-components/native";

export const LogoutModalContainer = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.rem(24)} 0;
  background-color: ${({ theme }) => theme.grayscale.gray900};
  border-radius: ${({ theme }) => theme.rem(12)};
  justify-items: center;
  align-items: center;
  gap: ${({ theme }) => theme.rem(30)};
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
