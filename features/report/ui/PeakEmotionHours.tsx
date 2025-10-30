import * as S from "@/features/report/style/PeakEmotionHours.styles";

interface PeakEmotionHoursProps {
	description: string;
}

export const PeakEmotionHours: React.FC<PeakEmotionHoursProps> = ({
	description,
}) => {
	return (
		<S.Container>
			<S.TopWrapper>
				<S.Title>특정 상태가 많았던 시간대</S.Title>
			</S.TopWrapper>
			<S.Description>{description}</S.Description>
		</S.Container>
	);
};
