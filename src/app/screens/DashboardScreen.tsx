import { DashboardDataBento } from "app/components/DashboardDataBento";
import { PageTitleAndDescription } from "app/components/PageTitleAndDescription";

export const DashboardScreen = () => {
  return (
    <div>
      <PageTitleAndDescription
        title="Dashboard"
        description="Your business at a glance"
      />
      <DashboardDataBento />
    </div>
  );
};
