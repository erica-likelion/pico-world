import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "styled-components";

type DateStyleMap = {
	[dateString: string]: {
		bg?: string;
		text?: string;
	};
};

const CustomDay = ({
	date,
	state,
	onPress,
	dayColors = {},
	selectedDate,
	setCurrentMonth,
}: {
	date?: { day: number; dateString: string; month: number; year: number };
	state?: string;
	onPress?: (date: any) => void;
	dayColors?: DateStyleMap;
	selectedDate?: string;
	setCurrentMonth: (monthString: string) => void;
}) => {
	if (!date) {
		return <View style={{ width: 38, height: 38 }} />;
	}

	const DAY_SIZE = 38;

	const isSelected = date.dateString === selectedDate;
	const isDisabled = state === "disabled";

	const customColor = dayColors[date.dateString];
	const backgroundColor = isSelected
		? "#191919"
		: customColor?.bg
			? customColor.bg
			: "transparent";

	const borderRadius = isSelected ? 10 : 40;

	const handlePress = () => {
		if (isDisabled) {
			const clickedDate = new Date(date.dateString);
			const newMonth = clickedDate.toISOString().slice(0, 7);
			setCurrentMonth(newMonth);
		}
		onPress?.(date);
	};

	return (
		<TouchableOpacity
			style={{
				width: DAY_SIZE,
				height: DAY_SIZE,
				backgroundColor,
				borderRadius,
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={handlePress}
		>
			<Text
				style={{
					color: isDisabled
						? "#525252"
						: isSelected
							? "#FFFFFF"
							: (customColor?.text ?? "#CECECE"),
				}}
			>
				{date.day}
			</Text>
		</TouchableOpacity>
	);
};

export function CalendarUI() {
	const theme = useTheme();
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [currentMonth, setCurrentMonth] = useState<string>("2025-10");
	const dayColors: DateStyleMap = {
		"2025-10-03": { bg: "#FF6F61", text: "#000000" },
		"2025-10-08": { bg: "#8A2BE2", text: "#FFFFFF" },
		"2025-10-07": { bg: "#FFD700", text: "#000000" },
		"2025-10-15": { bg: "#1E90FF", text: "#FFFFFF" },
		"2025-10-22": { bg: "#32CD32", text: "#FFFFFF" },
	};

	return (
		<View style={{ marginTop: -35, width: "100%", paddingHorizontal: 20 }}>
			<Calendar
				current={currentMonth}
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
					setSelectedDate(day.dateString);
				}}
				dayComponent={(props) => (
					<CustomDay
						{...props}
						dayColors={dayColors}
						selectedDate={selectedDate}
						setCurrentMonth={setCurrentMonth}
					/>
				)}
			/>
		</View>
	);
}
