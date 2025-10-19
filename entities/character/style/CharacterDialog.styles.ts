import styled from "styled-components/native";

export const DialogContainer = styled.View`
  z-index: 4;
  display: flex;
  flex-direction: row;
  width: ${({ theme }) => theme.rem(343)};
  padding: ${({ theme }) => `${theme.rem(16)} ${theme.rem(0)}`};
  gap: ${({ theme }) => theme.rem(8)};
`;

export const CharacterNameBox = styled.View`
  display: flex;
  width: ${({ theme }) => theme.rem(36)};
  height: ${({ theme }) => theme.rem(36)};
  justify-content: center;
  align-items: center;
  border-radius: 77px;
  background-color: ${({ theme }) => theme.grayscale.gray900};
`;

export const CharacterName = styled.Text`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title4-semibold"]};
`;

export const CharacterDialogBox = styled.View`
  display: flex;
  padding: ${({ theme }) => `${theme.rem(10)} ${theme.rem(16)}`};
  gap: ${({ theme }) => theme.rem(8)};
  background-color: ${({ theme }) => theme.grayscale.gray800};
  border-radius: 20px 20px 20px 4px;
  flex: 1 0 0;
`;

export const CharacterDialogText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray100};
  ${({ theme }) => theme.typography.b3};
`;
