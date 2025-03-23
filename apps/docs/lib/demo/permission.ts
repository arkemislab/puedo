import { Puedo } from "puedo";

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

const userRole = {
  id: "user",
  permissions: {
    total_revenue: true,
  },
};

export const puedo = new Puedo({
  accessorKey: "role",
  roles: [adminRole, userRole],
  permissions,
});
