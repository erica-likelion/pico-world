import * as S from "@/features/home/style/TodayHistory.styles";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";

interface TodayHistoryProps {
	date: string;
	time: string;
	emotionTitle: string;
	mainColor: string;
	subColor: string;
	textColor: string;
	historyText: string;
	AIComment: string;
}

export function TodayHistory({
	date,
	time,
	emotionTitle,
	mainColor,
	subColor,
	textColor,
	historyText,
	AIComment,
}: TodayHistoryProps) {
	//   const [isPopoverVisible, setIsPopoverVisible] = useState(false);

	const handleMenuPress = () => {
		// setIsPopoverVisible(!isPopoverVisible);
		// console.log("Menu pressed", isPopoverVisible);
	};

	// const handleEditSelect = () => {
	// 	setIsPopoverVisible(false);
	// 	router.push({ pathname: "/home", params: { id: "1" } });
	// };

	// const handleDeleteSelect = () => {
	// 	setIsPopoverVisible(false);
	// 	console.log("Delete selected");
	// };
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
						<TouchableOpacity onPress={handleMenuPress} activeOpacity={0.8}>
							<S.MenuIcon />
						</TouchableOpacity>
					</S.EditBox>
					<EmotionCard
						title={emotionTitle}
						mainColor={mainColor}
						subColor={subColor}
					/>
					<S.HistoryText numberOfLines={4} ellipsizeMode="tail">
						{historyText}
					</S.HistoryText>
				</S.MyHistoryBox>
				<S.CharacterCommentBox $mainColor={mainColor}>
					<S.InnerShadow />
					<S.CharacterNameBox>
						<S.CharacterName>츠츠</S.CharacterName>
					</S.CharacterNameBox>
					<S.CharacterText $textColor={textColor}>{AIComment}</S.CharacterText>
				</S.CharacterCommentBox>
			</S.TodayHistoryContainer>
		</S.Begin>
	);
}
