import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  FileText,
  CalendarDays,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronLeft,
  Sparkles,
  X
} from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/payroll", label: "Payroll", icon: Wallet },
  { to: "/payslips", label: "Payslips", icon: FileText },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/compliance", label: "Tax & Compliance", icon: ShieldCheck },
];

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { pathname: path } = useLocation();

  const content = (mobile = false) => (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between px-2 py-3">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {(!collapsed || mobile) && (
            <div className="overflow-hidden">
              <div className="text-[15px] font-semibold leading-tight">PayrollX</div>
              <div className="text-[11px] text-muted-foreground leading-tight">Enterprise Suite</div>
            </div>
          )}
        </Link>
        {mobile ? (
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:grid h-7 w-7 place-items-center rounded-lg hover:bg-muted text-muted-foreground"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-1">
        {nav.map((item) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl gradient-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />
              {(!collapsed || mobile) && <span className="relative z-10 truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {(!collapsed || mobile) && (
        <div className="rounded-2xl gradient-brand p-4 text-white shadow-glow">
          <div className="text-sm font-semibold">Upgrade to Pro</div>
          <p className="mt-1 text-xs text-white/80">Unlock advanced analytics & unlimited payroll runs.</p>
          <button className="mt-3 w-full rounded-lg bg-white/20 backdrop-blur px-3 py-1.5 text-xs font-medium hover:bg-white/30 transition">
            Upgrade now
          </button>
        </div>
      )}

      <Link
        to="/"
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition ${
          collapsed && !mobile ? "justify-center" : ""
        }`}
      >
        <Settings className="h-[18px] w-[18px]" />
        {(!collapsed || mobile) && <span>Settings</span>}
      </Link>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-30 flex-col glass border-r transition-[width] duration-300 ${
          collapsed ? "w-[88px]" : "w-[260px]"
        }`}
      >
        {content(false)}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] glass border-r lg:hidden"
            >
              {content(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export { nav as sidebarNav };