import * as S from "@/features/journal/style/EmotionRecordCard.styles";
import MenuIcon from "@/shared/assets/icons/menu.svg";
import * as EmotionCardStyles from "@/shared/style/EmotionCard.styles";
import type { EmotionRecord } from "@/shared/types/emotion";
import { format } from "date-fns";
import { useId, useState } from "react";
import { type LayoutChangeEvent, TouchableOpacity, View } from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

interface EmotionRecordCardProps {
	record: EmotionRecord;
	onMenuPress?: () => void;
	showDate?: boolean;
	dateTextColor?: string;
	timeTextColor?: string;
	onPress?: () => void;
}

export const EmotionRecordCard = ({
	record,
	onMenuPress,
	showDate = true,
	dateTextColor,
	timeTextColor,
	onPress,
}: EmotionRecordCardProps) => {
	const createdAt = new Date(record.created_at);
	const formattedDate = format(createdAt, "yyyy.MM.dd");
	const formattedTime = format(createdAt, "HH:mm");
	const gradientId = useId();
	const [cardSize, setCardSize] = useState({ width: 303, height: 193 });

	const handleMenuPress = () => {
		if (onMenuPress) {
			onMenuPress();
		}
	};

	return (
		<S.EmotionRecordCardContainer
			activeOpacity={0.9}
			disabled={!onPress}
			onPress={onPress}
			onLayout={(event: LayoutChangeEvent) => {
				const { width, height } = event.nativeEvent.layout;
				setCardSize({ width, height });
			}}
		>
			<Svg
				width={cardSize.width}
				height={cardSize.height}
				style={{ position: "absolute", top: 0, left: 0 }}
			>
				<Defs>
					<RadialGradient
						id={gradientId}
						cx="50%"
						cy="50%"
						rx="31.85%"
						ry="50%"
					>
						<Stop offset="0%" stopColor={record.main_color} />
						<Stop offset="100%" stopColor={record.sub_color} />
					</RadialGradient>
				</Defs>
				<Rect
					width={cardSize.width}
					height={cardSize.height}
					fill={`url(#${gradientId})`}
					rx="32"
				/>
			</Svg>

			{/* 상단 날짜/시간/메뉴 */}
			{showDate && (
				<View
					style={{
						position: "absolute",
						top: 18,
						left: 0,
						right: 0,
						width: "100%",
						zIndex: 10,
					}}
				>
					<S.JournalHeaderContainer>
						<S.JournalDateBox>
							<S.JournalEditDate
								style={dateTextColor ? { color: dateTextColor } : undefined}
							>
								{formattedDate}
							</S.JournalEditDate>
							<S.JournalEditTime
								style={timeTextColor ? { color: timeTextColor } : undefined}
							>
								{formattedTime}
							</S.JournalEditTime>
						</S.JournalDateBox>
						{onMenuPress && (
							<TouchableOpacity onPress={handleMenuPress} activeOpacity={0.8}>
								<MenuIcon
									width={18}
									height={18}
									color="rgba(255, 255, 255, 0.7)"
								/>
							</TouchableOpacity>
						)}
					</S.JournalHeaderContainer>
				</View>
			)}

			{/* 감정 레이블 */}
			<EmotionCardStyles.EmotionCardTextBox>
				<EmotionCardStyles.EmotionCardText>
					{record.emotion_name}
				</EmotionCardStyles.EmotionCardText>
			</EmotionCardStyles.EmotionCardTextBox>
		</S.EmotionRecordCardContainer>
	);
};
