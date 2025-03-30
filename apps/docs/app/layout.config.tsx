import { Logo } from "@/components/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
	githubUrl: "https://github.com/arkemis-labs/puedo",
	nav: {
		title: (
			<>
				<Logo className="h-4" />
				¿puedo?
			</>
		),
	},
};
