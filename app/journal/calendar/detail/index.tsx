import { getEmotionRecordByDate } from "@/features/home/model/emotionRecords";
import { TodayHistory } from "@/features/journal/ui";
import EditIcon from "@/shared/assets/icons/edit.svg";
import AIImageSrc from "@/shared/assets/images/chch.png";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function JournalCalendarDetail() {
	const router = useRouter();
	const { date } = useLocalSearchParams<{ date: string }>();

	const record = date ? getEmotionRecordByDate(date) : null;

	return (
		<View style={{ flex: 1 }}>
			<TopNav
				title="내 기록"
				leftIcon={true}
				rightIcon={<EditIcon />}
				onLeftPress={() => router.back()}
			/>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 34,
				}}
				showsVerticalScrollIndicator={false}
			>
				{record ? (
					<TodayHistory
						date={record.date.replace(/-/g, ". ")}
						time={record.time}
						emotion={record.emotion}
						text={record.text}
						AIImage={AIImageSrc}
					/>
				) : (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							marginTop: 100,
						}}
					>
						{/* TODO: 기록이 없을 때 표시할 컴포넌트 */}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
