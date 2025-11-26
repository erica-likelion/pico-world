import { getFeedback } from "@/entities/character/api/feedback";
import * as S from "@/features/journal/style/TodayHistory.styles";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import { getRecordById } from "@/features/record/api/getRecordById";
import { useFeedbackTimer } from "@/shared/hooks/useFeedbackTimer";
import { useAuthStore } from "@/shared/store/auth";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
import { ActivityIndicator, Animated, Easing, View } from "react-native";
import { useTheme } from "styled-components/native";

interface TodayHistoryProps {
	recordId: number;
	AIImage?: ImageSourcePropType;
}

export function TodayHistory({ recordId, AIImage }: TodayHistoryProps) {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const theme = useTheme();
	const { isLoggedIn } = useAuthStore();
	const journalIdString = String(recordId);
	const { isWaitingForFeedback, remainingSeconds } =
		useFeedbackTimer(journalIdString);

	const { data: record, isLoading: isRecordLoading } = useQuery({
		queryKey: ["emotionRecord", recordId],
		queryFn: () => getRecordById(recordId.toString()),
		enabled: !!recordId && !!isLoggedIn,
	});

	const { data: feedbackData, isLoading: isFeedbackLoading } = useQuery({
		queryKey: ["feedback", recordId],
		queryFn: () => getFeedback(recordId),
		enabled: !!record && !!isLoggedIn && !isWaitingForFeedback,
	});

	// 애니메이션 값들
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const characterSlideAnim = useRef(new Animated.Value(30)).current;
	const characterFadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!isRecordLoading && record) {
			fadeInAnim.setValue(0);
			slideUpAnim.setValue(50);
			scaleAnim.setValue(0.9);
			characterSlideAnim.setValue(30);
			characterFadeAnim.setValue(0);

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
		}
	}, [
		isRecordLoading,
		record,
		fadeInAnim,
		scaleAnim,
		slideUpAnim,
		characterFadeAnim,
		characterSlideAnim,
	]);

	const displayAIComment = useMemo(() => {
		if (isWaitingForFeedback) {
			return `기록을 읽고 답장을 쓰는 중... (${remainingSeconds}초)`;
		}
		if (isFeedbackLoading) {
			return "피드백을 생성하고 있습니다...";
		}
		return feedbackData?.aiReply || "오늘 하루도 수고했어.";
	}, [isWaitingForFeedback, remainingSeconds, isFeedbackLoading, feedbackData]);

	if (isRecordLoading) {
		return (
			<View style={{ height: 300, justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!record) {
		return null;
	}

	const createdAt = new Date(record.created_at);
	const displayDate = format(createdAt, "yyyy.MM.dd");
	const displayTime = format(createdAt, "HH:mm");
	const displayHistoryText = record.record;

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
					<S.HistoryText>{displayHistoryText}</S.HistoryText>
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
