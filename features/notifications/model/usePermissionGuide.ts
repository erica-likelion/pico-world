import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging, {
	AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";

const DISMISSED_KEY = "permissionGuideDismissedAt";
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export function usePermissionGuide() {
	const [permissionStatus, setPermissionStatus] = useState<
		number | undefined
	>();
	const [showPermissionGuide, setShowPermissionGuide] = useState(true);
	const appState = useRef(AppState.currentState);

	const checkPermission = useCallback(async () => {
		const authStatus = await messaging().hasPermission();
		setPermissionStatus(authStatus);

		const isGranted =
			authStatus === AuthorizationStatus.AUTHORIZED ||
			authStatus === AuthorizationStatus.PROVISIONAL;

		if (isGranted) {
			setShowPermissionGuide(false);
			await AsyncStorage.removeItem(DISMISSED_KEY);
			return;
		}

		const dismissedAt = await AsyncStorage.getItem(DISMISSED_KEY);
		const shouldShow =
			!dismissedAt || Date.now() - Number(dismissedAt) >= TWO_DAYS_MS;
		setShowPermissionGuide(shouldShow);
	}, []);

	const handleDismiss = useCallback(async () => {
		await AsyncStorage.setItem(DISMISSED_KEY, Date.now().toString());
		setShowPermissionGuide(false);
	}, []);

	useEffect(() => {
		checkPermission();
	}, [checkPermission]);

	useFocusEffect(
		useCallback(() => {
			checkPermission();
		}, [checkPermission]),
	);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			(nextAppState: AppStateStatus) => {
				if (
					appState.current.match(/inactive|background/) &&
					nextAppState === "active"
				) {
					checkPermission();
				}
				appState.current = nextAppState;
			},
		);

		return () => {
			subscription.remove();
		};
	}, [checkPermission]);

	const isPermissionGranted =
		permissionStatus === AuthorizationStatus.AUTHORIZED ||
		permissionStatus === AuthorizationStatus.PROVISIONAL;

	return {
		showPermissionGuide,
		isPermissionGranted,
		handleDismiss,
		checkPermission,
	};
}
