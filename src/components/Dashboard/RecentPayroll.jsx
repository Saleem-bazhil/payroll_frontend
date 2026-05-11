import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recent = [
  { name: "Sophia Chen", dept: "Engineering", amount: "$8,420", status: "Paid" },
  { name: "Marcus Reyes", dept: "Sales", amount: "$6,180", status: "Paid" },
  { name: "Aiko Tanaka", dept: "Design", amount: "$5,940", status: "Pending" },
  { name: "Liam O'Brien", dept: "Operations", amount: "$4,750", status: "Paid" },
  { name: "Priya Patel", dept: "Marketing", amount: "$5,210", status: "Processing" },
];

const RecentPayroll = () => {
  return (
    <Card className="xl:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Recent Payroll</h3>
        <Button variant="ghost">View all</Button>
      </div>
      <div className="space-y-2">
        {recent.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-2xl p-3 hover:bg-muted/40 transition">
            <div className="flex items-center gap-3">
              <Avatar name={r.name} />
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.dept}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">{r.amount}</div>
              <Badge variant={r.status === "Paid" ? "success" : r.status === "Pending" ? "warning" : "info"}>
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
