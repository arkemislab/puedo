import { ChartAreaInteractive } from "@/components/demo/chart-area-interactive";
import { SectionCards } from "@/components/demo/section-cards";
import { DemoCode } from "./demo-code";
import { UserProvider } from "./user-context";
import { UserSelect } from "./user-select";

export function Demo() {
  return (
    <UserProvider>
      <div className="flex flex-1 flex-col border rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Demo</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <UserSelect />
            <DemoCode />
          </div>
          <div className="@container/main flex flex-1 flex-col gap-2 col-span-3">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionCards />
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
