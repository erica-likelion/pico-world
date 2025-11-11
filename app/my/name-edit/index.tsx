import { updateNickname } from "@/features/my/api/EditName";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { Button, TextInput } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function NameEdit() {
	const { name: initialName } = useLocalSearchParams<{ name?: string }>(); // ✅ 타입 명시
	const [name, setName] = useState(initialName || "피코");
	const router = useRouter();
	useHideBottomNav();

	const { mutate: updateNicknameMutate } = useMutation({
		mutationFn: updateNickname,
		onSuccess: () => {},
		onError: (error) => {
			console.error("닉네임 수정 에러:", error);
		},
	});

	const handleUpdateNickname = () => {
		updateNicknameMutate({ nickname: name });
		router.back();
	};
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
					onPress={handleUpdateNickname}
					disabled={name.trim() === ""}
				/>
			</View>
		</>
	);
}
