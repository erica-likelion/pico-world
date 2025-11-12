import FriendsPlusIcon from "@/shared/assets/icons/freinds-plus.svg";
import { Button, CharacterBubble, Divider, ProfileButton } from "@/shared/ui";
import { Pressable, Text, View } from "react-native";
import { useMemo } from "react";
import { useTheme } from "styled-components/native";

import { createFriendsContentStyles } from "@/features/friends/style/FriendsContent.styles";
import { FriendsCard } from "@/features/friends/ui/FriendsCard/FriendsCard";

interface FriendsContentProps {
	onProfilePress: () => void;
	onAddFriendPress: () => void;
	onScrollToTop?: () => void;
	profileName: string;
}

export function FriendsContent({
	onProfilePress,
	onAddFriendPress,
	onScrollToTop,
	profileName,
}: FriendsContentProps) {
	const theme = useTheme();
	const { styles, profileButtonSize } = useMemo(
		() => createFriendsContentStyles(theme),
		[theme],
	);

	return (
		<View style={styles.container}>
			<View style={styles.profileRow}>
				<View style={styles.profileButtonWrapper}>
					<ProfileButton logged onPress={onProfilePress} />
					<Text style={styles.profileLabel}>{profileName}</Text>
				</View>

				<Pressable
					style={[styles.profileButtonWrapper, styles.profileActionButton]}
					onPress={onAddFriendPress}
				>
					<View style={styles.profileButtonContent}>
						<FriendsPlusIcon
							width={profileButtonSize}
							height={profileButtonSize}
						/>
					</View>
					<Text style={styles.profileLabel}>친구 추가 0/5</Text>
				</Pressable>
			</View>

			<CharacterBubble
				character="츠츠"
				message="Pico World는 친구랑 할 때 더 재밌는 거 알지? 5명까지 초대할 수 있으니 같이 기록해봐."
				containerStyle={styles.spacing}
			/>

			<FriendsCard
				name="하룰라라"
				date={new Date().toISOString().split("T")[0].replace(/-/g, ". ")}
				emotionLabel="만족스러운"
				description="오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~"
			/>
			<View style={styles.dividerSpacing}>
				<Divider size="large" />
			</View>
			<FriendsCard
				name="루루"
				date={new Date().toISOString().split("T")[0].replace(/-/g, ". ")}
				emotionLabel="잔잔한"
				description="한적한 카페에서 늦은 오후를 보냈어. 창밖으로 비가 내려서 마음이 조용히 가라앉더라. 따뜻한 라떼 한 잔에 마음이 느긋해진 느낌이야."
			/>
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					기록을 모두 확인했습니다.
					{"\n"}친구들과 꾸준히 기록을 더 쌓아보세요.
				</Text>
				<View style={styles.footerButtonWrapper}>
					<Button
						text="위로 돌아가기"
						size="small"
						color="gray"
						onPress={onScrollToTop}
					/>
				</View>
			</View>
		</View>
	);
}
