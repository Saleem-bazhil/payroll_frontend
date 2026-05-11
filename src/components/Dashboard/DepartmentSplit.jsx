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
    <Card className="p-5 md:p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold leading-none">Department Split</h3>
        <p className="text-sm text-muted-foreground mt-1.5">Headcount distribution</p>
      </div>
      <div className="h-[240px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={dept} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={5}>
              {dept.map((d) => <Cell key={d.name} fill={d.color} stroke="none" />)}
            </Pie>
            <Tooltip 
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, boxShadow: 'var(--shadow-card)' }}
                itemStyle={{ padding: '2px 0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3 mt-auto pt-4">
        {dept.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full shadow-sm" style={{ background: d.color }} />
              <span className="text-muted-foreground font-medium">{d.name}</span>
            </div>
            <span className="font-bold">{d.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DepartmentSplit
