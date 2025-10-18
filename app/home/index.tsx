import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useEffect } from "react";

export default function Home() {
	const { show } = useBottomNavStore();

	useEffect(() => {
		show();
	}, [show]);

	return (
		<>
			<TopNav title="홈" />
		</>
	);
}
