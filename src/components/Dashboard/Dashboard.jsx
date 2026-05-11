import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wallet, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

import PayrollTrend from './PayrollTrend';
import DepartmentSplit from './DepartmentSplit';
import RecentPayroll from './RecentPayroll';
import UpcomingPayment from './UpcomingPayment';

const StatsCard = ({ label, value, delta, icon: Icon, accent, deltaType = "up" }) => (
  <Card className="relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
      </div>
      <div className={`p-3 rounded-xl ${
        accent === 'primary' ? 'bg-primary/10 text-primary' :
        accent === 'info' ? 'bg-info/10 text-info' :
        accent === 'success' ? 'bg-success/10 text-success' :
        'bg-warning/10 text-warning'
      }`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        deltaType === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
      }`}>
        {deltaType === 'up' ? '+' : '-'}{delta}
      </span>
      <span className="text-xs text-muted-foreground">vs last month</span>
    </div>
  </Card>
);

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Welcome back, Aisha</div>
          <h1 className="mt-1 text-2xl md:text-[28px] font-semibold tracking-tight">
            Here's what's happening with <span className="text-gradient">your payroll</span>
          </h1>
        </div>
        <Button icon={ArrowUpRight}>Run payroll</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Total Payroll" value="$1.84M" delta="12.4%" icon={Wallet} accent="primary" />
        <StatsCard label="Total Employees" value="1,284" delta="3.2%" icon={Users} accent="info" />
        <StatsCard label="Avg. Salary" value="$6,420" delta="2.1%" icon={TrendingUp} accent="success" />
        <StatsCard label="Pending Approvals" value="18" delta="5.4%" deltaType="down" icon={Clock} accent="warning" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PayrollTrend />
        <DepartmentSplit />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RecentPayroll />
        <UpcomingPayment />
      </div>
    </div>
  );
};

export default Dashboard;