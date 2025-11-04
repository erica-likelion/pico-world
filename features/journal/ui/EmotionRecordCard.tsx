import type { EmotionRecord } from "@/features/home/model/emotionRecords";
import * as JournalS from "@/features/journal/style/EmotionRecordCard.styles";
import MenuIcon from "@/shared/assets/icons/menu.svg";
import * as EmotionCardStyles from "@/shared/style/EmotionCard.styles";
import { useId, useState } from "react";
import { LayoutChangeEvent, TouchableOpacity, View } from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

interface EmotionRecordCardProps {
	record: EmotionRecord;
	onMenuPress?: () => void;
	showDate?: boolean;
	dateTextColor?: string;
	timeTextColor?: string;
}

export const EmotionRecordCard = ({
	record,
	onMenuPress,
	showDate = true,
	dateTextColor,
	timeTextColor,
}: EmotionRecordCardProps) => {
	const formattedDate = record.date.replace(/-/g, ". ");
	const gradientId = useId();
	const [cardSize, setCardSize] = useState({ width: 303, height: 193 });

	const handleMenuPress = () => {
		if (onMenuPress) {
			onMenuPress();
		}
	};

	return (
		<View
			style={{
				display: "flex",
				height: 193,
				paddingTop: 59,
				paddingBottom: 58,
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "stretch",
				borderRadius: 32,
				position: "relative",
				overflow: "hidden",
			}}
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
						<Stop offset="0%" stopColor={record.emotion.mainColor} />
						<Stop offset="100%" stopColor={record.emotion.subColor} />
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
				<View style={{ width: "100%", zIndex: 10 }}>
					<JournalS.JournalHeaderContainer>
						<JournalS.JournalDateBox>
							<JournalS.JournalEditDate
								style={dateTextColor ? { color: dateTextColor } : undefined}
							>
								{formattedDate}
							</JournalS.JournalEditDate>
							<JournalS.JournalEditTime
								style={timeTextColor ? { color: timeTextColor } : undefined}
							>
								{record.time}
							</JournalS.JournalEditTime>
						</JournalS.JournalDateBox>
						{onMenuPress && (
							<TouchableOpacity onPress={handleMenuPress} activeOpacity={0.8}>
								<MenuIcon
									width={18}
									height={18}
									color="rgba(255, 255, 255, 0.7)"
								/>
							</TouchableOpacity>
						)}
					</JournalS.JournalHeaderContainer>
				</View>
			)}

			{/* 감정 레이블 */}
			<EmotionCardStyles.EmotionCardTextBox>
				<EmotionCardStyles.EmotionCardText>
					{record.emotion.label}
				</EmotionCardStyles.EmotionCardText>
			</EmotionCardStyles.EmotionCardTextBox>
		</View>
	);
};
