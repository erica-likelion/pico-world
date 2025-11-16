import { getEmotionRecords } from "@/features/home/api/emotion";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import LeftSmIcon from "@/shared/assets/icons/left-sm.svg";
import RightSmIcon from "@/shared/assets/icons/right-sm.svg";
import type { EmotionRecord } from "@/shared/types/emotion";
import { Button } from "@/shared/ui/Button";
import { useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";

import * as JournalListS from "@/features/journal/style/EmotionRecordList.styles";

const ICON_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

interface EmotionRecordListProps {
	onRecordSelect?: (record: EmotionRecord) => void;
}

export const EmotionRecordList = ({
	onRecordSelect,
}: EmotionRecordListProps) => {
	const [records, setRecords] = useState<EmotionRecord[]>([]);
	const scrollViewRef = useRef<ScrollView>(null);
	const router = useRouter();
	const theme = useTheme();
	const [currentMonth, setCurrentMonth] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});

	useEffect(() => {
		const fetchRecords = async () => {
			const year = currentMonth.getFullYear();
			const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
			const records = await getEmotionRecords(`${year}-${month}`);
			setRecords(records);
		};
		fetchRecords();
	}, [currentMonth]);

	const scrollToTop = () => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
	};

	const handlePrevMonth = () => {
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
		);
	};

	const handleNextMonth = () => {
		setCurrentMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
		);
	};

	const monthLabel = `${currentMonth.getMonth() + 1}월`;

	const filteredRecords = useMemo(() => {
		const targetYear = currentMonth.getFullYear();
		const targetMonth = currentMonth.getMonth();

		return records.filter((record) => {
			const recordDate = new Date(record.created_at);
			return (
				recordDate.getFullYear() === targetYear &&
				recordDate.getMonth() === targetMonth
			);
		});
	}, [records, currentMonth]);

	if (records.length === 0) {
		return (
			<JournalListS.EmptyContainer>
				<JournalListS.EmptyText>기록이 없습니다.</JournalListS.EmptyText>
			</JournalListS.EmptyContainer>
		);
	}

	return (
		<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
			<JournalListS.ScrollContent>
				<JournalListS.ListContainer>
					<JournalListS.MonthHeader>
						<JournalListS.IconButton
							onPress={handlePrevMonth}
							hitSlop={ICON_HIT_SLOP}
						>
							<LeftSmIcon
								width={24}
								height={24}
								color={theme.grayscale.gray200}
							/>
						</JournalListS.IconButton>
						<JournalListS.MonthLabel>{monthLabel}</JournalListS.MonthLabel>
						<JournalListS.IconButton
							onPress={handleNextMonth}
							hitSlop={ICON_HIT_SLOP}
						>
							<RightSmIcon
								width={24}
								height={24}
								color={theme.grayscale.gray200}
							/>
						</JournalListS.IconButton>
					</JournalListS.MonthHeader>
					{filteredRecords.length === 0 ? (
						<JournalListS.EmptyMonthContainer>
							<JournalListS.EmptyMonthText>
								이 달에는 기록이 없습니다.
							</JournalListS.EmptyMonthText>
						</JournalListS.EmptyMonthContainer>
					) : (
						filteredRecords.map((record) => (
							<JournalListS.CardWrapper key={record.record_id}>
								<EmotionRecordCard
									record={record}
									onPress={() =>
										router.push(
											`/journal/detail?date=${record.created_at}` as Href,
										)
									}
									onMenuPress={() => {
										onRecordSelect?.(record);
									}}
								/>
							</JournalListS.CardWrapper>
						))
					)}
					<JournalListS.Footer>
						<JournalListS.FooterText>
							모든 기록을 확인했습니다.
						</JournalListS.FooterText>
						<JournalListS.ButtonWrapper>
							<Button
								text="위로 돌아가기"
								size="small"
								color="gray"
								onPress={scrollToTop}
							/>
						</JournalListS.ButtonWrapper>
					</JournalListS.Footer>
				</JournalListS.ListContainer>
			</JournalListS.ScrollContent>
		</ScrollView>
	);
};
