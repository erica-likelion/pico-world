interface FormatDateOptions {
	korean?: boolean;
}

export function formatDate(
	dateString: string,
	{ korean = false }: FormatDateOptions = {},
) {
	const [year, month, day] = dateString.split("-");

	if (!year || !month || !day) {
		return dateString;
	}

	if (korean) {
		return `${parseInt(year, 10)}년 ${parseInt(month, 10)}월 ${parseInt(
			day,
			10,
		)}일`;
	}

	return `${year}. ${month}. ${day}`;
}

export function formatTimeAgo(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);
	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	if (diffInMinutes < 1) {
		return "방금 전";
	}
	if (diffInMinutes < 60) {
		return `${diffInMinutes}분 전`;
	}
	if (diffInHours < 24) {
		return `${diffInHours}시간 전`;
	}
	if (diffInDays < 7) {
		return `${diffInDays}일 전`;
	}
	return formatDate(dateString.split("T")[0], { korean: true });
}
