import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../common/ThemeContext";

const TechCard = ({ title, count, skills, color }) => {
  const { playSound } = useTheme();
  const [hoveredBadge, setHoveredBadge] = useState(null);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-zinc-800
        bg-zinc-950/40
        backdrop-blur-sm
        p-5
        sm:p-7
        transition-all
        duration-300
        hover:border-zinc-700/60
        hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* Background Accent Mesh Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_40%)]" />

      <div className="relative z-10">
        
        {/* Header Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-1.5
              text-xs
              font-semibold
              tracking-[0.15em]
              uppercase
              ${color}
            `}
          >
            <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
            {title}
          </div>

          <span className="text-xs font-mono text-zinc-600">{count} Elements</span>
        </div>

        {/* Skill Badges Container */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredBadge === skill.name;
            const Element = skill.url ? "a" : "span";

            return (
              <Element
                key={skill.name}
                href={skill.url || undefined}
                target={skill.url ? "_blank" : undefined}
                rel={skill.url ? "noreferrer" : undefined}
                title={skill.url ? `View verified ${skill.name}` : undefined}
                onMouseEnter={() => {
                  playSound("hover");
                  setHoveredBadge(skill.name);
                }}
                onMouseLeave={() => setHoveredBadge(null)}
                onClick={() => {
                  if (skill.url) playSound("click");
                }}
                style={{
                  borderColor: isHovered ? skill.iconColor : "#27272a", // border-zinc-800
                  boxShadow: isHovered ? `0 0 15px ${skill.iconColor}22` : "none",
                  color: isHovered ? "#ffffff" : "#d4d4d8", // text-zinc-300
                  backgroundColor: isHovered ? `${skill.iconColor}08` : "rgba(0,0,0,0.5)",
                }}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  px-3
                  py-1.5
                  text-xs
                  sm:text-sm
                  sm:px-4
                  sm:py-2
                  font-medium
                  transition-all
                  duration-300
                  ${skill.url ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default"}
                `}
              >
                <Icon 
                  size={16} 
                  style={{
                    color: skill.iconColor,
                    transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
                  }} 
                  className="transition-transform duration-300"
                />
                <span>{skill.name}</span>
                {skill.url && (
                  <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 ml-0.5">↗</span>
                )}
              </Element>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};

export default TechCard;