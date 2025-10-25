import * as S from "@/features/home/style/TodayHistory.styles";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { BlurView } from "expo-blur";

interface TodayHistoryProps {
	date: string;
	time: string;
	emotionTitle: string;
	mainColor: string;
	subColor: string;
	historyText: string;
	AIComment: string;
}

export function TodayHistory({
	date,
	time,
	emotionTitle,
	mainColor,
	subColor,
	historyText,
	AIComment,
}: TodayHistoryProps) {
	return (
		<S.Begin>
			<S.TodayHistoryContainer>
				<S.MyHistoryBox>
					<BlurView
						intensity={38}
						tint="dark"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 0,
						}}
					/>
					<S.EditBox>
						<S.EditDateBox>
							<S.EditDate>{date}</S.EditDate>
							<S.EditTime>{time}</S.EditTime>
						</S.EditDateBox>
						<S.MenuIcon />
					</S.EditBox>
					<EmotionCard
						title={emotionTitle}
						mainColor={mainColor}
						subColor={subColor}
						isEditor
					/>
					<S.HistoryText numberOfLines={4} ellipsizeMode="tail">
						{historyText}
					</S.HistoryText>
				</S.MyHistoryBox>
				<S.CharacterCommentBox>
					<S.InnerShadow />
					<S.CharacterNameBox>
						<S.CharacterName>츠츠</S.CharacterName>
					</S.CharacterNameBox>
					<S.CharacterText>{AIComment}</S.CharacterText>
				</S.CharacterCommentBox>
			</S.TodayHistoryContainer>
		</S.Begin>
	);
}
