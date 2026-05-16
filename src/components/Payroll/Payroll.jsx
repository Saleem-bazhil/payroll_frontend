import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "../ui/PageHeader";
import StatsCard from "../ui/StatsCard";
import Toolbar from "../ui/Toolbar";
import DataTable from "../ui/DataTable";
import { Wallet, TrendingUp, Clock, CheckCircle2, Play, MoreHorizontal, Loader2 } from "lucide-react";
import { api } from "@/api/Api";

const PayrollPage = () => {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({ thisMonth: "₹0", ytdTotal: "₹0", pending: "₹0", processed: "0%" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cyclesRes, statsRes] = await Promise.all([
        api.get("/api/payslips/cycles_summary/").catch(e => {
          console.error("Cycle API Error Details:", e);
          throw new Error(`Summary Endpt Failure: ${e.response?.status || e.message}`);
        }),
        api.get("/api/payslips/company_stats/").catch(e => {
          console.error("Stats API Error Details:", e);
          throw new Error(`KPI Endpt Failure: ${e.response?.status || e.message}`);
        })
      ]);

      setRuns(cyclesRes.data || []);
      if (statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error("Aggregated Fetch Exception:", err);
      setError(err.message || "Network communication error or API disconnect");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PageHeader
        title="Payroll Overview"
        description="Review company-wide processing history and financial cycles."
        actions={<Button icon={Play} onClick={fetchData}>Refresh Data</Button>}
      />

      {error && (
        <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-2xl shadow-sm animate-pulse-subtle">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-100 rounded-full text-red-600">
              <Clock className="h-4 w-4 rotate-45" />
            </div>
            <div>
              <h4 className="font-semibold text-red-800 text-sm">Live Feed Disconnection Detected</h4>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
              <p className="text-[10px] text-red-500/70 mt-1 font-mono">Diagnosis: Terminal or browser environment mismatch. Please verify backend console status.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="This Month Net" value={stats.thisMonth} delta="Live Data" icon={Wallet} accent="primary" />
        <StatsCard label="YTD Total Net" value={stats.ytdTotal} delta="Live Cumulative" icon={TrendingUp} accent="success" />
        <StatsCard label="Pending Adjusts" value={stats.pending} icon={Clock} accent="warning" />
        <StatsCard label="Month Completion" value={stats.processed} icon={CheckCircle2} accent="info" />
      </div>

      <Toolbar />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-2 bg-card border border-border rounded-2xl">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm">Aggregating real-time payroll cycles...</p>
        </div>
      ) : (
        <DataTable
          data={runs}
          emptyMessage="No payroll cycles found. Generate payslips to create payroll cycle history."
          columns={[
            { key: "period", label: "Period", render: (r) => <span className="font-semibold text-sm tracking-tight">{r.period}</span> },
            { key: "employees", label: "Total Staff", render: (r) => <span className="text-sm text-muted-foreground font-medium">{r.employees}</span> },
            { key: "gross", label: "Total Gross Payout", render: (r) => <span className="text-sm">{r.gross}</span> },
            { key: "net", label: "Total Net Distributed", render: (r) => <span className="font-bold text-sm text-foreground">{r.net}</span> },
            {
              key: "status", label: "Status",
              render: (r) => (
                <Badge variant={r.status === "Completed" ? "success" : "warning"} className="capitalize">{r.status}</Badge>
              ),
            },
            {
              key: "act", label: "",
              render: () => (
                <div className="flex items-center justify-end gap-1">
                  <button className="rounded-lg border border-border px-3 h-8 text-xs hover:bg-muted font-medium transition-colors">Details</button>
                  <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default PayrollPage;
