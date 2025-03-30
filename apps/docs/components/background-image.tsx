"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import * as React from "react";

export function BackgroundImage({ className }: { className?: string }) {
	const [isMounted, setIsMounted] = React.useState(false);
	const { resolvedTheme } = useTheme();
	let src = "";

	switch (resolvedTheme) {
		case "light":
			src = "/background-light.webp";
			break;
		case "dark":
			src = "/background-dark.webp";
			break;
		default:
			src =
				"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
			break;
	}

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Image
			src={src}
			alt="Logo"
			fill
			priority
			unoptimized
			className={cn("object-cover object-[75%_0%]", className)}
		/>
	);
}
