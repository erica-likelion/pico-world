import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const EmotionRecordCardContainer = styled(TouchableOpacity)`
  display: flex;
  height: ${({ theme }) => theme.rem(193)};
  padding-top: ${({ theme }) => theme.rem(59)};
  padding-bottom: ${({ theme }) => theme.rem(58)};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 32px;
  position: relative;
  overflow: hidden;
`;

export const JournalHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${({ theme }) => theme.rem(18)};
  padding-left: ${({ theme }) => theme.rem(20)};
  padding-right: ${({ theme }) => theme.rem(20)};
  justify-content: space-between;
  align-items: center;
`;

export const JournalDateBox = styled.View`
  display: flex;
  width: ${({ theme }) => theme.rem(197.5)};
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.rem(6)};
  flex-shrink: 0;
  flex-direction: row;
`;

export const JournalEditDate = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(14)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.28)};
`;

export const JournalEditTime = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(12)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.24)};
`;
