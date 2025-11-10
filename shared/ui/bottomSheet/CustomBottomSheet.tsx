import { theme } from "@/shared/config/theme/theme";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
	type BottomSheetBackdropProps,
	type BottomSheetProps,
} from "@gorhom/bottom-sheet";
import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useState } from "react";
export type BottomSheetRef = RefObject<BottomSheet | null>;

interface CustomBottomSheetProps extends Omit<BottomSheetProps, "children"> {
	bottomSheetRef: BottomSheetRef;
	children: ReactNode;
	snapPoints?: Array<string | number>;
	initialIndex?: number;
}

export function CustomBottomSheet({
	bottomSheetRef,
	children,
	snapPoints,
	initialIndex = -1,
}: CustomBottomSheetProps) {
	const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

	useEffect(() => {
		setCurrentIndex(initialIndex);
	}, [initialIndex]);

	const renderBackdrop = useCallback(
		(backdropProps: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...backdropProps}
				pressBehavior="close"
				appearsOnIndex={0}
				disappearsOnIndex={-1}
			/>
		),
		[],
	);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={currentIndex}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			enableDynamicSizing={false}
			backgroundStyle={{
				backgroundColor: theme.grayscale.gray950,
				borderTopLeftRadius: 36,
				borderTopRightRadius: 36,
			}}
			handleIndicatorStyle={{
				backgroundColor: theme.grayscale.gray700,
				width: 42,
				height: 6,
			}}
			handleStyle={{
				paddingTop: 16,
			}}
		>
			<BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
		</BottomSheet>
	);
}
