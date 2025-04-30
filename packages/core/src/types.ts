export type Permission<U> = {
	[key: string]: boolean | ((user: U) => boolean) | Permission<U>;
};

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Role<U, T extends Permission<U> = Permission<U>> = {
	id: string;
	permissions: DeepPartial<T>;
};
