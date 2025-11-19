import * as S from "@/features/home/style/CalendarUI.styles";
import type { EmotionRecord } from "@/shared/types/emotion";
import { format } from "date-fns";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";

type DateStyleMap = {
	[dateString: string]: {
		bg?: string;
		text?: string;
	};
};

const getTodayKST = () => {
	const now = new Date();
	const utc = now.getTime() + now.getTimezoneOffset() * 60000;
	const kstOffset = 9 * 60 * 60000;
	const kstDate = new Date(utc + kstOffset);
	return format(kstDate, "yyyy-MM-dd");
};

const CustomDay = ({
	date,
	state,
	onPress,
	dayColors = {},
	today,
}: {
	date?: {
		day: number;
		dateString: string;
		month: number;
		year: number;
		timestamp: number;
	};
	state?: string;
	onPress?: (date: DateData) => void;
	dayColors?: DateStyleMap;
	today: string;
}) => {
	if (!date) {
		return <View style={{ width: 38, height: 38 }} />;
	}

	const DAY_SIZE = 38;

	const isToday = date.dateString === today;
	const isDisabled = state === "disabled";

	const isFuture =
		new Date(date.dateString).getTime() > new Date(today).getTime();

	const customColor = dayColors[date.dateString];
	const backgroundColor = customColor?.bg
		? customColor.bg
		: isToday
			? "#191919"
			: "transparent";

	const borderRadius = isToday ? 10 : 40;

	const handlePress = () => {
		if (isDisabled || isFuture) return;
		onPress?.(date);
	};

	return (
		<TouchableOpacity
			disabled={isFuture}
			style={{
				width: DAY_SIZE,
				height: DAY_SIZE,
				backgroundColor,
				borderRadius,
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={handlePress}
			activeOpacity={0.8}
		>
			<Text
				style={{
					color: isDisabled
						? "#525252"
						: customColor?.text
							? customColor?.text
							: isToday
								? "#FFFFFF"
								: "#CECECE",
				}}
			>
				{date.day}
			</Text>
		</TouchableOpacity>
	);
};

const CustomHeader = ({ date }: { date: Date }) => {
	const formatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<S.TitleBox>
				<S.TitleText>{formatted}</S.TitleText>
			</S.TitleBox>
		</View>
	);
};

interface CalendarUIProps {
	isTodayHistory: boolean;
	onDateSelect?: (dateString: string) => void;
	emotionRecords: EmotionRecord[];
	currentMonth: string;
	onMonthChange: (month: string) => void;
}

export function CalendarUI({
	isTodayHistory,
	onDateSelect,
	emotionRecords,
	currentMonth,
	onMonthChange,
}: CalendarUIProps) {
	const today = getTodayKST();

	const dayColors: DateStyleMap = {};
	emotionRecords.forEach((record) => {
		const recordDate = new Date(record.created_at);
		const utc = recordDate.getTime() + recordDate.getTimezoneOffset() * 60000;
		const kstOffset = 9 * 60 * 60000;
		const kstDate = new Date(utc + kstOffset);
		const date = format(kstDate, "yyyy-MM-dd");

		dayColors[date] = {
			bg: record.main_color,
			text: record.text_color,
		};
	});

	return (
		<View
			style={[
				{ width: "100%" },
				isTodayHistory ? { marginTop: 32 } : { marginTop: -35 },
			]}
		>
			<Calendar
				current={currentMonth}
				renderHeader={(date) => <CustomHeader date={date} />}
				style={{
					width: "100%",
					borderRadius: 40,
					paddingLeft: 10,
					paddingRight: 10,
					paddingBottom: 19,
					paddingTop: 10,
				}}
				theme={{
					backgroundColor: "transparent",
					calendarBackground: "rgba(32, 32, 32)",
					dayTextColor: "#CECECE",
					todayTextColor: "#FFFFFF",
					textDisabledColor: "#525252",
					arrowColor: "#CECECE",
					monthTextColor: "#CECECE",
					indicatorColor: "#CECECE",
					textSectionTitleColor: "#909090",
				}}
				onDayPress={(day) => {
					onDateSelect?.(day.dateString);
				}}
				onMonthChange={(month) => {
					const monthStr = `${month.year}-${String(month.month).padStart(
						2,
						"0",
					)}`;
					onMonthChange(monthStr);
				}}
				dayComponent={(props) => (
					<CustomDay {...props} dayColors={dayColors} today={today} />
				)}
			/>
		</View>
	);
}
