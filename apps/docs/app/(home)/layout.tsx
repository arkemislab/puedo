import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<HomeLayout
			{...baseOptions}
			className="pt-0"
			links={[
				{
					text: "Documentation",
					url: "/docs",
					active: "nested-url",
				},
				{
					text: "Demo",
					url: "/demo",
					active: "nested-url",
				},
			]}
		>
			{children}
		</HomeLayout>
	);
}
