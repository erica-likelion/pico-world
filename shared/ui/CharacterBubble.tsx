import * as S from "@/shared/style/CharacterBubble.style";

interface CharacterBubbleProps {
	character: string;
	message: string;
}

/**
 * CharacterBubble
 * @param props - CharacterBubble props
 * @param props.character - 캐릭터 이름
 * @param props.message - 전할 메시지
 * @returns JSX.Element
 * @example
 * <CharacterBubble character="츠츠" message="안녕하세요" />
 */

export const CharacterBubble = ({
	character,
	message,
}: CharacterBubbleProps) => {
	return (
		<S.Container>
			<S.CharacterWrapper>
				<S.Character>{character}</S.Character>
			</S.CharacterWrapper>
			<S.BubbleWrapper>
				<S.Bubble>{message}</S.Bubble>
			</S.BubbleWrapper>
		</S.Container>
	);
};
