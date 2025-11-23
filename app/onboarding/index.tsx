import { Character } from "@/entities/character/model/character";
import type { CharacterProps } from "@/entities/character/model/type";
import { CharacterInfo } from "@/entities/character/ui";
import { useInvalidateUserInfo } from "@/entities/user/model/userQueries";
import { axiosInstance } from "@/shared/api/axios";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { usePreloadAssets } from "@/shared/hooks/usePreloadAssets";
import { MyCharacter } from "@/shared/store/myCharacter";
import { Button } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

const characterImages = Character.map((char) => char.image);

export default function Onboarding() {
	const { isLoaded } = usePreloadAssets(characterImages);
	const router = useRouter();
	const { from } = useLocalSearchParams();
	const { setName } = MyCharacter();
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterProps>(
		Character[0],
	);
	const sele =
		Character.findIndex((char) => char.name === selectedCharacter.name) + 1;
	const invalidateUserInfo = useInvalidateUserInfo();

	useHideBottomNav();

	const { mutate: selectMutate } = useMutation({
		mutationFn: async (characterId: number) => {
			await axiosInstance.post("/api/v1/characters/select", {
				characterId: characterId,
			});
		},
		onSuccess: () => {
			setName(selectedCharacter.name);
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
			invalidateUserInfo();
			setName(selectedCharacter.name);
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

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			{from === "my" ? (
				<TopNav
					title="캐릭터 수정하기"
					leftIcon
					onLeftPress={() => router.push("/my")}
				/>
			) : (
				<></>
			)}
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
