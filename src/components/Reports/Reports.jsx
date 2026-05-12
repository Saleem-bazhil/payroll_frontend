import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "../ui/PageHeader";
import { Download, TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts";

const salary = [
  { dept: "Eng", base: 540, bonus: 120 },
  { dept: "Sales", base: 320, bonus: 180 },
  { dept: "Mkt", base: 240, bonus: 60 },
  { dept: "Ops", base: 220, bonus: 40 },
  { dept: "HR", base: 140, bonus: 30 },
  { dept: "Design", base: 180, bonus: 50 },
];

const trend = [
  { m: "Jun", actual: 168, projected: 165 },
  { m: "Jul", actual: 174, projected: 172 },
  { m: "Aug", actual: 181, projected: 178 },
  { m: "Sep", actual: 175, projected: 184 },
  { m: "Oct", actual: 180, projected: 188 },
  { m: "Nov", actual: 184, projected: 192 },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Reports & Analytics"
        description="Insights into compensation, trends and forecasting."
        actions={<Button icon={Download} className="w-full sm:w-auto">Export report</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="Avg Cost / Employee" value="$6,420" delta="2.1%" icon={DollarSign} accent="primary" />
        <StatsCard label="Total Headcount" value="1,284" delta="3.2%" icon={Users} accent="info" />
        <StatsCard label="Bonus Ratio" value="14.6%" delta="1.4%" icon={TrendingUp} accent="success" />
        <StatsCard label="Reports Generated" value="248" delta="22%" icon={BarChart3} accent="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 md:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold leading-none">Salary Breakdown</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Base vs bonus by department (in $K)</p>
          </div>
          <div className="h-[320px] w-full -ml-4 pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salary}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,127,127,0.15)" vertical={false} />
                <XAxis dataKey="dept" stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, boxShadow: 'var(--shadow-card)' }} 
                />
                <Bar dataKey="base" stackId="a" fill="#8B5CF6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="bonus" stackId="a" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 md:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold leading-none">Actual vs Projected</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Payroll forecast accuracy ($K)</p>
          </div>
          <div className="h-[320px] w-full -ml-4 pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,127,127,0.15)" vertical={false} />
                <XAxis dataKey="m" stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, boxShadow: 'var(--shadow-card)' }} 
                />
                <Legend wrapperStyle={{ paddingTop: 20, fontSize: 12 }} />
                <Line type="monotone" dataKey="actual" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: '#8B5CF6' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="projected" stroke="#06B6D4" strokeWidth={3} strokeDasharray="6 4" dot={{ r: 4, fill: '#06B6D4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
