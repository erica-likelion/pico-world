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
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.32px;
  text-align: center;
`;

export const SubDescription = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
  text-align: center;
`;

export const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.rem(8)};
`;
