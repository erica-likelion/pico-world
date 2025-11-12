import { theme } from "@/shared/config/theme/theme";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
	type BottomSheetBackdropProps,
	type BottomSheetProps,
} from "@gorhom/bottom-sheet";
import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
export type BottomSheetRef = RefObject<BottomSheet | null>;

interface CustomBottomSheetProps extends Omit<BottomSheetProps, "children"> {
	bottomSheetRef: BottomSheetRef;
	children: ReactNode;
	snapPoints?: Array<string | number>;
	initialIndex?: number;
	enableDynamicSizing?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
}

export function CustomBottomSheet({
	bottomSheetRef,
	children,
	snapPoints,
	initialIndex = -1,
	enableDynamicSizing = false,
	containerStyle,
	...rest
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
			enableDynamicSizing={enableDynamicSizing}
			containerStyle={[{ zIndex: 1000, elevation: 1000 }, containerStyle]}
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
			{...rest}
		>
			<BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
		</BottomSheet>
	);
}
