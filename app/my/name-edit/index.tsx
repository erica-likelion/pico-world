import { Button, TextInput } from "@/shared/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function NameEdit() {
	const [name, setName] = useState("피코");
	const { show, hide } = useBottomNavStore();
	const router = useRouter();
	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);
	return (
		<>
			<TopNav title="이름 수정" leftIcon />
			<TextInput
				placeholder="이름을 입력하세요."
				value={name}
				onChangeText={setName}
			/>
			<View
				style={{
					position: "absolute",
					alignItems: "center",
					bottom: 0,
					width: "100%",
				}}
			>
				<Button
					text="수정하기"
					onPress={() => {
						router.push("/my");
					}}
					disabled={name.trim() === ""}
				/>
			</View>
		</>
	);
}
