import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "../ui/PageHeader";
import Toolbar from "../ui/Toolbar";
import DataTable from "../ui/DataTable";
import { Download, Eye, FileText, Sparkles } from "lucide-react";

const slips = [
  { name: "Sophia Chen", id: "PSL-1142", period: "Nov 2025", amount: "₹8,420", status: "Generated" },
  { name: "Marcus Reyes", id: "PSL-1143", period: "Nov 2025", amount: "₹6,180", status: "Generated" },
  { name: "Aiko Tanaka", id: "PSL-1144", period: "Nov 2025", amount: "₹5,940", status: "Pending" },
  { name: "Liam O'Brien", id: "PSL-1145", period: "Nov 2025", amount: "₹4,750", status: "Generated" },
  { name: "Priya Patel", id: "PSL-1146", period: "Nov 2025", amount: "₹5,210", status: "Pending" },
  { name: "Diego Alvarez", id: "PSL-1147", period: "Nov 2025", amount: "₹7,830", status: "Generated" },
];

const PayslipsPage = () => {
  return (
    <div>
      <PageHeader
        title="Payslips"
        description="Generate, preview and distribute payslips."
        actions={<Button icon={Sparkles}>Generate all</Button>}
      />

      <Toolbar />

      <DataTable
        data={slips}
        columns={[
          {
            key: "name", label: "Employee",
            render: (s) => (
              <div className="flex items-center gap-3">
                <Avatar name={s.name} />
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.id}</div>
                </div>
              </div>
            ),
          },
          { key: "period", label: "Period", render: (s) => <span className="text-sm">{s.period}</span> },
          { key: "amount", label: "Amount", render: (s) => <span className="text-sm font-semibold">{s.amount}</span> },
          {
            key: "status", label: "Status",
            render: (s) => <Badge variant={s.status === "Generated" ? "success" : "warning"}>{s.status}</Badge>,
          },
          {
            key: "act", label: "",
            render: () => (
              <div className="flex items-center justify-end gap-2">
                <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PayslipsPage;