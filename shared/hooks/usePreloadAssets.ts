import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

export const usePreloadAssets = (modularAssets: number[]) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function loadAssets() {
			try {
				await Asset.loadAsync(modularAssets);
				setIsLoaded(true);
			} catch (e) {
				if (e instanceof Error) {
					setError(e);
				} else {
					setError(
						new Error("An unknown error occurred while preloading assets."),
					);
				}
			}
		}
		loadAssets();
	}, [modularAssets]);

	return { isLoaded, error };
};
