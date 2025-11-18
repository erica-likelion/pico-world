import * as JournalListS from "@/features/journal/style/EmotionRecordList.styles";
import { EmotionRecordCard } from "@/features/journal/ui/EmotionRecordCard";
import LeftSmIcon from "@/shared/assets/icons/left-sm.svg";
import RightSmIcon from "@/shared/assets/icons/right-sm.svg";
import type { EmotionRecord } from "@/shared/types/emotion";
import { Button } from "@/shared/ui/Button";
import { type Href, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "styled-components/native";

const ICON_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

interface EmotionRecordListProps {
	records: EmotionRecord[];
	monthLabel: string;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	isNextMonthDisabled?: boolean;
	onMenuPress?: (record: EmotionRecord) => void;
}

export const EmotionRecordList = ({
	records,
	monthLabel,
	onPrevMonth,
	onNextMonth,
	isNextMonthDisabled = false,
	onMenuPress,
}: EmotionRecordListProps) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const router = useRouter();
	const theme = useTheme();

	const scrollToTop = () => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
	};

	const groupedRecords = useMemo(() => {
		return records.reduce(
			(acc, record) => {
				const date = record.created_at.split("T")[0];
				if (!acc[date]) {
					acc[date] = [];
				}
				acc[date].push(record);
				return acc;
			},
			{} as Record<string, EmotionRecord[]>,
		);
	}, [records]);

	if (records.length === 0) {
		return (
			<JournalListS.EmptyContainer>
				<JournalListS.MonthHeader>
					<JournalListS.IconButton
						onPress={onPrevMonth}
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
						onPress={onNextMonth}
						hitSlop={ICON_HIT_SLOP}
						disabled={isNextMonthDisabled}
					>
						<RightSmIcon
							width={24}
							height={24}
							color={
								isNextMonthDisabled
									? theme.grayscale.gray700
									: theme.grayscale.gray200
							}
						/>
					</JournalListS.IconButton>
				</JournalListS.MonthHeader>
				<JournalListS.EmptyMonthContainer>
					<JournalListS.EmptyMonthText>
						이 달에는 기록이 없습니다.
					</JournalListS.EmptyMonthText>
				</JournalListS.EmptyMonthContainer>
			</JournalListS.EmptyContainer>
		);
	}

	return (
		<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
			<JournalListS.ScrollContent>
				<JournalListS.ListContainer>
					<JournalListS.MonthHeader>
						<JournalListS.IconButton
							onPress={onPrevMonth}
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
							onPress={onNextMonth}
							hitSlop={ICON_HIT_SLOP}
							disabled={isNextMonthDisabled}
						>
							<RightSmIcon
								width={24}
								height={24}
								color={
									isNextMonthDisabled
										? theme.grayscale.gray700
										: theme.grayscale.gray200
								}
							/>
						</JournalListS.IconButton>
					</JournalListS.MonthHeader>
					{Object.entries(groupedRecords).map(([date, dailyRecords]) => (
						<View key={date} style={{ width: "100%" }}>
							{dailyRecords.map((record) => (
								<JournalListS.CardWrapper key={record.record_id}>
									<EmotionRecordCard
										record={record}
										onPress={() =>
											router.push(
												`/journal/detail?id=${record.record_id}` as Href,
											)
										}
										onMenuPress={() => {
											onMenuPress?.(record);
										}}
									/>
								</JournalListS.CardWrapper>
							))}
						</View>
					))}
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
