import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: ${({ theme }) => theme.rem(36)};
  background-color: ${({ theme }) => theme.grayscale.gray950};
  padding: ${({ theme }) => theme.rem(16)};
  gap: ${({ theme }) => theme.rem(24)};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-semibold"]};
  text-align: center;
`;

export const DescriptionContainer = styled.View`
  gap: ${({ theme }) => theme.rem(12)};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  text-align: center;
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.rem(16)};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ theme }) => theme.rem(24)};
  letter-spacing: -0.32px;
`;

export const SubDescription = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  text-align: center;
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.rem(12)};
  font-style: normal;
  font-weight: 600;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: -0.24px;
`;

export const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.rem(8)};
`;
