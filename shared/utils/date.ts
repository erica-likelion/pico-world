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
