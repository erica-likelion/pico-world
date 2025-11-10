import { theme } from "@/shared/config/theme/theme";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
	type BottomSheetBackdropProps,
	type BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import type { ReactNode, RefObject } from "react";
import { useCallback } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
export type BottomSheetRef = RefObject<BottomSheetModal | null>;

interface CustomBottomSheetProps
	extends Omit<BottomSheetModalProps, "children" | "snapPoints"> {
	bottomSheetRef: BottomSheetRef;
	children: ReactNode;
	snapPoints?: Array<string | number>;
}

export function CustomBottomSheet({
	bottomSheetRef,
	children,
	snapPoints,
	...props
}: CustomBottomSheetProps) {
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
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
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
			{...props}
		>
			<StyledThemeProvider theme={theme}>
				<BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
			</StyledThemeProvider>
		</BottomSheetModal>
	);
}
