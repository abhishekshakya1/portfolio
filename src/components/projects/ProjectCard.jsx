import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare, HiMiniQueueList } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../common/ThemeContext";

const ProjectCard = ({ project, onOpenDetails }) => {
  const { playSound } = useTheme();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-6
        p-5
        sm:p-6
        md:p-8
        rounded-[36px]
        border
        border-zinc-850
        bg-zinc-950/40
        backdrop-blur-sm
        transition-all
        duration-500
        hover:border-accent/30
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        group
      "
    >
      {/* 1. macOS Browser Image Mockup Wrap (Span 5) */}
      <div 
        className="
          lg:col-span-6
          relative
          rounded-2xl
          border
          border-zinc-900
          bg-zinc-950
          overflow-hidden
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          h-[200px]
          sm:h-[260px]
          flex
          flex-col
        "
      >
        {/* macOS Control Dots */}
        <div className="flex items-center gap-1.5 border-b border-zinc-900 bg-zinc-950/80 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        </div>
        
        {/* Screenshot Image */}
        <div className="flex-1 overflow-hidden relative bg-zinc-950">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-zinc-900/80 animate-pulse flex items-center justify-center z-10">
              <span className="h-5 w-5 rounded-full border-2 border-zinc-700 border-t-accent animate-spin" />
            </div>
          )}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`
              h-full
              w-full
              object-cover
              object-top
              transition-all
              duration-700
              group-hover:scale-105
              ${imgLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* 2. Text Contents & Action Buttons (Span 7) */}
      <div 
        className="
          lg:col-span-6
          flex
          flex-col
          justify-between
          py-2
          pl-0
          lg:pl-4
        "
      >
        <div>
          {/* Category Tag & Title */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">{project.category}</span>
            {project.isLive ? (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{project.badge || "Live System"}</span>
              </div>
            ) : project.isWip ? (
              <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{project.badge || "In Development"}</span>
              </div>
            ) : (
              <span className="text-xs text-zinc-400 font-mono">{project.badge || "Featured"}</span>
            )}
          </div>

          <h3 className="clash text-2xl md:text-3xl font-bold text-white mt-2 group-hover:text-accent transition-colors duration-350">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  border
                  border-zinc-900
                  bg-black/50
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-zinc-400
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons actions row */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* Details Modal Trigger */}
          <button
            onMouseEnter={() => playSound("hover")}
            onClick={() => {
              playSound("click");
              onOpenDetails(project);
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-accent
              px-6
              py-3
              text-xs
              font-bold
              text-black
              transition-all
              duration-300
              hover:bg-accent-hover
              hover:-translate-y-0.5
              cursor-pointer
            "
          >
            <HiMiniQueueList size={14} />
            Details
          </button>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-zinc-900
                px-5
                py-3
                text-xs
                font-bold
                text-white
                border
                border-zinc-800
                transition-all
                duration-300
                hover:bg-zinc-850
                hover:border-zinc-700
                hover:-translate-y-0.5
              "
            >
              Live Demo
              <HiArrowTopRightOnSquare size={13} />
            </a>
          ) : (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-2xl
                bg-zinc-900/40
                px-4
                py-2.5
                text-xs
                font-mono
                text-amber-400/90
                border
                border-amber-500/20
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              In Progress
            </span>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("click")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-zinc-900
              px-5
              py-3
              text-xs
              font-bold
              text-zinc-400
              transition-all
              duration-300
              hover:text-white
              hover:-translate-y-0.5
            "
          >
            GitHub
            <FaGithub size={13} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;