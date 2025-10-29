import * as S from "@/shared/style/Popover.styles";
import { Divider } from "@/shared/ui/Divider";

interface PopoverProps {
	list: { name: string; onSelect: () => void }[];
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
	zIndex?: number;
}

export function Popover({
	list,
	top,
	right,
	left,
	bottom,
	zIndex,
}: PopoverProps) {
	return (
		<S.PopoverContainer
			top={top}
			right={right}
			left={left}
			bottom={bottom}
			zIndex={zIndex}
		>
			{list.map((item) => (
				<>
					<S.PopoverItem key={item.name} onPress={item.onSelect}>
						<S.PopoverItemText>{item.name}</S.PopoverItemText>
					</S.PopoverItem>
					{item !== list[list.length - 1] && <Divider size="small" />}
				</>
			))}
		</S.PopoverContainer>
	);
}
