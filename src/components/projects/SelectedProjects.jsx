import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { projects } from "../../data/projects";
import Container from "../common/Container";

const categories = ["All", "Full Stack", "Backend", "Frontend"];

const SelectedProjects = () => {
  const { playSound } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden border-t border-zinc-900/60">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-rgb),0.02),transparent_40%)] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Portfolio
            </p>
            <h2 className="clash text-4xl md:text-5xl font-semibold text-white">
              Selected Projects
            </h2>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-1.5 backdrop-blur-sm self-start md:self-auto overflow-x-auto max-w-full"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => {
                    playSound("click");
                    setActiveFilter(cat);
                  }}
                  className={`relative rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectsTab"
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

        {/* Project cards vertical grid layout */}
        <motion.div layout className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard 
                  project={project} 
                  onOpenDetails={handleOpenDetails} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </Container>

      {/* Expanded details overlay drawer popup */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default SelectedProjects;