import {
	getComparison,
	type ComparisonSection,
} from "@/features/report/api/GetComparison";
import * as S from "@/features/report/style/MonthlyEmotion.styles";
import RightIcon from "@/shared/assets/icons/right.svg";
import { theme } from "@/shared/config/theme/theme";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface MonthlyEmotionParams {
	thisMonthEmotion: string;
	lastMonthEmotion: string | null;
}

interface MonthlyEmotionProps {
	onPress: (params: MonthlyEmotionParams) => void;
}

interface ComparisonData {
	thisMonth: ComparisonSection;
	lastMonth: ComparisonSection | null;
}

export const MonthlyEmotion: React.FC<MonthlyEmotionProps> = ({ onPress }) => {
	const [comparison, setComparison] = useState<ComparisonData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const comparisonMutation = useMutation({
		mutationFn: getComparison,
		onSuccess: (comparisonData) => {
			const extractEmotion = (section?: ComparisonSection | null) =>
				section && section.representative_emotion !== "없음" ? section : null;

			const thisMonth = extractEmotion(comparisonData.data.thisMonth);
			const lastMonth = extractEmotion(comparisonData.data.lastMonth);

			setComparison(
				thisMonth
					? {
							thisMonth,
							lastMonth,
						}
					: null,
			);

			setIsLoading(false);
		},
		onError: (error) => {
			console.error(error);
			setIsLoading(false);
		},
	});

	useEffect(() => {
		comparisonMutation.mutate();
	}, [comparisonMutation.mutate]);

	if (isLoading) {
		return (
			<S.Container>
				<S.TopWrapper>
					<S.Title>저번 달과 상태 비교</S.Title>
				</S.TopWrapper>
				<S.Description>...</S.Description>
			</S.Container>
		);
	}

	if (!comparison) {
		return (
			<S.Container>
				<S.TopWrapper>
					<S.Title>저번 달과 상태 비교</S.Title>
				</S.TopWrapper>
				<S.Description>기록을 남기면 확인할 수 있어요.</S.Description>
			</S.Container>
		);
	}

	const { thisMonth: thisMonthComparison, lastMonth: lastMonthComparison } =
		comparison;

	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>저번 달과 상태 비교</S.Title>
				<TouchableOpacity
					onPress={() =>
						onPress({
							thisMonthEmotion: thisMonthComparison.representative_emotion,
							lastMonthEmotion:
								lastMonthComparison?.representative_emotion ?? null,
						})
					}
				>
					<RightIcon width={18} height={18} color={theme.grayscale.gray200} />
				</TouchableOpacity>
			</S.TopWrapper>
			<S.EmotionBox
				mainColor={thisMonthComparison.main_color}
				subColor={thisMonthComparison.sub_color}
			/>
			<S.Description>
				{isLoading
					? "..."
					: `저번 달에 비해 '${comparison.thisMonth.representative_emotion}' 키워드에 가까운 날이 더 많습니다.`}
			</S.Description>
		</S.Container>
	);
};
