import * as S from "@/entities/character/style/CharacterDialog.styles";

export function CharacterDialog() {
	return (
		<S.DialogContainer>
			<S.CharacterNameBox>
				<S.CharacterName>츠츠</S.CharacterName>
			</S.CharacterNameBox>
			<S.CharacterDialogBox>
				<S.CharacterDialogText>
					오늘 기분은 어때? 딱히 신경 쓰는 건 아니고.
				</S.CharacterDialogText>
			</S.CharacterDialogBox>
		</S.DialogContainer>
	);
}
