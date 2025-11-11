import { getUserInfo, type UserInfo } from "@/features/my/api/MyInfo";
import { withdraw } from "@/features/my/api/Withdraw";
import * as S from "@/features/my/style/MyPageSelect.styles";
import { LogoutModal } from "@/features/my/ui/LogoutModal";
import { WithdrawModal } from "@/features/my/ui/WithdrawModal";
import { Avatar, Divider } from "@/shared/ui";
import { useFocusEffect } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";

export function MyPageSelect() {
	const [isLoginModalVisible, setLoginModalVisible] = useState(false);
	const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	const router = useRouter();

	const menuItems = [
		{
			label: "AI 캐릭터 수정",
			onPress: () => {
				router.push({ pathname: "/onboarding", params: { from: "my" } });
			},
		},
		{
			label: "내 이름 수정",
			onPress: () => {
				router.push({
					pathname: "/my/name-edit",
					params: { name: userInfo?.nickname },
				});
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

	const { mutate: MyInfoMutate } = useMutation({
		mutationFn: getUserInfo,
		onSuccess: (data) => {
			setUserInfo(data);
		},
		onError: (error) => {
			console.error("Error fetching my info:", error);
		},
	});

	useFocusEffect(
		useCallback(() => {
			MyInfoMutate();
		}, [MyInfoMutate]),
	);
	const { mutate: WithdrawMutate } = useMutation({
		mutationFn: withdraw,
		onSuccess: () => {
			router.push("/login");
		},
		onError: (error) => {
			console.error("Withdraw error", error);
		},
	});

	const handleLogout = () => {
		router.push("/login");
	};

	const handleWithdraw = async () => {
		try {
			WithdrawMutate();
		} catch (error) {
			console.error("Withdraw error", error);
		}
	};

	return (
		<S.MyPageSelectWrapper>
			<S.UserImageNameBox>
				<Avatar size="small" imageUrl={userInfo?.profileImageUrl || ""} />
				<S.UserName>{userInfo?.nickname || "피코"}</S.UserName>
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
						handleLogout();
					}}
					onCancel={() => setLoginModalVisible(false)}
				/>
			)}
			{isWithdrawModalVisible && (
				<WithdrawModal
					isVisible={isWithdrawModalVisible}
					onConfirm={() => {
						setWithdrawModalVisible(false);
						handleWithdraw();
					}}
					onCancel={() => setWithdrawModalVisible(false)}
				/>
			)}
		</S.MyPageSelectWrapper>
	);
}
