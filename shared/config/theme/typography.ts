import { css } from "styled-components/native";
import { rem } from "./metrics";

export const typography = {
	h1: css`
		font-family: "Pretendard";
		font-size: ${rem(32)};
		line-height: ${rem(40)};
		font-weight: 700;
		letter-spacing: ${rem(-0.64)};
	`,
	h2: css`
		font-family: "Pretendard";
		font-size: ${rem(28)};
		line-height: ${rem(36)};
		font-weight: 700;
		letter-spacing: ${rem(-0.56)};
	`,
	h3: css`
		font-family: "Pretendard";
		font-size: ${rem(24)};
		line-height: ${rem(32)};
		font-weight: 700;
		letter-spacing: ${rem(-0.48)};
	`,
	h4: css`
		font-family: "Pretendard";
		font-size: ${rem(20)};
		line-height: ${rem(28)};
		font-weight: 700;
		letter-spacing: ${rem(-0.4)};
	`,
	"title1-bold": css`
		font-family: "Pretendard";
		font-size: ${rem(18)};
		line-height: ${rem(24)};
		font-weight: 700;
		letter-spacing: ${rem(-0.36)};
	`,
	"title1-semibold": css`
		font-family: "Pretendard";
		font-size: ${rem(18)};
		line-height: ${rem(24)};
		font-weight: 600;
		letter-spacing: ${rem(-0.36)};
	`,
	"title1-medium": css`
		font-family: "Pretendard";
		font-size: ${rem(18)};
		line-height: ${rem(24)};
		font-weight: 500;
		letter-spacing: ${rem(-0.36)};
	`,
	"title2-bold": css`
		font-family: "Pretendard";
		font-size: ${rem(16)};
		line-height: ${rem(20)};
		font-weight: 700;
		letter-spacing: ${rem(-0.32)};
	`,
	"title2-semibold": css`
		font-family: "Pretendard";
		font-size: ${rem(16)};
		line-height: ${rem(20)};
		font-weight: 600;
		letter-spacing: ${rem(-0.32)};
	`,
	"title2-medium": css`
		font-family: "Pretendard";
		font-size: ${rem(16)};
		line-height: ${rem(20)};
		font-weight: 500;
		letter-spacing: ${rem(-0.32)};
	`,
	"title3-bold": css`
		font-family: "Pretendard";
		font-size: ${rem(14)};
		line-height: ${rem(16)};
		font-weight: 700;
		letter-spacing: ${rem(-0.28)};
	`,
	"title3-semibold": css`
		font-family: "Pretendard";
		font-size: ${rem(14)};
		line-height: ${rem(16)};
		font-weight: 600;
		letter-spacing: ${rem(-0.28)};
	`,
	"title3-medium": css`
		font-family: "Pretendard";
		font-size: ${rem(14)};
		line-height: ${rem(16)};
		font-weight: 500;
		letter-spacing: ${rem(-0.28)};
	`,
	"title4-bold": css`
		font-family: "Pretendard";
		font-size: ${rem(12)};
		line-height: ${rem(16)};
		font-weight: 700;
		letter-spacing: ${rem(-0.24)};
	`,
	"title4-semibold": css`
		font-family: "Pretendard";
		font-size: ${rem(12)};
		line-height: ${rem(16)};
		font-weight: 600;
		letter-spacing: ${rem(-0.24)};
	`,
	"title4-medium": css`
		font-family: "Pretendard";
		font-size: ${rem(12)};
		line-height: ${rem(16)};
		font-weight: 500;
		letter-spacing: ${rem(-0.24)};
	`,
	b1: css`
		font-family: "Pretendard";
		font-size: ${rem(18)};
		line-height: ${rem(28)};
		font-weight: 400;
		letter-spacing: ${rem(-0.36)};
	`,
	b2: css`
		font-family: "Pretendard";
		font-size: ${rem(16)};
		line-height: ${rem(26)};
		font-weight: 400;
		letter-spacing: ${rem(-0.32)};
	`,
	b3: css`
		font-family: "Pretendard";
		font-size: ${rem(14)};
		line-height: ${rem(20)};
		font-weight: 400;
		letter-spacing: ${rem(-0.28)};
	`,
};
