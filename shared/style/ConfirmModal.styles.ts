import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: ${({ theme }) => theme.rem(36)};
  background-color: ${({ theme }) => theme.grayscale.gray950};
  padding: ${({ theme }) => theme.rem(16)};
  gap: ${({ theme }) => theme.rem(25)};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-semibold"]};
  text-align: center;
`;

export const DescriptionContainer = styled.View`
  gap: ${({ theme }) => theme.rem(8)};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.b2};
  text-align: center;
`;

export const SubDescription = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title4-semibold"]};
  text-align: center;
`;

export const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.rem(8)};
`;
