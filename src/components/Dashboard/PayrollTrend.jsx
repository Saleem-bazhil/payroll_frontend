import React from 'react'
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const trend = [
  { m: "Jan", payroll: 124000, bonus: 12000 },
  { m: "Feb", payroll: 132000, bonus: 9000 },
  { m: "Mar", payroll: 128000, bonus: 14000 },
  { m: "Apr", payroll: 145000, bonus: 18000 },
  { m: "May", payroll: 152000, bonus: 16000 },
  { m: "Jun", payroll: 168000, bonus: 22000 },
  { m: "Jul", payroll: 174000, bonus: 19000 },
  { m: "Aug", payroll: 181000, bonus: 25000 },
];

const PayrollTrend = () => {
  return (
    <Card className="p-5 md:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-semibold leading-none">Payroll Trend</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Total disbursed over the last 8 months</p>
        </div>
        <div className="flex items-center gap-2">
            <Badge variant="primary" className="bg-primary/10 text-primary border-none font-semibold">+18.2% YoY</Badge>
        </div>
      </div>
      <div className="h-[300px] w-full -ml-4 pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,127,127,0.15)" vertical={false} />
            <XAxis dataKey="m" stroke="currentColor" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="payroll" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#g1)" />
            <Area type="monotone" dataKey="bonus" stroke="#06B6D4" strokeWidth={2.5} fill="url(#g2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default PayrollTrend
