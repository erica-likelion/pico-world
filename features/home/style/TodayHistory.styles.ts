import MenuIconSvg from "@/shared/assets/icons/menu.svg";
import styled from "styled-components/native";

export const Begin = styled.View`
  align-items: center;
`;

export const TodayHistoryContainer = styled.View`
  display: flex;
  width: ${({ theme }) => theme.rem(343)};
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin-top: ${({ theme }) => theme.rem(32)};
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
  justify-content: space-between;
`;

export const EditDateBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(6)};
`;

export const EditDate = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-medium"]};
`;

export const EditTime = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray300};
  ${({ theme }) => theme.typography["title4-medium"]};
`;

export const MenuIcon = styled(MenuIconSvg)`
  width: ${({ theme }) => theme.rem(18)};
  height: ${({ theme }) => theme.rem(18)};
  color: ${({ theme }) => theme.grayscale.gray300};
`;

export const HistoryText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray50};
  ${({ theme }) => theme.typography.b3};
`;

export const CharacterCommentBox = styled.View<{ $mainColor: string }>`
  display: flex;
  flex-direction: row;
  width: ${({ theme }) => theme.rem(312)};
  padding: ${({ theme }) => theme.rem(46)} ${({ theme }) => theme.rem(16)}
    ${({ theme }) => theme.rem(16)} ${({ theme }) => theme.rem(16)};
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(12)};
  border-radius: 0 0 34px 34px;
  background: ${({ $mainColor }) => $mainColor};
  margin-top: -${({ theme }) => theme.rem(32)};
  shadow-color: rgba(255, 255, 255);
  shadow-offset: {
    width: 0;
    height: -6;
  }
  shadow-opacity: 0.3;
  shadow-radius: 19.1px;
  elevation: 10;
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
  width: ${({ theme }) => theme.rem(232)};
  color: ${({ $textColor }) => $textColor};
  ${({ theme }) => theme.typography.b3};
`;
