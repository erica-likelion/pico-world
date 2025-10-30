import { matchFont } from "@shopify/react-native-skia";
import { useMemo } from "react";

/**
 * Canvas에서 사용할 폰트 생성 (record, report)
 */

export const useSkiaFont = () => {
	return useMemo(() => {
		return matchFont({
			fontFamily: "Pretendard",
			fontSize: 14,
			fontWeight: "600",
		});
	}, []);
};
