import { describe, expect, it } from "vitest";
import { Puedo } from "../index";
import type { Permission, Role } from "../types";

type User = {
	role: string;
	canSeeButton3?: boolean;
	canSeeButton4?: boolean;
};

const adminUser: User = {
	role: "admin",
	canSeeButton3: true,
};

const adminUser2: User = {
	role: "admin",
	canSeeButton3: false,
	canSeeButton4: false,
};

const customerUser: User = {
	role: "customer",
};

const nonExistingUser: User = {
	role: "non_existing",
};

type PagePermissions = {
	header: {
		button1: boolean;
		button2: boolean;
		button3: (user: User) => boolean;
		button4: boolean | ((user: User) => boolean);
	};
};

type RolePermissions = {
	page: PagePermissions;
};

const permissions: Permission<User> = {
	page: {
		header: {
			button1: false,
			button2: true,
			button3: (user) => !!user.canSeeButton3,
			button4: false,
		},
	},
};

const roles: Role<User, typeof permissions>[] = [
	{
		id: "admin",
		permissions: {
			page: {
				header: {
					button1: true,
					button2: false,
					button4: (user) => !!user.canSeeButton4,
				},
			},
		},
	},
	{
		id: "customer",
		permissions: {
			page: {
				header: {
					button1: false,
					button4: false,
				},
			},
		},
	},
];

const invalidRoles: Role<User, typeof permissions>[] = [
	{
		id: "admin",
		permissions: {
			page: {
				header: {
					button1: true,
					button2: false,
					extraButton: true,
				},
			},
		},
	},
];

const defaultOptions = {
	accessorKey: "role",
	roles,
	permissions,
};

describe("Puedo", () => {
	it("should create a new instance with provided options", () => {
		const puedo = new Puedo(defaultOptions);

		expect(puedo.accessorKey).toBe("role");

		expect(puedo.roles).toHaveLength(2);
		expect(puedo.roles[0]?.id).toBe("admin");
		expect(puedo.roles[1]?.id).toBe("customer");

		const adminPermissions = puedo.roles[0]?.permissions as {
			page: { header: Record<string, boolean | ((user: User) => boolean)> };
		};
		expect(adminPermissions?.page.header.button1).toBe(true);
		expect(adminPermissions?.page.header.button2).toBe(false);
		expect(typeof adminPermissions?.page.header.button3).toBe("function");
		expect(typeof adminPermissions?.page.header.button4).toBe("function");

		const customerPermissions = puedo.roles[1]?.permissions as {
			page: { header: Record<string, boolean | ((user: User) => boolean)> };
		};
		expect(customerPermissions?.page.header.button1).toBe(false);
		expect(customerPermissions?.page.header.button2).toBe(true);
		expect(typeof customerPermissions?.page.header.button3).toBe("function");
		expect(customerPermissions.page.header.button4).toBe(false);
	});

	it("should return false if the role is not found", () => {
		const puedo = new Puedo(defaultOptions);

		expect(puedo.can(nonExistingUser, "page.header.button1")).toBe(false);
	});

	it("should return true or false based on the permission", () => {
		const puedo = new Puedo(defaultOptions);

		expect(puedo.can(adminUser, "page.header.button1")).toBe(true);
		expect(puedo.can(customerUser, "page.header.button1")).toBe(false);
		expect(puedo.can(adminUser, "page.header.button2")).toBe(false);
		expect(puedo.can(customerUser, "page.header.button2")).toBe(true);
		expect(puedo.can(adminUser, "page.header.button3")).toBe(true);
		expect(puedo.can(adminUser2, "page.header.button3")).toBe(false);
		expect(puedo.can(customerUser, "page.header.button3")).toBe(false);
		expect(puedo.can(adminUser, "page.header.button4")).toBe(false);
		expect(puedo.can(adminUser2, "page.header.button4")).toBe(false);
		expect(puedo.can(customerUser, "page.header.button4")).toBe(false);
	});

	it("should throw an error when a role contains extra keys not present in permission", () => {
		const invalidOptions = {
			...defaultOptions,
			roles: invalidRoles,
		};

		expect(() => new Puedo(invalidOptions)).toThrow();
	});
});
