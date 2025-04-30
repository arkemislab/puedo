import { createPermissionSchema, roleSchema } from "./schema";
import type { Permission, Role } from "./types";
import { deepmerge } from "./utils";

type PathToKey<T> = T extends string
	? ""
	: {
			[K in keyof T]: T[K] extends object
				? `${string & K}.${PathToKey<T[K]>}`
				: string & K;
		}[keyof T];

type PuedoOptions<U, T extends Permission<U>> = {
	accessorKey: string;
	roles: Role<U, T>[];
	permissions: T;
};

export class Puedo<U, T extends Permission<U>> {
	accessorKey: string;
	roles: Role<U, T>[];
	permissions: T;

	private generateRolePermission(roles: Role<U, T>[]) {
		const schema = roleSchema(
			createPermissionSchema(this.permissions as Permission<unknown>),
		);

		for (const role of roles) {
			const result = schema.safeParse(role);

			if (!result.success) {
				throw new Error(result.error.message);
			}
		}

		return roles.map((role) => ({
			...role,
			permissions: deepmerge(this.permissions, role.permissions),
		}));
	}

	constructor(options: PuedoOptions<U, T>) {
		this.accessorKey = options.accessorKey;
		this.permissions = options.permissions;
		this.roles = this.generateRolePermission(options.roles);
	}

	private checkPermission(target: U, obj: any, path: string): boolean {
		return path.split(".").reduce((current, key) => {
			if (current && typeof current === "object") {
				const condition = current[key];

				if (typeof condition === "function") {
					return condition(target);
				}

				return condition;
			}

			return false;
		}, obj);
	}

	can(target: any, key: PathToKey<T>) {
		const role = this.roles.find(
			(role) => role.id === target?.[this.accessorKey],
		);

		if (!role) {
			console.warn(
				"Role not found for provided target be sure to include specified accessorKey.",
			);
			return false;
		}

		return this.checkPermission(target, role.permissions, key);
	}
}
