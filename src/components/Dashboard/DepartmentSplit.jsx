import React from 'react'
import { Card } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

const dept = [
  { name: "Engineering", value: 42, color: "#7C4DFF" },
  { name: "Sales", value: 23, color: "#06B6D4" },
  { name: "Marketing", value: 15, color: "#F59E0B" },
  { name: "Operations", value: 12, color: "#10B981" },
  { name: "HR", value: 8, color: "#EF4444" },
];

const DepartmentSplit = () => {
  return (
    <Card>
      <h3 className="text-base font-semibold">Department Split</h3>
      <p className="text-xs text-muted-foreground mt-0.5">Headcount distribution</p>
      <div className="h-[220px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={dept} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
              {dept.map((d) => <Cell key={d.name} fill={d.color} stroke="none" />)}
            </Pie>
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-2">
        {dept.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
            <span className="font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DepartmentSplit
