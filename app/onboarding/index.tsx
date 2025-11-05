import { Character } from "@/entities/character/model/character";
import type { CharacterProps } from "@/entities/character/model/type";
import { CharacterInfo } from "@/entities/character/ui";
import { axiosInstance } from "@/shared/api/axios";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { Button } from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Onboarding() {
	const router = useRouter();
	const { from } = useLocalSearchParams();
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterProps>(
		Character[0],
	);
	const sele =
		Character.findIndex((char) => char.name === selectedCharacter.name) + 1;

	useHideBottomNav();

	const { mutate: selectMutate } = useMutation({
		mutationFn: async (characterId: number) => {
			console.log("Selecting character with ID:", characterId);
			await axiosInstance.post("/api/v1/characters/select", {
				characterId: characterId,
			});
		},
		onSuccess: () => {
			router.push("/home");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { mutate: reSelectMutate } = useMutation({
		mutationFn: async (characterId: number) => {
			await axiosInstance.put("/api/v1/users/me/character", {
				characterId: characterId,
			});
		},
		onSuccess: () => {
			router.back();
		},
	});

	const handleSelectCharacter = async () => {
		if (from === "my") {
			try {
				reSelectMutate(sele);
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				selectMutate(sele);
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<CharacterInfo
				characters={Character}
				setSelectedCharacter={setSelectedCharacter}
			/>
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					alignItems: "center",
				}}
			>
				<Button
					text={`${selectedCharacter.name}(이)랑 시작하기`}
					onPress={handleSelectCharacter}
				/>
			</View>
		</View>
	);
}
