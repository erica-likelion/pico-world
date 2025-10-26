import { Button, TextInput } from "@/shared/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function NameEdit() {
	const { show, hide } = useBottomNavStore();
	const router = useRouter();
	useEffect(() => {
		hide();
		return () => {
			show();
		};
	}, [show, hide]);
	return (
		<>
			<TopNav title="이름 수정" />
			<TextInput placeholder="이름을 입력하세요." />
			<View
				style={{
					position: "absolute",
					alignItems: "center",
					bottom: 0,
					width: "100%",
				}}
			>
				<Button
					text="저장"
					onPress={() => {
						router.push("/my");
					}}
				/>
			</View>
		</>
	);
}
