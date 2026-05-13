import React from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Users, Wallet, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import StatsCard from '../ui/StatsCard';

import PayrollTrend from './PayrollTrend';
import DepartmentSplit from './DepartmentSplit';
import RecentPayroll from './RecentPayroll';
import UpcomingPayment from './UpcomingPayment';

function Dashboard() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-medium text-primary/80">Welcome back, Aisha</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
            Payroll <span className="text-gradient">Overview</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex">Export Report</Button>
            <Button icon={ArrowUpRight} className="w-full sm:w-auto">Run payroll</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Total Payroll" value="₹1.84M" delta="12.4%" icon={Wallet} accent="primary" />
        <StatsCard label="Total Employees" value="1,284" delta="3.2%" icon={Users} accent="info" />
        <StatsCard label="Avg. Salary" value="₹6,420" delta="2.1%" icon={TrendingUp} accent="success" />
        <StatsCard label="Pending Approvals" value="18" delta="5.4%" deltaType="down" icon={Clock} accent="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <PayrollTrend />
        </div>
        <div className="lg:col-span-1">
            <DepartmentSplit />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RecentPayroll />
        </div>
        <div className="lg:col-span-1">
            <UpcomingPayment />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;