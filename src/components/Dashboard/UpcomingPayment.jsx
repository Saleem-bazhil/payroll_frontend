import React from 'react'
import { Card } from "@/components/ui/Card"
import { Calendar } from "lucide-react"

const UpcomingPayment = () => {
  return (
    <Card className="p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white shadow-glow shrink-0">
          <Calendar className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-none">Upcoming Payment</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Next payroll cycle</p>
        </div>
      </div>
      
      <div className="mt-2 rounded-2xl gradient-brand p-6 text-white shadow-glow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="h-16 w-16 -mr-4 -mt-4" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.1em] font-bold opacity-80">Total to disburse</div>
        <div className="text-3xl font-bold mt-2 tracking-tight">$184,520.00</div>
        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-medium opacity-90">Nov 30, 2025</span>
          </div>
          <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            In 4 days
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
          <div className="text-xs font-medium text-muted-foreground">Employees</div>
          <div className="text-xl font-bold mt-1">1,284</div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
          <div className="text-xs font-medium text-muted-foreground">Avg. payout</div>
          <div className="text-xl font-bold mt-1">$6,420</div>
        </div>
      </div>
    </Card>
  )
}

export default UpcomingPayment
