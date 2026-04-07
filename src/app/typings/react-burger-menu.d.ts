declare module "react-burger-menu" {
	import * as React from "react";

	interface MenuProps {
		right?: boolean;
		styles?: Record<string, unknown>;
		children?: React.ReactNode;
	}

	export const slide: React.ComponentType<MenuProps>;
}