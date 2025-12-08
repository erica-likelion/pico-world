import { getFeedback } from "@/entities/character/api/feedback";
import type { CharacterName } from "@/entities/character/model/characterMessages";
import { getCharacterImage } from "@/entities/character/utils/getCharacterImage";
import * as S from "@/features/home/style/TodayHistory.styles";
import { getRecordById } from "@/features/record/api/getRecordById";
import { useFeedbackTimer } from "@/shared/hooks/useFeedbackTimer";
import { useAuthStore } from "@/shared/store/auth";
import { useFeedbackTimerStore } from "@/shared/store/feedbackTimer";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import {
	ActivityIndicator,
	Animated,
	Easing,
	TouchableOpacity,
	View,
} from "react-native";

interface TodayHistoryProps {
	recordId: number;
	onMenuPress: () => void;
}

export function TodayHistory({ recordId, onMenuPress }: TodayHistoryProps) {
	const router = useRouter();
	const { isLoggedIn } = useAuthStore();
	const journalIdString = String(recordId);
	const { isWaitingForFeedback, remainingSeconds } =
		useFeedbackTimer(journalIdString);
	const { characterName: savedCharacterName } = useFeedbackTimerStore();
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

	const characterImage = useMemo(() => {
		if (isWaitingForFeedback || isFeedbackLoading) {
			return getCharacterImage(savedCharacterName as CharacterName);
		}
		return getCharacterImage(feedbackData?.characterName as CharacterName);
	}, [
		feedbackData?.characterName,
		isWaitingForFeedback,
		isFeedbackLoading,
		savedCharacterName,
	]);

	const displayAIComment = useMemo(() => {
		if (isWaitingForFeedback) {
			return `기록을 읽고 답장을 쓰는 중... (${remainingSeconds}초)`;
		}
		if (isFeedbackLoading) {
			return "답장을 가져오는 중...";
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
	const displayEmotionTitle = record.emotion_name;
	const displayMainColor = record.main_color;
	const displaySubColor = record.sub_color;
	const displayTextColor = record.text_color;
	const displayHistoryText = record.record;

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
							{characterImage ? (
								<S.CharacterImage source={characterImage} resizeMode="cover" />
							) : (
								<ActivityIndicator size="small" />
							)}
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
