import React from 'react'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recent = [
  { name: "Sophia Chen", dept: "Engineering", amount: "₹8,420", status: "Paid" },
  { name: "Marcus Reyes", dept: "Sales", amount: "₹6,180", status: "Paid" },
  { name: "Aiko Tanaka", dept: "Design", amount: "₹5,940", status: "Pending" },
  { name: "Liam O'Brien", dept: "Operations", amount: "₹4,750", status: "Paid" },
  { name: "Priya Patel", dept: "Marketing", amount: "₹5,210", status: "Processing" },
];

const RecentPayroll = () => {
  return (
    <Card className="p-5 md:p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold leading-none">Recent Payroll</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Latest transactions across all departments</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full px-4">View all</Button>
      </div>
      <div className="space-y-1">
        {recent.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <Avatar name={r.name} className="ring-2 ring-background shadow-sm" />
              <div>
                <div className="text-sm font-semibold group-hover:text-primary transition-colors">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.dept}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-bold text-right">
                {r.amount}
                <div className="text-[10px] text-muted-foreground font-normal mt-0.5">USD</div>
              </div>
              <Badge 
                className="min-w-[85px] justify-center"
                variant={r.status === "Paid" ? "success" : r.status === "Pending" ? "warning" : "info"}
              >
                {r.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentPayroll
