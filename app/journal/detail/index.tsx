import { fetchGreeting } from "@/entities/character/api/greeting";
import { Character } from "@/entities/character/model/character";
import type { CharacterName } from "@/entities/character/model/characterMessages";
import { getEmotionRecord } from "@/features/journal/api/emotion";
import { TodayHistory } from "@/features/journal/ui";
import EditIcon from "@/shared/assets/icons/edit.svg";
import type { EmotionRecord } from "@/shared/types/emotion";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { TopNav } from "@/widgets/TopNav/ui";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function JournalDetail() {
	useHideBottomNav();
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	const { data: record, isLoading: isRecordLoading } = useQuery({
		queryKey: ["emotionRecord", id],
		queryFn: () => getEmotionRecord(id!),
		enabled: !!id,
	});

	const { data: greetingData } = useQuery({
		queryKey: ["greeting", "home"],
		queryFn: () => fetchGreeting({ context: "home" }),
	});

	const characterName = greetingData?.characterName as
		| CharacterName
		| undefined;
	const characterImage = useMemo(() => {
		const foundCharacter = Character.find((c) => c.name === characterName);
		return foundCharacter ? foundCharacter.image : undefined;
	}, [characterName]);

	const handleEditPress = () => {
		if (id) {
			router.push(`/record/edit?id=${id}` as any);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<TopNav
				title="내 기록"
				leftIcon={true}
				rightIcon={<EditIcon />}
				onLeftPress={() => router.push("/journal")}
				onRightPress={handleEditPress}
			/>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 34,
				}}
				showsVerticalScrollIndicator={false}
			>
				{isRecordLoading ? (
					<ActivityIndicator style={{ marginTop: 100 }} />
				) : record ? (
					<TodayHistory record={record} AIImage={characterImage} />
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
