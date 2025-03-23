"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { puedo } from "@/lib/demo/permission";
import { useUser } from "./user-context";

interface SectionCardsItemProps {
  description: string;
  title: string;
  trend: {
    icon: React.ReactNode;
    value: string;
  };
  footer: {
    main: string;
    sub: string;
  };
  isBlurred?: boolean;
}

function SectionCardsItem({
  description,
  title,
  trend,
  footer,
  isBlurred = false,
}: SectionCardsItemProps) {
  return (
    <Card className="@container/card relative overflow-hidden">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {trend.icon}
            {trend.value}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footer.main} {trend.icon}
        </div>
        <div className="text-muted-foreground">{footer.sub}</div>
      </CardFooter>
      {isBlurred && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm bg-background/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold">Pay to see</div>
              <div className="text-sm text-muted-foreground">
                Unlock premium content
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export function SectionCards() {
  const { currentUser } = useUser();
  const canSeeTotalRevenue = puedo.can(currentUser, "total_revenue");
  const canSeeNewCustomers = puedo.can(currentUser, "new_customers");
  const canSeeActiveAccounts = puedo.can(currentUser, "active_accounts");
  const canSeeGrowthRate = puedo.can(currentUser, "growth_rate");

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @lg/main:grid-cols-4">
      <SectionCardsItem
        description="Total Revenue"
        title="$1,250.00"
        trend={{
          icon: <IconTrendingUp />,
          value: "+12.5%",
        }}
        footer={{
          main: "Trending up this month",
          sub: "Visitors for the last 6 months",
        }}
        isBlurred={!canSeeTotalRevenue}
      />
      <SectionCardsItem
        description="New Customers"
        title="1,234"
        trend={{
          icon: <IconTrendingDown />,
          value: "-20%",
        }}
        footer={{
          main: "Down 20% this period",
          sub: "Acquisition needs attention",
        }}
        isBlurred={!canSeeNewCustomers}
      />
      <SectionCardsItem
        description="Active Accounts"
        title="45,678"
        trend={{
          icon: <IconTrendingUp />,
          value: "+12.5%",
        }}
        footer={{
          main: "Strong user retention",
          sub: "Engagement exceed targets",
        }}
        isBlurred={!canSeeActiveAccounts}
      />
      <SectionCardsItem
        description="Growth Rate"
        title="4.5%"
        trend={{
          icon: <IconTrendingUp />,
          value: "+4.5%",
        }}
        footer={{
          main: "Steady performance increase",
          sub: "Meets growth projections",
        }}
        isBlurred={!canSeeGrowthRate}
      />
    </div>
  );
}
