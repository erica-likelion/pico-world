import type { CharacterName } from "@/entities/character/model/characterMessages";
import { DEFAULT_CHARACTER } from "@/entities/character/model/characterMessages";
import { getUserInfo } from "@/features/my/api/MyInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const USER_INFO_QUERY_KEY = ["userInfo"] as const;

const CHARACTER_NAMES: readonly CharacterName[] = [
	"츠츠",
	"루루",
	"동동",
	"티티",
	"파파",
] as const;

const useUserInfoQuery = () =>
	useQuery({
		queryKey: USER_INFO_QUERY_KEY,
		queryFn: getUserInfo,
		staleTime: 1000 * 60 * 5,
	});

export function useUserCharacter() {
	const { data } = useUserInfoQuery();

	const apiName = data?.characterInfo?.name;

	if (apiName && CHARACTER_NAMES.includes(apiName as CharacterName)) {
		return apiName as CharacterName;
	}

	return DEFAULT_CHARACTER;
}

export function useUserConnectCode() {
	const { data } = useUserInfoQuery();
	return data?.connectCode ?? "";
}

export function useUserNickname() {
	const { data } = useUserInfoQuery();
	return data?.nickname ?? "";
}

export function useInvalidateUserInfo() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: USER_INFO_QUERY_KEY });
}
