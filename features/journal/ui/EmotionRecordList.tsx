import { getAllEmotionRecords } from "@/features/journal/model/emotionRecords";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import { Button } from "@/shared/ui/Button";
import { useMemo, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

export const EmotionRecordList = () => {
	const records = useMemo(() => getAllEmotionRecords(), []);
	const scrollViewRef = useRef<ScrollView>(null);

	const scrollToTop = () => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
	};

	if (records.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: "white", fontSize: 16 }}>기록이 없습니다.</Text>
			</View>
		);
	}

	return (
		<ScrollView
			ref={scrollViewRef}
			contentContainerStyle={{
				alignItems: "center",
				paddingHorizontal: 16,
				paddingTop: 0,
				paddingBottom: 34,
			}}
			showsVerticalScrollIndicator={false}
		>
			{records.map((record) => (
				<View key={record.id} style={{ width: "100%", marginBottom: 16 }}>
					<EmotionRecordCard
						record={record}
						onMenuPress={() => {
							// TODO: 메뉴 기능 구현
						}}
					/>
				</View>
			))}
			<View style={{ paddingTop: 8, paddingBottom: 24, alignItems: "center" }}>
				<Text style={{ color: "white", fontSize: 14, opacity: 0.6 }}>
					모든 기록을 확인했습니다.
				</Text>
				<View style={{ marginTop: 16 }}>
					<Button
						text="위로 돌아가기"
						size="small"
						color="gray"
						onPress={scrollToTop}
					/>
				</View>
			</View>
		</ScrollView>
	);
};
