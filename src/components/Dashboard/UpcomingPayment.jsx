import React from 'react'
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const UpcomingPayment = () => {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white shadow-glow">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold">Upcoming Payment</h3>
          <p className="text-xs text-muted-foreground">Next payroll cycle</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl gradient-brand p-5 text-white shadow-glow">
        <div className="text-xs uppercase tracking-wider opacity-80">Total to disburse</div>
        <div className="text-3xl font-semibold mt-1">$184,520.00</div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="opacity-90">November 30, 2025</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">In 4 days</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-3">
          <div className="text-xs text-muted-foreground">Employees</div>
          <div className="text-lg font-semibold mt-1">1,284</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="text-xs text-muted-foreground">Avg. payout</div>
          <div className="text-lg font-semibold mt-1">$6,420</div>
        </div>
      </div>
    </Card>
  )
}

export default UpcomingPayment
