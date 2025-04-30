import { CodeBlock } from "@/components/code-block";

export function DemoCode() {
	return (
		<CodeBlock
			wrapper={{
				title: "permissions.ts",
				viewportProps: {
					className: "flex-1",
				},
			}}
			lang="ts"
			code={`const permissions = {
  total_revenue: false,
  new_customers: false,
  active_accounts: false,
  growth_rate: false,
  total_visitors: false,          
}

const adminRole = { 
  id: 'admin',
  permissions: {
    total_revenue: true,
    new_customers: true,
    active_accounts: true,
    growth_rate: true,
    total_visitors: true,
  },
}

const userRole = {
  id: 'user',
  permissions: {
    total_revenue: true,
    growth_rate: (user) => user.credits > 10 
  },
}

const puedo = new Puedo({
  accessorKey: "role",
  roles: [adminRole, userRole] 
  permissions           
})
`}
		/>
	);
}
