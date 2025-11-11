import type { EmotionRecord } from "@/features/home/model/emotionRecords";
import * as S from "@/features/journal/style/TodayHistory.styles";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import { useEffect, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
import { Animated, Easing } from "react-native";
import { useTheme } from "styled-components/native";

interface TodayHistoryProps extends Partial<EmotionRecord> {
	date?: string;
	time?: string;
	emotionTitle?: string;
	mainColor?: string;
	subColor?: string;
	textColor?: string;
	historyText?: string;
	AIImage?: ImageSourcePropType;
	AIComment?: string;
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
	date,
	time,
	emotion,
	text,
	emotionTitle,
	mainColor,
	subColor,
	textColor,
	historyText,
	AIImage,
	AIComment,
}: TodayHistoryProps) {
	// 애니메이션 값들
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const characterSlideAnim = useRef(new Animated.Value(30)).current;
	const characterFadeAnim = useRef(new Animated.Value(0)).current;
	const theme = useTheme();

	// 기존 props가 있으면 사용하고, 없으면 emotion record 데이터 사용
	const displayDate = date || "날짜 없음";
	const displayTime = time || "시간 없음";
	const displayEmotionTitle = emotionTitle || emotion?.label || "감정 없음";
	const displayMainColor = mainColor || emotion?.mainColor || "#FF685B";
	const displaySubColor = subColor || emotion?.subColor || "#F3E9DA";
	const displayTextColor = textColor || "#FFFFFF";
	const displayHistoryText = historyText || text || "기록이 없습니다.";
	const displayAIComment = AIComment || generateAIComment(emotion?.label || "");

	// 날짜 형식 변환 (YYYY. MM. DD -> YYYY-MM-DD)
	const formatDateForRecord = (dateStr: string): string => {
		if (dateStr === "날짜 없음") return new Date().toISOString().split("T")[0];
		return dateStr.replace(/\. /g, "-");
	};

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
		//todo: 메뉴 기능 구현
	};

	// EmotionRecord 형식으로 변환
	const recordData: EmotionRecord = {
		id: emotion?.label || "",
		date: formatDateForRecord(displayDate),
		time: displayTime || "",
		emotion: {
			label: displayEmotionTitle,
			mainColor: displayMainColor,
			subColor: displaySubColor,
		},
		text: displayHistoryText,
		isFriendOnly: false,
		createdAt: new Date().toISOString(),
	};

	return (
		<S.Begin>
			<S.TodayHistoryContainer $isDetail={true}>
				{/* 날짜/시간 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: fadeInAnim,
						transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
						zIndex: 2,
						width: "100%",
						marginBottom: 10,
						alignItems: "flex-start",
					}}
				>
					<S.DateTimeContainer>
						<S.DateTimeBox>
							<S.DateTimeTextDate>{displayDate}</S.DateTimeTextDate>
							<S.DateTimeTextTime>{displayTime}</S.DateTimeTextTime>
						</S.DateTimeBox>
					</S.DateTimeContainer>
				</Animated.View>

				{/* 감정 기록 카드 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: fadeInAnim,
						transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
						zIndex: 2,
						width: "100%",
					}}
				>
					<EmotionRecordCard
						record={recordData}
						showDate={false}
						dateTextColor={theme.grayscale.gray400}
						timeTextColor={theme.grayscale.gray500}
					/>
				</Animated.View>

				{/* 기록 텍스트 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: fadeInAnim,
						transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
						zIndex: 2,
						width: "100%",
						alignSelf: "stretch",
						marginTop: 16,
					}}
				>
					<S.HistoryText numberOfLines={4} ellipsizeMode="tail">
						{displayHistoryText}
					</S.HistoryText>
				</Animated.View>

				{/* 캐릭터 코멘트 박스 - 애니메이션 적용 */}
				<Animated.View
					style={{
						opacity: characterFadeAnim,
						transform: [{ translateY: characterSlideAnim }],
						zIndex: 1,
						width: "100%",
						alignSelf: "stretch",
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
