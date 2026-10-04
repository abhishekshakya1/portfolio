import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import TechCard from "./TechCard";
import { techStack } from "../../data/techStack";
import Container from "../common/Container";

const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

const TechStack = () => {
  const { playSound } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTechStack = activeCategory === "All"
    ? techStack
    : techStack.filter(item => item.category === activeCategory || item.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="skills" className="relative py-24 overflow-hidden border-t border-zinc-900/40">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--accent-rgb),0.03),transparent_50%)] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Headings and Filtering Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              {"</>"} Skills
            </p>
            <h2 className="clash text-4xl md:text-5xl font-semibold text-white">
              Technologies I Work With
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-1.5 backdrop-blur-sm self-start md:self-auto"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => {
                    playSound("click");
                    setActiveCategory(cat);
                  }}
                  className={`relative rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTechTab"
                      className="absolute inset-0 rounded-xl bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechStack.map((item) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TechCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </Container>
    </section>
  );
};

export default TechStack;