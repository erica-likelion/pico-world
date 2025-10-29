import { MyPageSelect } from "@/features/my/ui";
import { TopNav } from "@/widgets/TopNav/ui";

export default function My() {
	return (
		<>
			<TopNav title="마이" />
			<MyPageSelect />
		</>
	);
}
