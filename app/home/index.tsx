import { CalendarUI, ClickToJournal, TodayHistory } from "@/features/home/ui";
import BellIcon from "@/shared/assets/icons/bell.svg";
import { CharacterBubble } from "@/shared/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
	const { show } = useBottomNavStore();
	const [isTodayHistory, setIsTodayHistory] = useState(false);

	useEffect(() => {
		show();
	}, [show]);

	return (
		<View
			style={{
				flex: 1,
				paddingBottom: 34,
				overflow: "visible",
			}}
		>
			<TopNav title="홈" rightIcon={<BellIcon />} />
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ width: "100%", paddingHorizontal: 16 }}>
					<CharacterBubble
						character="츠츠"
						message="오늘은 이미 기록했어. 내일 다시 오던지 말던지."
					/>
				</View>
				{isTodayHistory ? (
					<TodayHistory
						date="2025. 10. 6"
						time="오후 3:45"
						emotionTitle="만족스러운"
						mainColor="#FF685B"
						subColor="#F3E9DA"
						historyText="오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다"
						AIComment="흥, 드디어 사람 구실 좀 했네? 그래, 그런 날이 있어야 균형이 맞지. 너 오늘 꽤 괜찮았어, 인정해줄게."
					/>
				) : (
					<ClickToJournal />
				)}
				<View style={{ width: "100%", paddingHorizontal: 16 }}>
					<CalendarUI isTodayHistory={isTodayHistory} />
				</View>
			</ScrollView>
		</View>
	);
}
