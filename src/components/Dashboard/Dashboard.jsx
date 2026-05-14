import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Users, Wallet, TrendingUp, Clock, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import StatsCard from '../ui/StatsCard';

import PayrollTrend from './PayrollTrend';
import DepartmentSplit from './DepartmentSplit';
import RecentPayroll from './RecentPayroll';
import UpcomingPayment from './UpcomingPayment';

import GreetingHeader from '../ui/GreetingHeader';
import { api } from "@/api/Api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/payslips/dashboard_summary/");
      setSummary(res.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setError("Failed to aggregate real-time metrics from the core system.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <div className="text-center">
          <h3 className="font-semibold text-foreground text-lg">Loading Enterprise Dashboard</h3>
          <p className="text-sm mt-0.5">Querying real-time telemetry records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-red-200 bg-red-50 rounded-3xl text-red-800 max-w-lg mx-auto my-12 shadow-sm">
        <div className="flex items-center gap-3 font-semibold text-lg text-red-900">
          <AlertCircle className="h-5 w-5" />
          System Feed Disconnected
        </div>
        <p className="text-sm mt-2 text-red-700">{error}</p>
        <Button onClick={fetchDashboard} className="mt-4" variant="outline">Retry Fetch</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      <GreetingHeader subtitle="Manage your organization's payroll cycle, view reports, and track overall expense efficiency." />
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          Payroll <span className="text-gradient">Overview</span>
        </h2>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex" onClick={fetchDashboard}>Refresh Metrics</Button>
            <Button icon={ArrowUpRight} className="w-full sm:w-auto">Run payroll</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Overall Payroll" value={summary?.totalPayroll || "₹0"} delta="All Time" icon={Wallet} accent="primary" />
        <StatsCard label="Total Employees" value={summary?.totalEmployees || "0"} delta="Active" icon={Users} accent="info" />
        <StatsCard label="Avg. Base Salary" value={summary?.avgSalary || "₹0"} delta="Per Head" icon={TrendingUp} accent="success" />
        <StatsCard label="Pending Onboards" value={summary?.pendingApprovals || "0"} icon={Clock} accent="warning" />
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
            <RecentPayroll data={summary?.recentTransactions || []} />
        </div>
        <div className="lg:col-span-1">
            <UpcomingPayment data={summary?.upcoming} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;