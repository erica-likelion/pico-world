import { getFeedback } from "@/entities/character/api/feedback";
import * as S from "@/features/journal/style/TodayHistory.styles";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import type { EmotionRecord } from "@/shared/types/emotion";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
import { Animated, Easing } from "react-native";
import { useTheme } from "styled-components/native";

interface TodayHistoryProps {
	record: EmotionRecord;
	AIImage?: ImageSourcePropType;
}

export function TodayHistory({ record, AIImage }: TodayHistoryProps) {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { data: feedbackData } = useQuery({
		queryKey: ["feedback", record.record_id],
		queryFn: () => getFeedback(record.record_id),
		enabled: !!record.record_id,
	});
	console.log("feedbackData:", feedbackData);
	// 애니메이션 값들
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const characterSlideAnim = useRef(new Animated.Value(30)).current;
	const characterFadeAnim = useRef(new Animated.Value(0)).current;
	const theme = useTheme();

	const createdAt = new Date(record.created_at);
	const displayDate = format(createdAt, "yyyy.MM.dd");
	const displayTime = format(createdAt, "HH:mm");
	const displayHistoryText = record.record;
	const displayAIComment =
		feedbackData?.aiReply || "피드백을 생성하고 있습니다...";

	console.log(displayAIComment);

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
						onMenuPress={() => bottomSheetRef.current?.present()}
						record={record}
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
					<S.CharacterCommentBox $mainColor={record.main_color}>
						<S.InnerShadow />
						<S.CharacterNameBox>
							<S.CharacterImage source={AIImage} resizeMode="contain" />
						</S.CharacterNameBox>
						<S.CharacterText $textColor={record.text_color}>
							{displayAIComment}
						</S.CharacterText>
					</S.CharacterCommentBox>
				</Animated.View>
			</S.TodayHistoryContainer>
		</S.Begin>
	);
}
