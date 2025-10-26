import * as S from "@/features/my/style/MyPageSelect.styles";
import { Avatar, Divider } from "@/shared/ui";
import { useRouter } from "expo-router";
import React from "react";

export function MyPageSelect() {
	const router = useRouter();
	const menuItems = [
		{
			label: "AI 캐릭터 수정",
			onPress: () => {
				router.push("/onboarding");
			},
		},
		{
			label: "내 이름 수정",
			onPress: () => {
				router.push("/my/name-edit");
			},
		},
		{
			label: "로그아웃",
			onPress: () => {
				console.log("로그아웃 클릭");
			},
		},
		{
			label: "계정 탈퇴",
			onPress: () => {
				console.log("계정 탈퇴 클릭");
			},
		},
	];

	return (
		<S.MyPageSelectWrapper>
			<S.UserImageNameBox>
				<Avatar size="small" />
				<S.UserName>피코</S.UserName>
			</S.UserImageNameBox>

			{menuItems.map((item) => (
				<React.Fragment key={item.label}>
					<Divider size="small" />
					<S.TextBox activeOpacity={0.8} onPress={item.onPress}>
						<S.Text>{item.label}</S.Text>
					</S.TextBox>
				</React.Fragment>
			))}
		</S.MyPageSelectWrapper>
	);
}
