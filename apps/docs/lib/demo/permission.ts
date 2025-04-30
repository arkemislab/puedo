import type { User } from "@/types/user";
import { Puedo, type Role } from "puedo";

const permissions = {
	total_revenue: false,
	new_customers: false,
	active_accounts: false,
	growth_rate: false,
	total_visitors: false,
};

const adminRole = {
	id: "admin",
	permissions: {
		total_revenue: true,
		new_customers: true,
		active_accounts: true,
		growth_rate: true,
		total_visitors: true,
	},
};

const userRole: Role<User> = {
	id: "user",
	permissions: {
		total_revenue: true,
		growth_rate: (user) => user.credits > 10,
	},
};

export const puedo = new Puedo({
	accessorKey: "role",
	roles: [adminRole, userRole],
	permissions,
});
