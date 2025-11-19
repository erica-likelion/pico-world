import { getFeedback } from "@/entities/character/api/feedback";
import { getRecordById } from "@/features/record/api/getRecordById";
import * as S from "@/features/home/style/TodayHistory.styles";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
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
	AIImage?: ImageSourcePropType;
}

export function TodayHistory({
	recordId,
	onMenuPress,
	AIImage,
}: TodayHistoryProps) {
	const router = useRouter();

	const { data: record, isLoading: isRecordLoading } = useQuery({
		queryKey: ["emotionRecord", recordId],
		queryFn: () => getRecordById(recordId.toString()),
		enabled: !!recordId,
	});

	const { data: feedbackData, isLoading: isFeedbackLoading } = useQuery({
		queryKey: ["feedback", recordId],
		queryFn: () => getFeedback(recordId),
		enabled: !!record, // Enable only after record is fetched
	});

	// 애니메이션 값들
	const fadeInAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const characterSlideAnim = useRef(new Animated.Value(30)).current;
	const characterFadeAnim = useRef(new Animated.Value(0)).current;

	// 컴포넌트 마운트 시 애니메이션 실행
	useEffect(() => {
		if (!isRecordLoading && record) {
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

	if (isRecordLoading) {
		return (
			<View style={{ height: 300, justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!record) {
		return null; // Or some error/empty state
	}

	const createdAt = new Date(record.created_at);
	const displayDate = format(createdAt, "yyyy.MM.dd");
	const displayTime = format(createdAt, "HH:mm");
	const displayEmotionTitle = record.emotion_name;
	const displayMainColor = record.main_color;
	const displaySubColor = record.sub_color;
	const displayTextColor = record.text_color;
	const displayHistoryText = record.record;
	const displayAIComment = isFeedbackLoading
		? "피드백을 생성하고 있습니다..."
		: feedbackData?.aiReply || "오늘 하루도 수고했어.";

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
