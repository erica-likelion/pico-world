import * as S from "@/features/notifications/style/PermissionGuide.styles";
import { Button } from "@/shared/ui/Button";
import { Divider } from "@/shared/ui/Divider";
import { Linking } from "react-native";

interface PermissionGuideProps {
	show: boolean;
	onDismiss: () => void;
}

export const PermissionGuide = ({ show, onDismiss }: PermissionGuideProps) => {
	if (!show) return null;

	return (
		<>
			<S.PermissionGuideContainer>
				<S.Title>알림을 켜고 소식을 받아보세요</S.Title>
				<S.Description>
					친구의 새로운 소식과 답장을 놓치지 않고 받아볼 수 있어요.
				</S.Description>
				<S.ButtonContainer>
					<Button
						size="medium"
						color="gray"
						onPress={onDismiss}
						text={"나중에"}
					/>
					<Button
						size="medium"
						onPress={() => Linking.openSettings()}
						text={"알림 켜기"}
					/>
				</S.ButtonContainer>
			</S.PermissionGuideContainer>
			<Divider size="large" />
		</>
	);
};
