import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "../ui/PageHeader";
import DataTable from "../ui/DataTable";
import StatsCard from "../ui/StatsCard";
import { ShieldCheck, Download, AlertTriangle, FileCheck, Percent } from "lucide-react";

const filings = [
  { name: "Federal Income Tax", period: "Q3 2025", due: "Nov 28, 2025", amount: "$284,500", status: "Pending" },
  { name: "State Tax Filing", period: "Q3 2025", due: "Dec 05, 2025", amount: "$92,140", status: "Pending" },
  { name: "Social Security", period: "Oct 2025", due: "Nov 15, 2025", amount: "$118,820", status: "Filed" },
  { name: "Medicare Contribution", period: "Oct 2025", due: "Nov 15, 2025", amount: "$42,360", status: "Filed" },
  { name: "Unemployment Tax", period: "Q3 2025", due: "Oct 31, 2025", amount: "$28,540", status: "Filed" },
];

const CompliancePage = () => {
  return (
    <div>
      <PageHeader title="Tax & Compliance" description="Stay ahead of filings, audits and regulatory requirements." />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="Compliance Score" value="98.4%" delta="1.2%" icon={ShieldCheck} accent="success" />
        <StatsCard label="Pending Filings" value="2" icon={AlertTriangle} accent="warning" />
        <StatsCard label="Filed YTD" value="48" delta="12%" icon={FileCheck} accent="info" />
        <StatsCard label="Effective Tax Rate" value="22.4%" icon={Percent} accent="primary" />
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white shadow-glow">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Compliance Overview</h3>
              <p className="text-sm text-muted-foreground mt-0.5">All filings up to date through October 2025. 2 upcoming deadlines this month.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={Download}>Audit log</Button>
            <Button>Run review</Button>
          </div>
        </div>
      </Card>

      <DataTable
        data={filings}
        columns={[
          { key: "name", label: "Filing", render: (f) => <span className="font-medium text-sm">{f.name}</span> },
          { key: "period", label: "Period", render: (f) => <span className="text-sm text-muted-foreground">{f.period}</span> },
          { key: "due", label: "Due Date", render: (f) => <span className="text-sm">{f.due}</span> },
          { key: "amount", label: "Amount", render: (f) => <span className="text-sm font-semibold">{f.amount}</span> },
          {
            key: "status", label: "Status",
            render: (f) => <Badge variant={f.status === "Filed" ? "success" : "warning"}>{f.status}</Badge>,
          },
          {
            key: "act", label: "",
            render: () => (
              <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                <Download className="h-4 w-4" />
              </button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CompliancePage;