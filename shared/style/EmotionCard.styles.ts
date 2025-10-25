import styled from "styled-components/native";

export const EmotionCardContainer = styled.View<{ $subColor: string }>`
  position: relative;
  display: flex;
  width: ${({ theme }) => theme.rem(303)};
  height: ${({ theme }) => theme.rem(193)};
  padding: ${({ theme }) => theme.rem(58.5)} 0;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 32px;
  background-color: ${({ $subColor }) => $subColor};
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
