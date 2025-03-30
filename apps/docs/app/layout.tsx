import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "¿puedo?",
	description: "Deal with access control in a simple way.",
	metadataBase: new URL("https://puedo.arkehub.com"),
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-dvh">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
