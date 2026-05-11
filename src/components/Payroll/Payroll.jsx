import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "../ui/PageHeader";
import StatsCard from "../ui/StatsCard";
import Toolbar from "../ui/Toolbar";
import DataTable from "../ui/DataTable";
import { Wallet, TrendingUp, Clock, CheckCircle2, Play, MoreHorizontal } from "lucide-react";

const runs = [
  { period: "Nov 2025", employees: 1284, gross: "$1,842,500", net: "$1,432,820", status: "Processing" },
  { period: "Oct 2025", employees: 1276, gross: "$1,798,300", net: "$1,398,640", status: "Completed" },
  { period: "Sep 2025", employees: 1268, gross: "$1,754,200", net: "$1,365,180", status: "Completed" },
  { period: "Aug 2025", employees: 1255, gross: "$1,720,600", net: "$1,338,420", status: "Completed" },
  { period: "Jul 2025", employees: 1248, gross: "$1,684,900", net: "$1,310,210", status: "Completed" },
];

const PayrollPage = () => {
  return (
    <div>
      <PageHeader
        title="Payroll"
        description="Run, review and approve payroll cycles."
        actions={<Button icon={Play}>Run payroll</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="This Month" value="$1.84M" delta="2.4%" icon={Wallet} accent="primary" />
        <StatsCard label="YTD Total" value="$18.6M" delta="14.2%" icon={TrendingUp} accent="success" />
        <StatsCard label="Pending" value="$184K" icon={Clock} accent="warning" />
        <StatsCard label="Processed" value="98.2%" delta="1.1%" icon={CheckCircle2} accent="info" />
      </div>

      <Toolbar />

      <DataTable
        data={runs}
        columns={[
          { key: "period", label: "Period", render: (r) => <span className="font-medium text-sm">{r.period}</span> },
          { key: "employees", label: "Employees", render: (r) => <span className="text-sm">{r.employees}</span> },
          { key: "gross", label: "Gross", render: (r) => <span className="text-sm">{r.gross}</span> },
          { key: "net", label: "Net", render: (r) => <span className="font-semibold text-sm">{r.net}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <Badge variant={r.status === "Completed" ? "success" : "warning"}>{r.status}</Badge>
            ),
          },
          {
            key: "act", label: "",
            render: () => (
              <div className="flex items-center justify-end gap-1">
                <button className="rounded-lg border border-border px-3 h-8 text-xs hover:bg-muted">View</button>
                <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PayrollPage;