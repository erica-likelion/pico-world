import { useToastStore } from "@/shared/store/toast";
import { Toast } from "@/shared/ui/Toast";
import { View } from "react-native";

export function ErrorToast() {
	const { isVisible, message, hide } = useToastStore();

	return (
		<View
			style={{
				position: "absolute",
				bottom: 20,
				left: 0,
				right: 0,
				alignItems: "center",
			}}
		>
			<Toast visible={isVisible} message={message} onHide={hide} />
		</View>
	);
}
