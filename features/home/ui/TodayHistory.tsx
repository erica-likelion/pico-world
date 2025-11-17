import * as S from "@/features/home/style/TodayHistory.styles";
import type { EmotionRecord } from "@/shared/types/emotion";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
import { Animated, Easing, TouchableOpacity } from "react-native";

interface TodayHistoryProps {
	record: EmotionRecord;
	onMenuPress: () => void;
	AIImage?: ImageSourcePropType;
}

// AI 코멘트 생성 함수
const generateAIComment = (emotion: string): string => {
	const comments: { [key: string]: string } = {
		기쁨: "오호, 기쁘다고? 뭔가 좋은 일이 있었나 보네. 그래도 너무 들뜨지는 말고 차분하게 해.",
		평온: "평온함이라... 너에게는 이런 날이 제일 어울려. 조용히 지내는 게 네 스타일이니까.",
		우울: "우울하다고? 그런 날도 있는 법이지. 하지만 너무 오래 끌지는 말고 털어내.",
		설렘: "설렌다고? 뭔가 기대되는 일이 있나 보네. 그래도 기대치를 너무 높이지는 마.",
		만족: "만족스럽다니? 드디어 사람 구실 좀 했네. 그래, 이런 날이 있어야 균형이 맞지.",
	};
	return (
		comments[emotion] ||
		"흠, 뭔가 복잡한 감정이구나. 그래도 솔직하게 표현하는 건 좋아."
	);
};

export function TodayHistory({
	record,
	onMenuPress,
	AIImage,
}: TodayHistoryProps) {
	const router = useRouter();
	// 애니메이션 값들
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const characterSlideAnim = useRef(new Animated.Value(30)).current;
	const characterFadeAnim = useRef(new Animated.Value(0)).current;

	const createdAt = new Date(record.created_at);
	const displayDate = format(createdAt, "yyyy.MM.dd");
	const displayTime = format(createdAt, "HH:mm");
	const displayEmotionTitle = record.emotion_name;
	const displayMainColor = record.main_color;
	const displaySubColor = record.sub_color;
	const displayTextColor = record.text_color;
	const displayHistoryText = record.record;
	const displayAIComment = generateAIComment(record.emotion_name);

	// 컴포넌트 마운트 시 애니메이션 실행
	useEffect(() => {
		// 애니메이션 초기화
		fadeInAnim.setValue(0);
		slideUpAnim.setValue(50);
		scaleAnim.setValue(0.9);
		characterSlideAnim.setValue(30);
		characterFadeAnim.setValue(0);

		// 감정 기록 박스 애니메이션 (동시 실행)
		Animated.parallel([
			Animated.timing(fadeInAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true,
			}),
			Animated.timing(slideUpAnim, {
				toValue: 0,
				duration: 600,
				easing: Easing.out(Easing.back(1.2)),
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.back(1.1)),
				useNativeDriver: true,
			}),
		]).start();

		// 캐릭터 코멘트 박스 애니메이션 (0.3초 후 시작)
		const timer = setTimeout(() => {
			Animated.parallel([
				Animated.timing(characterFadeAnim, {
					toValue: 1,
					duration: 500,
					easing: Easing.out(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(characterSlideAnim, {
					toValue: 0,
					duration: 500,
					easing: Easing.out(Easing.back(1.2)),
					useNativeDriver: true,
				}),
			]).start();
		}, 300);

		return () => clearTimeout(timer);
	}, [
		fadeInAnim,
		scaleAnim,
		slideUpAnim,
		characterFadeAnim,
		characterSlideAnim,
	]); // date나 emotion이 바뀔 때마다 애니메이션 재실행

	const handleMenuPress = () => {
		onMenuPress();
	};

	return (
		<S.Begin>
			<S.TodayHistoryContainer>
				{/* 감정 기록 박스 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: fadeInAnim,
						transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
						zIndex: 2,
					}}
				>
					<S.MyHistoryBox
						onPress={() =>
							router.push(`/journal/detail?id=${record.record_id}`)
						}
					>
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
								<S.EditDate>{displayDate}</S.EditDate>
								<S.EditTime>{displayTime}</S.EditTime>
							</S.EditDateBox>
							<TouchableOpacity onPress={handleMenuPress} activeOpacity={0.8}>
								<S.MenuIcon />
							</TouchableOpacity>
						</S.EditBox>
						<EmotionCard
							title={displayEmotionTitle}
							mainColor={displayMainColor}
							subColor={displaySubColor}
						/>
						<S.HistoryText numberOfLines={4} ellipsizeMode="tail">
							{displayHistoryText}
						</S.HistoryText>
					</S.MyHistoryBox>
				</Animated.View>
				{/* 캐릭터 코멘트 박스 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: characterFadeAnim,
						transform: [{ translateY: characterSlideAnim }],
						zIndex: 1,
					}}
				>
					<S.CharacterCommentBox $mainColor={displayMainColor}>
						<S.InnerShadow />
						<S.CharacterNameBox>
							<S.CharacterImage source={AIImage} resizeMode="contain" />
						</S.CharacterNameBox>
						<S.CharacterText $textColor={displayTextColor}>
							{displayAIComment}
						</S.CharacterText>
					</S.CharacterCommentBox>
				</Animated.View>
			</S.TodayHistoryContainer>
		</S.Begin>
	);
}
