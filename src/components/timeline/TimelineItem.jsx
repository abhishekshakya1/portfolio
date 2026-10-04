import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import { HiAcademicCap, HiCommandLine, HiRocketLaunch, HiBriefcase, HiMinusSmall, HiPlusSmall } from "react-icons/hi2";

const TimelineItem = ({ item, index }) => {
  const { playSound } = useTheme();
  const [isExpanded, setIsExpanded] = useState(item.year === "2026");

  // Map icon strings to React Icons
  const getIcon = (iconName) => {
    switch (iconName) {
      case "education":
        return <HiAcademicCap className="text-accent" size={16} />;
      case "code":
        return <HiCommandLine className="text-accent" size={16} />;
      case "database":
        return <HiBriefcase className="text-accent" size={16} />;
      case "rocket":
        return <HiRocketLaunch className="text-accent" size={16} />;
      default:
        return <HiCommandLine className="text-accent" size={16} />;
    }
  };

  const isLeft = index % 2 === 0;

  return (
    <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-start">
      
      {/* Central Indicator Dot (Alternates and stays aligned) */}
      <div
        className="
          absolute
          left-0
          md:left-1/2
          md:-translate-x-1/2
          top-6
          h-5
          w-5
          rounded-full
          border-4
          border-[#030303]
          bg-accent
          shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]
          transition-colors
          duration-1000
          z-10
          flex
          items-center
          justify-center
        "
      >
        {/* Subtle inner core */}
        <span className="h-1 w-1 rounded-full bg-black animate-ping" />
      </div>

      {/* LEFT COLUMN (Left-aligned Cards on Desktop) */}
      <div className={`w-full ${isLeft ? "md:block" : "hidden md:block md:invisible pointer-events-none h-0"}`}>
        {isLeft && (
          <TimelineCard 
            item={item} 
            isExpanded={isExpanded} 
            setIsExpanded={setIsExpanded} 
            getIcon={getIcon} 
            playSound={playSound}
          />
        )}
      </div>

      {/* RIGHT COLUMN (Right-aligned Cards on Desktop) */}
      <div className={`w-full ${!isLeft ? "md:block" : "hidden md:block md:invisible pointer-events-none h-0"}`}>
        {!isLeft && (
          <TimelineCard 
            item={item} 
            isExpanded={isExpanded} 
            setIsExpanded={setIsExpanded} 
            getIcon={getIcon} 
            playSound={playSound}
          />
        )}
      </div>

    </div>
  );
};

// Internal timeline card component for code reuse
const TimelineCard = ({ item, isExpanded, setIsExpanded, getIcon, playSound }) => {
  const isLatest = item.year === "2026";

  return (
    <motion.div
      layout="position"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        ${isLatest ? "border-accent/40 bg-zinc-950/60 shadow-[0_4px_30px_rgba(var(--accent-rgb),0.05)]" : "border-zinc-900 bg-zinc-950/40"}
        backdrop-blur-sm
        p-5
        sm:p-7
        md:p-8
        transition-all
        duration-300
        hover:border-accent/30
        hover:bg-zinc-950/70
        cursor-pointer
        select-none
        touch-manipulation
      `}
      onClick={() => {
        playSound("expand");
        setIsExpanded(!isExpanded);
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_40%)]" />

      {/* Card Header row */}
      <div className="relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Year Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-semibold font-mono tracking-widest ${
              isLatest 
                ? "border-accent/50 bg-accent/15 text-accent shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]" 
                : "border-zinc-800 bg-black/60 text-zinc-400"
            }`}>
              {item.year}
            </span>
            {isLatest && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Current Focus
              </span>
            )}
          </div>
          
          {/* Action indicator button */}
          <div className="text-zinc-500 hover:text-white transition-colors p-1">
            {isExpanded ? <HiMinusSmall size={18} /> : <HiPlusSmall size={18} />}
          </div>
        </div>

        {/* Title row */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-900 bg-black/40">
            {getIcon(item.icon)}
          </div>
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        </div>

        {/* Short description paragraph */}
        <p className="mt-4 leading-relaxed text-sm text-zinc-400">{item.description}</p>

        {/* Dynamic expanded details grid */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.35 }, opacity: { duration: 0.25, delay: 0.1 } } }}
              exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } } }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-zinc-900 pt-6 space-y-5">
                
                {/* Achievements List */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-2.5">Key Outcomes</span>
                  <ul className="space-y-2 text-zinc-400 text-xs">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills tags */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-2.5">Skills Solidified</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-zinc-900 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TimelineItem;