import MenuIconSvg from "@/shared/assets/icons/menu.svg";
import styled from "styled-components/native";

export const Begin = styled.View`
  align-items: center;
`;

export const TodayHistoryContainer = styled.View<{ $isDetail?: boolean }>`
  display: flex;
  width: ${({ theme, $isDetail }) => ($isDetail ? "100%" : theme.rem(343))};
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin-top: ${({ theme, $isDetail }) => ($isDetail ? 0 : theme.rem(32))};
`;

export const DateTimeContainer = styled.View`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const DateTimeBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(6)};
`;

export const DateTimeTextDate = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  text-align: left;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(14)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.28)};
`;

export const DateTimeTextTime = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray500};
  text-align: left;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(12)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.24)};
`;

export const MyHistoryBox = styled.View`
  display: flex;
  padding: ${({ theme }) => theme.rem(20)};
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(16)};
  align-self: stretch;
  border-radius: 34px;
  background-color: rgba(53, 53, 53, 0.6);
  shadow-color: rgba(0, 0, 0, 0.32);
  shadow-offset: {
    width: 0;
    height: 7;
  }
  shadow-opacity: 0.32;
  shadow-radius: 14px;
  elevation: 10;
  z-index: 2;
  overflow: hidden;
`;

export const EditBox = styled.View`
  flex-direction: row;
  width: ${({ theme }) => theme.rem(303)};
  height: ${({ theme }) => theme.rem(18)};
  align-items: center;
  justify-content: center;
`;

export const EditDateBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(6)};
`;

export const EditDate = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(14)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.28)};
`;

export const EditTime = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray500};
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: ${({ theme }) => theme.rem(12)};
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.24)};
`;

export const MenuIcon = styled(MenuIconSvg)`
  width: ${({ theme }) => theme.rem(18)};
  height: ${({ theme }) => theme.rem(18)};
  color: ${({ theme }) => theme.grayscale.gray300};
`;

export const HistoryText = styled.Text`
  overflow: hidden;
  color: ${({ theme }) => theme.grayscale.gray50};
  text-overflow: ellipsis;
  font-family: "Pretendard-Regular";
  font-size: ${({ theme }) => theme.rem(16)};
  font-weight: 400;
  line-height: ${({ theme }) => theme.rem(24)};
  letter-spacing: ${({ theme }) => theme.rem(-0.32)};
  width: 100%;
  padding: ${({ theme }) => theme.rem(16)};
  text-align: left;
  align-self: stretch;
`;

export const CharacterCommentBox = styled.View<{ $mainColor: string }>`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.rem(16)};
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(12)};
  align-self: stretch;
  border-radius: ${({ theme }) => theme.rem(32)};
  background: ${({ $mainColor }) => $mainColor};
  overflow: hidden;
`;

export const CharacterNameBox = styled.View`
  display: flex;
  width: ${({ theme }) => theme.rem(36)};
  height: ${({ theme }) => theme.rem(36)};
  justify-content: center;
  align-items: center;
  border-radius: 77px;
  background-color: ${({ theme }) => theme.grayscale.gray900};
  z-index: 6;
`;

export const InnerShadow = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: "100%";
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0.3;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CharacterText = styled.Text<{ $textColor: string }>`
  flex: 1;
  color: ${({ $textColor }) => $textColor};
  ${({ theme }) => theme.typography.b3};
`;
