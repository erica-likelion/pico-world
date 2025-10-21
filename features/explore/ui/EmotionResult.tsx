import type { EmotionChip } from "@/features/explore/model/useEmotionAnalysis";
import * as S from "@/features/explore/style/EmotionResult.style";
import RightIcon from "@/shared/assets/icons/right.svg";
import { Chip, IconButton } from "@/shared/ui";
import React from "react";

interface EmotionResultProps {
	chips: EmotionChip[];
	selectedChip: number | null;
	onChipSelect: (index: number | null) => void;
}

export const EmotionResult: React.FC<EmotionResultProps> = ({
	chips,
	selectedChip,
	onChipSelect,
}) => {
	return (
		<S.Footer>
			<S.FooterContent>
				<S.ChipsScrollView>
					{chips.map((c, idx) => (
						<Chip
							key={`${c.label}-${idx}`}
							text={c.label}
							selected={selectedChip === idx}
							setSelected={() => {
								onChipSelect(selectedChip === idx ? null : idx);
							}}
						/>
					))}
				</S.ChipsScrollView>

				{selectedChip !== null && (
					<S.NextButton>
						<IconButton
							size="large"
							icon={<RightIcon />}
							iconColor="white"
							color="happy"
							onPress={() => () => {}}
						/>
					</S.NextButton>
				)}
			</S.FooterContent>
		</S.Footer>
	);
};
