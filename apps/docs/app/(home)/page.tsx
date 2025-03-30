import { BackgroundImage } from "@/components/background-image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "¿puedo?",
	description: "Deal with access control in a simple way.",
};

export default function HomePage() {
	return (
		<main>
			<div className="relative h-dvh w-screen">
				<BackgroundImage />
				<div className="relative z-10 flex h-full flex-col w-full items-center justify-center px-8 text-center">
					<Logo className="h-32 mb-16" />
					<h1 className="text-6xl font-bold">¿puedo?</h1>
					<p className="text-xl my-8">
						Deal with access control in a simple way.
					</p>
					<Link href="/docs">
						<Button>Read the docs</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
