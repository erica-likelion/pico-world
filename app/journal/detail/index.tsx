import { getEmotionRecord } from "@/features/journal/api/emotion";
import { TodayHistory } from "@/features/journal/ui";
import EditIcon from "@/shared/assets/icons/edit.svg";
import AIImageSrc from "@/shared/assets/images/chch.png";
import type { EmotionRecord } from "@/shared/types/emotion";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function JournalDetail() {
	const router = useRouter();
	const { date } = useLocalSearchParams<{ date: string }>();
	const [record, setRecord] = useState<EmotionRecord | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (date) {
			const fetchRecord = async () => {
				setLoading(true);
				const fetchedRecord = await getEmotionRecord(date);
				setRecord(fetchedRecord);
				setLoading(false);
			};
			fetchRecord();
		}
	}, [date]);

	const handleEditPress = () => {
		if (date) {
			router.push(`/record/edit?date=${date}` as any);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<TopNav
				title="내 기록"
				leftIcon={true}
				rightIcon={<EditIcon />}
				onLeftPress={() => router.back()}
				onRightPress={handleEditPress}
			/>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 34,
				}}
				showsVerticalScrollIndicator={false}
			>
				{loading ? (
					<ActivityIndicator style={{ marginTop: 100 }} />
				) : record ? (
					<TodayHistory record={record} AIImage={AIImageSrc} />
				) : (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							marginTop: 100,
						}}
					>
						<Text style={{ color: "white" }}>기록이 없습니다.</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
