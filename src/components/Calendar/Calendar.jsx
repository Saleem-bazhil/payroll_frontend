import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "../ui/PageHeader";
import { motion } from "framer-motion";
import { Calendar, Clock, FileCheck, AlertTriangle, Wallet } from "lucide-react";

const events = [
  { date: "Nov 28", title: "Tax Filing Deadline", desc: "Quarterly tax submission for Q3 FY25", icon: AlertTriangle, variant: "warning" },
  { date: "Nov 30", title: "Monthly Payroll Run", desc: "Process payroll for 1,284 employees", icon: Wallet, variant: "primary" },
  { date: "Dec 02", title: "Payslip Distribution", desc: "Email payslips to all employees", icon: FileCheck, variant: "info" },
  { date: "Dec 10", title: "Bonus Payout", desc: "Annual performance bonus disbursement", icon: Wallet, variant: "success" },
  { date: "Dec 15", title: "Compliance Review", desc: "Internal audit & compliance check", icon: FileCheck, variant: "info" },
  { date: "Dec 31", title: "Year End Closing", desc: "Finalize FY25 payroll books", icon: Clock, variant: "warning" },
];

const Calendars = () => {
  return (
    <div>
      <PageHeader title="Payroll Calendar" description="Upcoming events, deadlines and payroll cycles." />

      <Card>
        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[#7C4DFF] via-border to-transparent" />
          <div className="space-y-4">
            {events.map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex gap-4"
                >
                  <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-brand text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card/50 p-4 transition hover:bg-muted/40">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{e.title}</div>
                        <p className="text-xs text-muted-foreground mt-1">{e.desc}</p>
                      </div>
                      <Badge variant={e.variant}>{e.date}</Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendars;