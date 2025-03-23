export type Permission = { [key: string]: boolean | Permission };

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Role<T extends Permission = Permission> = {
  id: string;
  permissions: DeepPartial<T>;
};
