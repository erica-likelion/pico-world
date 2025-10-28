import * as S from "@/features/my/style/MyPageSelect.styles";
import { LogoutModal } from "@/features/my/ui/LogoutModal";
import { WithdrawModal } from "@/features/my/ui/WithdrawModal";
import { Avatar, Divider } from "@/shared/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export function MyPageSelect() {
	const [isLoginModalVisible, setLoginModalVisible] = useState(false);
	const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
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
				setLoginModalVisible(true);
			},
		},
		{
			label: "계정 탈퇴",
			onPress: () => {
				setWithdrawModalVisible(true);
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
			{isLoginModalVisible && (
				<LogoutModal
					isVisible={isLoginModalVisible}
					onConfirm={() => {
						setLoginModalVisible(false);
						console.log("로그아웃 클릭");
					}}
					onCancel={() => setLoginModalVisible(false)}
				/>
			)}
			{isWithdrawModalVisible && (
				<WithdrawModal
					isVisible={isWithdrawModalVisible}
					onConfirm={() => {
						setWithdrawModalVisible(false);
						console.log("회원탈퇴 클릭");
					}}
					onCancel={() => setWithdrawModalVisible(false)}
				/>
			)}
		</S.MyPageSelectWrapper>
	);
}
