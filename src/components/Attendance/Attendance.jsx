import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Timer, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import StatsCard from "../ui/StatsCard";
import DataTable from "../ui/DataTable";

const records = [
  { name: "Sophia Chen", dept: "Engineering", clockIn: "09:02 AM", clockOut: "06:14 PM", hours: "8.2", overtime: "0.5", status: "Present" },
  { name: "Marcus Reyes", dept: "Sales", clockIn: "08:48 AM", clockOut: "07:30 PM", hours: "9.0", overtime: "1.7", status: "Overtime" },
  { name: "Aiko Tanaka", dept: "Design", clockIn: "—", clockOut: "—", hours: "0", overtime: "0", status: "Absent" },
  { name: "Liam O'Brien", dept: "Operations", clockIn: "09:15 AM", clockOut: "06:00 PM", hours: "7.7", overtime: "0", status: "Present" },
  { name: "Priya Patel", dept: "Marketing", clockIn: "10:35 AM", clockOut: "06:48 PM", hours: "7.2", overtime: "0", status: "Late" },
  { name: "Diego Alvarez", dept: "Engineering", clockIn: "09:00 AM", clockOut: "07:55 PM", hours: "9.5", overtime: "1.5", status: "Overtime" },
];

const AttendancePage = () => {
  return (
    <div>
      <PageHeader title="Attendance" description="Track daily attendance, overtime and absences." />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="Present Today" value="1,142" delta="2.4%" icon={CheckCircle2} accent="success" />
        <StatsCard label="On Leave" value="64" delta="1.1%" icon={Timer} accent="warning" />
        <StatsCard label="Absent" value="22" delta="3.2%" deltaType="down" icon={AlertCircle} accent="primary" />
        <StatsCard label="Overtime Hours" value="487h" delta="8.6%" icon={Clock} accent="info" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="rounded-xl border border-border bg-card px-4 h-9 flex items-center text-sm font-medium">
            November 26, 2025
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      <DataTable
        data={records}
        columns={[
          {
            key: "name", label: "Employee",
            render: (r) => (
              <div className="flex items-center gap-3">
                <Avatar name={r.name} />
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.dept}</div>
                </div>
              </div>
            ),
          },
          { key: "clockIn", label: "Clock In", render: (r) => <span className="text-sm">{r.clockIn}</span> },
          { key: "clockOut", label: "Clock Out", render: (r) => <span className="text-sm">{r.clockOut}</span> },
          { key: "hours", label: "Hours", render: (r) => <span className="text-sm font-medium">{r.hours}h</span> },
          {
            key: "overtime", label: "Overtime",
            render: (r) => Number(r.overtime) > 0 ? <Badge variant="info">+{r.overtime}h</Badge> : <span className="text-xs text-muted-foreground">—</span>,
          },
          {
            key: "status", label: "Status",
            render: (r) => (
              <Badge variant={r.status === "Present" ? "success" : r.status === "Absent" ? "error" : r.status === "Late" ? "warning" : "info"}>
                {r.status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AttendancePage;