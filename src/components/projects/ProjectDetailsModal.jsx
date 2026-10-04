import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import { HiXMark, HiCheckCircle, HiChevronRight, HiSquare3Stack3D, HiCommandLine, HiCpuChip, HiCheck } from "react-icons/hi2";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  const { playSound } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: HiCpuChip },
    { id: "architecture", label: "Architecture", icon: HiSquare3Stack3D },
    { id: "code", label: "Code Snippet", icon: HiCommandLine }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop Overlay */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            playSound("click");
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl rounded-[32px] border border-zinc-800 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col max-h-[85vh] hover:border-accent/20 transition-all duration-300"
        >
          {/* Top macOS Controls Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 sm:px-6 py-3.5 sm:py-4">
            <div className="flex gap-2">
              <button 
                onClick={() => { playSound("click"); onClose(); }}
                className="h-3.5 w-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center group cursor-pointer"
              >
                <HiXMark className="text-[8px] text-rose-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <span className="h-3.5 w-3.5 rounded-full bg-amber-500/80" />
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/80" />
            </div>

            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{project.category} Project</span>

            <button
              onClick={() => { playSound("click"); onClose(); }}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <HiXMark size={20} />
            </button>
          </div>

          {/* Tab Selection Header */}
          <div className="flex items-center gap-3 border-b border-zinc-900 bg-zinc-950/60 px-4 sm:px-6 py-3 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => {
                    playSound("click");
                    setActiveTab(tab.id);
                  }}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeModalTab"
                      className="absolute inset-0 rounded-xl bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <TabIcon size={14} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 bg-[#050505]">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h3 className="clash text-2xl sm:text-3xl font-bold text-white">{project.title}</h3>
                  <p className="mt-4 text-zinc-300 leading-relaxed text-base md:text-lg">
                    {project.longDescription}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="border-t border-zinc-900 pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">Core Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm md:text-base">
                        <HiCheckCircle className="text-accent shrink-0 mt-0.5" size={18} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* 2. ARCHITECTURE TAB */}
            {activeTab === "architecture" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-500 flex-wrap gap-2">
                    <span className="uppercase tracking-widest">System Architecture Topology</span>
                    <span className="text-[11px] text-accent/80 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      Slide / scroll horizontally to inspect full pipeline ↔
                    </span>
                  </div>
                  
                  {/* Visual Node Flowchart (Sliding & Responsive) */}
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/80 p-5 sm:p-6 overflow-x-auto relative">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(var(--accent-rgb),0.03),transparent_50%)]" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-start min-w-full md:min-w-max gap-3 sm:gap-4 py-2">
                      {project.architecture.nodes.map((node, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                          <div className="flex flex-col items-center justify-center text-center border border-zinc-800/80 bg-black/80 rounded-2xl px-5 py-4 w-full md:w-[190px] hover:border-accent/50 hover:bg-zinc-900/60 transition-all duration-300 shadow-lg group hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                              {node.type}
                            </span>
                            <span className="text-sm font-semibold text-white mt-2 group-hover:text-accent transition-colors leading-snug">
                              {node.name}
                            </span>
                          </div>
                          {i < project.architecture.nodes.length - 1 && (
                            <div className="flex flex-col md:flex-row items-center justify-center text-accent/70 font-mono text-sm py-2 md:py-0 md:px-3">
                              <HiChevronRight className="rotate-90 md:rotate-0 drop-shadow-[0_0_6px_rgba(var(--accent-rgb),0.4)]" size={22} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Operations Description list */}
                <div className="border-t border-zinc-900 pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">Data Pathways & Flow Specs</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.architecture.connections.map((conn, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl border border-zinc-900/80 bg-zinc-950/40 p-3 text-xs md:text-sm text-zinc-300 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="leading-relaxed">{conn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* 3. CODE SNIPPET TAB */}
            {activeTab === "code" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Core Code Snippet</h4>
                  <span className="text-xs font-mono text-zinc-600">JavaScript / React</span>
                </div>

                {/* Console Code Window */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-900 bg-[#0d0d0d] px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-850 border border-zinc-800" />
                      <span className="text-[11px] font-mono text-zinc-400 font-medium">logic.js</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <AnimatePresence>
                        {copiedCode && (
                          <motion.span
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400"
                          >
                            <HiCheck size={13} /> Copied to clipboard!
                          </motion.span>
                        )}
                      </AnimatePresence>

                      <button 
                        type="button"
                        title="Copy code snippet to clipboard"
                        onClick={() => {
                          playSound("success");
                          navigator.clipboard.writeText(project.codeSnippet);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2200);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-mono font-medium rounded-lg px-3 py-1.5 transition-all duration-200 cursor-pointer active:scale-95 ${
                          copiedCode
                            ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                            : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-accent/40 hover:bg-zinc-900"
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <HiCheck className="text-emerald-400" size={14} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy size={13} className="text-zinc-400" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="p-5 font-mono text-xs md:text-sm text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre bg-black/90 selection:bg-accent/30 selection:text-white">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-900 bg-zinc-950 px-4 sm:px-6 py-4 sm:py-5 flex-wrap">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 px-5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-all hover:border-zinc-700"
            >
              <FaGithub /> GitHub Source
            </a>
            
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-accent-hover hover:scale-102"
              >
                <FaExternalLinkAlt size={10} /> Live Deployment
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-mono text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Active Development (WIP)
              </span>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
