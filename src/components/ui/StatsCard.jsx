import { motion } from "framer-motion";

const StatsCard = ({ label, value, delta, deltaType = "up", icon: Icon, accent = "primary" }) => {
  const accentMap = {
    primary: "from-[#7C4DFF] to-[#8B5CF6]",
    success: "from-emerald-400 to-emerald-600",
    warning: "from-amber-400 to-orange-500",
    info: "from-cyan-400 to-blue-500",
    danger: "from-rose-400 to-red-600",
    muted: "from-slate-400 to-slate-600",
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="glass-card rounded-3xl p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accentMap[accent]} text-white shadow-glow`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      {delta && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ${
            deltaType === "up" ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"
          }`}>
            {deltaType === "up" ? "▲" : "▼"} {delta}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;