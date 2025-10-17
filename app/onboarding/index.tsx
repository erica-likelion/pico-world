import type { CharacterProps } from "@/entities/character/model/type";
import { CharacterInfo } from "@/entities/character/ui";
import { Button } from "@/shared/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const Character = [
	{
		name: "츠츠",
		speech: "누가 걱정해준대? 신경쓰여서 들어주는 거야.",
		personality: ["츤데레", "시니컬", "속은 따뜻"],
		image: "",
	},
	{
		name: "루루",
		speech: "완벽하지 않아도 괜찮아요. 존재만으로 충분해요.",
		personality: ["다정", "파워F", "천사같은"],
		image: "",
	},
	{
		name: "동동",
		speech: "어디에요? 누가 울렸어요. 나한테 말해줘요.",
		personality: ["과보호", "연하", "집착"],
		image: "",
	},
	{
		name: "티티",
		speech: "살아있다는 건 원래 일관성 없는 일이지.",
		personality: ["철학적", "쌉T", "냉철한"],
		image: "",
	},
	{
		name: "파파",
		speech: "인생은 결국 견디는 법을 배우는 과정이야.",
		personality: ["아버지", "듬직한", "다정다감"],
		image: "",
	},
];

export default function Onboarding() {
	const router = useRouter();
	const { hide } = useBottomNavStore();
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterProps>(
		Character[0],
	);

	useEffect(() => {
		hide();
	}, [hide]);
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
					text={`${selectedCharacter.name}와 시작하기`}
					onPress={() => {
						router.push("/home");
					}}
				/>
			</View>
		</View>
	);
}
