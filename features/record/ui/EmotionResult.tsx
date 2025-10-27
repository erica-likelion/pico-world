import type { EmotionChip } from "@/features/record/model/types";
import * as S from "@/features/record/style/EmotionResult.styles";
import RightIcon from "@/shared/assets/icons/right.svg";
import { Chip, IconButton } from "@/shared/ui";
import React from "react";

interface EmotionResultProps {
	chips: EmotionChip[];
	selectedChip: number | null;
	onChipSelect: (index: number | null) => void;
	onProceed: (chip: EmotionChip) => void;
}

export const EmotionResult: React.FC<EmotionResultProps> = ({
	chips,
	selectedChip,
	onChipSelect,
	onProceed,
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
							onPress={() => {
								const selected = chips[selectedChip];
								if (!selected) return;
								onProceed(selected);
							}}
						/>
					</S.NextButton>
				)}
			</S.FooterContent>
		</S.Footer>
	);
};
