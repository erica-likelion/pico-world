import { Button } from "@/shared/ui/Button";
import React from "react";
import { Modal, Text, View } from "react-native";
import styled from "styled-components/native";

interface NotificationPermissionModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export const NotificationPermissionModal = ({
	visible,
	onClose,
	onConfirm,
}: NotificationPermissionModalProps) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<ModalContainer>
				<ModalContent>
					<Title>알림을 켜시겠어요?</Title>
					<Description>
						친구의 새로운 소식과 답장을 놓치지 않고 받아볼 수 있어요.
					</Description>
					<ButtonWrapper>
						<ButtonContainer>
							<Button variant="secondary" onPress={onClose}>
								나중에
							</Button>
						</ButtonContainer>
						<ButtonContainer>
							<Button variant="primary" onPress={onConfirm}>
								알림 켜기
							</Button>
						</ButtonContainer>
					</ButtonWrapper>
				</ModalContent>
			</ModalContainer>
		</Modal>
	);
};

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.View`
  width: 300px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  border-radius: 20px;
  padding: 24px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  color: ${({ theme }) => theme.grayscale.white};
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-family: "Pretendard-Regular";
  font-size: 16px;
  color: ${({ theme }) => theme.grayscale.gray300};
  text-align: center;
  margin-bottom: 24px;
  line-height: 24px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ButtonContainer = styled.View`
  flex: 1;
  margin: 0 4px;
`;
