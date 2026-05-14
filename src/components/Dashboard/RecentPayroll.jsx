import React from 'react'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const RecentPayroll = ({ data = [] }) => {
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
        {data.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm bg-muted/10 rounded-2xl border border-dashed border-border">
            No recent payroll transactions recorded.
          </div>
        ) : (
          data.map((r, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group">
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
                  <div className="text-[10px] text-muted-foreground font-normal mt-0.5">INR</div>
                </div>
                <Badge 
                  className="min-w-[85px] justify-center font-medium"
                  variant={r.status === "Paid" ? "success" : r.status === "Pending" ? "warning" : "info"}
                >
                  {r.status}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

export default RecentPayroll
