import type { CharacterProps } from "@/entities/character/model/type";
import * as S from "@/entities/character/style/CharacterInfo.styles";
import { useState } from "react";
import {
	Dimensions,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const itemWidth = screenWidth * 0.68;
const sliderPadding = (screenWidth - itemWidth) / 2;

interface CharacterInfoProps {
	characters: CharacterProps[];
	setSelectedCharacter?: (character: CharacterProps) => void;
}

export function CharacterInfo({
	characters,
	setSelectedCharacter,
}: CharacterInfoProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const x = e.nativeEvent.contentOffset.x;
		const index = Math.round(x / itemWidth);

		if (characters[index]) {
			setCurrentIndex(index);
			setSelectedCharacter?.(characters[index]);
		}
	};

	const currentCharacter = characters[currentIndex];

	return (
		<S.CharacterInfoContainer>
			{/* 말풍선 */}
			<S.SpeechBubbleContainer>
				<S.SpeechBubbleText>{currentCharacter.speech}</S.SpeechBubbleText>
				<S.Polygon />
			</S.SpeechBubbleContainer>

			{/* 이미지 스크롤 */}
			<S.ImageScroll
				horizontal
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				snapToInterval={itemWidth}
				decelerationRate="fast"
				contentContainerStyle={{
					paddingHorizontal: sliderPadding,
				}}
			>
				{characters.map((character) => (
					<S.CharacterImageView key={character.name}>
						<S.CharacterImageWrapper boxShadow={character.boxShadow}>
							<S.CharacterImage source={character.image} resizeMode="cover" />
						</S.CharacterImageWrapper>
					</S.CharacterImageView>
				))}
			</S.ImageScroll>

			{/* 이름 */}
			<S.CharacterName>{currentCharacter.name}</S.CharacterName>

			{/* 성격 */}
			<S.PersonalityContainer>
				{currentCharacter.personality.map((trait) => (
					<S.PersonalityBox key={trait}>
						<S.PersonalityText>{trait}</S.PersonalityText>
					</S.PersonalityBox>
				))}
			</S.PersonalityContainer>
		</S.CharacterInfoContainer>
	);
}
