export const KAKAO_DEFAULT_PROFILE_URL =
	"https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg";

export function useDefaultImage(imageUrl?: string | null): boolean {
	return !imageUrl || imageUrl === KAKAO_DEFAULT_PROFILE_URL;
}
