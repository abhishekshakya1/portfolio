import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import { HiAcademicCap, HiClock, HiCodeBracket, HiSparkles, HiCommandLine, HiSquare3Stack3D } from "react-icons/hi2";
import { FaChessQueen, FaBookOpen } from "react-icons/fa";
import Container from "../common/Container";
import { personalInfo } from "../../data/personalInfo";
import mduLogo from "../../assets/images/education/mdu.png";
import gmssssLogo from "../../assets/images/education/gmssss.png";

const stats = personalInfo.stats;

const About = () => {
  const { playSound } = useTheme();
  const [localTime, setLocalTime] = useState("");

  // Live ticking clock in India Standard Time
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const hobbies = [
    { icon: FaChessQueen, label: "Chess & Strategy", color: "text-amber-500 hover:bg-amber-500/10" },
    { icon: HiCommandLine, label: "DSA & Logic", color: "text-sky-500 hover:bg-sky-500/10" },
    { icon: HiSquare3Stack3D, label: "System Design", color: "text-rose-500 hover:bg-rose-500/10" },
    { icon: FaBookOpen, label: "Tech Deep-dives", color: "text-emerald-500 hover:bg-emerald-500/10" },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-zinc-900/40">
      <Container>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            About Me
          </p>
          <h2 className="clash text-4xl md:text-5xl font-semibold leading-tight text-white max-w-2xl">
            Designing & Crafting Digital Solutions
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Main Story (Span 2x2) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => playSound("hover")}
            transition={{ duration: 0.4 }}
            className="relative lg:col-span-2 p-6 sm:p-8 md:p-10 rounded-[32px] border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent-rgb),0.04),transparent_40%)]" />
            
            <div className="flex items-center gap-3 mb-6 text-zinc-400">
              <HiSparkles className="text-accent animate-pulse" size={20} />
              <span className="text-xs font-mono uppercase tracking-widest">Biography</span>
            </div>

            <h3 className="clash text-2xl sm:text-3xl font-semibold text-white mb-5">
              Hi, I'm {personalInfo.name}
            </h3>
            
            <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
              A passionate <span className="text-white font-medium underline decoration-accent/50 underline-offset-4">{personalInfo.education.degree}</span> student and Full Stack Engineer based in {personalInfo.location}. I specialize in turning ideas into reliable, scalable web applications across the entire stack.
            </p>
            
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-400">
              My journey started with a deep curiosity for how the internet works behind the scenes. Over the years, that curiosity grew into building complete end-to-end systems — designing responsive, accessible frontends in React and Next.js, crafting robust server-side APIs in Node.js and Express, and modeling high-integrity data in PostgreSQL and MongoDB.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-400">
              Whether it is writing clean, maintainable code, solving complex logic challenges, or shipping real-world projects, I believe in consistency, continuous learning, and building software that genuinely delivers value.
            </p>
          </motion.div>

          {/* Card 2: Education (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => playSound("hover")}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 sm:p-6 md:p-7 rounded-[32px] border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--accent-rgb),0.03),transparent_45%)]" />
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <HiAcademicCap className="text-accent" size={20} />
                  <span className="text-xs font-mono uppercase tracking-widest">Education</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold">
                  3 Qualifications
                </span>
              </div>

              {/* Education Stack */}
              <div className="flex flex-col gap-3">
                {/* 1. BCA Degree (Top) */}
                <div className="p-3 rounded-2xl border border-zinc-900 bg-black/40 hover:border-zinc-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                      <img src={mduLogo} alt="MDU Rohtak" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">BCA (Degree)</h4>
                        <span className="text-[11px] font-mono font-bold text-accent shrink-0">71.03%</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate mt-0.5">DAV Centenary College</p>
                      <div className="flex items-center justify-between gap-1 mt-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                        <span className="truncate">Affiliated to M.D.U., Rohtak</span>
                        <span className="shrink-0 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/80">2023–26</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Class 12th (Senior Secondary) */}
                <div className="p-3 rounded-2xl border border-zinc-900 bg-black/40 hover:border-zinc-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                      <img src={gmssssLogo} alt="GMSSSS" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">Class 12th (Sr. Sec.)</h4>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 shrink-0">77.2%</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate mt-0.5">Govt. Model Sanskriti Sr. Sec. School</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                        <span>HBSE Board</span>
                        <span>•</span>
                        <span className="text-zinc-400">Science Stream</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Class 10th (Secondary) */}
                <div className="p-3 rounded-2xl border border-zinc-900 bg-black/40 hover:border-zinc-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                      <img src={gmssssLogo} alt="GMSSSS" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">Class 10th (Secondary)</h4>
                        <span className="text-[11px] font-mono font-bold text-amber-400 shrink-0">92.8%</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate mt-0.5">Govt. Model Sanskriti Sr. Sec. School</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                        <span>HBSE Board</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 border-t border-zinc-900 pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Academic Foundations</span>
              <span className="text-zinc-400 font-medium">Science & Computer Applications</span>
            </div>
          </motion.div>

          {/* Card 3: Clock & Location (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => playSound("hover")}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-[32px] border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-6 text-zinc-400">
              <HiClock className="text-accent animate-pulse" size={20} />
              <span className="text-xs font-mono uppercase tracking-widest">Location & Time</span>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Based in</p>
              <h4 className="text-xl font-semibold text-white mt-1">{personalInfo.location}</h4>
              
              <div className="mt-6 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Local Time (IST)</span>
                <span className="text-2xl font-mono font-bold tracking-tight text-white">{localTime || "00:00:00 AM"}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-zinc-400 border-t border-zinc-900/60 pt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </div>
          </motion.div>

          {/* Card 4: Stats Grid (Span 1) with Clickable LeetCode Link */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => playSound("hover")}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 sm:p-8 rounded-[32px] border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-6 text-zinc-400">
              <HiCodeBracket className="text-accent" size={20} />
              <span className="text-xs font-mono uppercase tracking-widest">Metrics & Proof</span>
            </div>

            <div className="grid grid-cols-3 gap-2 divide-x divide-zinc-900">
              {stats.map((stat, i) => {
                const isLeetCode = stat.label.toLowerCase().includes("leetcode");
                return isLeetCode ? (
                  <a
                    key={i}
                    href={personalInfo.socials.leetcode.url}
                    target="_blank"
                    rel="noreferrer"
                    title="Click to view verified LeetCode Profile"
                    onMouseEnter={() => playSound("hover")}
                    onClick={() => playSound("click")}
                    className="flex flex-col items-center justify-center text-center first:pl-0 pl-2 group/stat cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    <span className="text-2xl font-bold font-mono text-white group-hover/stat:text-amber-400 transition-colors tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-1 leading-normal group-hover/stat:text-amber-400 transition-colors flex items-center gap-0.5">
                      {stat.label} ↗
                    </span>
                  </a>
                ) : (
                  <div key={i} className="flex flex-col items-center justify-center text-center first:pl-0 pl-2">
                    <span className="text-2xl font-bold font-mono text-white tracking-tight">{stat.value}</span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-1 leading-normal">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-xs text-center text-zinc-500 border-t border-zinc-900/60 pt-4 font-mono">
              Constantly building & shipping
            </div>
          </motion.div>

          {/* Card 5: Hobbies & Interests Card (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => playSound("hover")}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-6 sm:p-8 rounded-[32px] border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 text-zinc-400">
                <HiSparkles className="text-accent" size={20} />
                <span className="text-xs font-mono uppercase tracking-widest">Interests</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-4">When I am not coding...</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {hobbies.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => playSound("hover")}
                    className={`flex items-center gap-2.5 rounded-2xl border border-zinc-900 bg-black/60 px-3.5 py-3 text-xs sm:text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white ${h.color}`}
                  >
                    <Icon size={16} />
                    <span>{h.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default About;