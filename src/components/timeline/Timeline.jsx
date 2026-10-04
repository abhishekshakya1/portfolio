import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import TimelineItem from "./TimelineItem";
import { timelineData } from "../../data/timeline";
import Container from "../common/Container";

const Timeline = () => {
  const { playSound } = useTheme();
  const containerRef = useRef(null);

  // Track scroll progress of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out the scroll progress mapping
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  return (
    <section className="py-24 relative overflow-hidden border-t border-zinc-900/60" id="timeline">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-accent opacity-[0.02] blur-[100px] pointer-events-none" />

      <Container className="relative z-10" ref={containerRef}>
        
        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24 text-center md:text-left"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Journey
          </p>
          <h2 className="clash text-4xl md:text-5xl font-semibold text-white">
            My Professional Timeline
          </h2>
        </motion.div>

        {/* Timeline Line Container */}
        <div className="relative mt-12">
          
          {/* Static track line (Left-aligned on mobile, centered on desktop) */}
          <div
            className="
              absolute
              left-[9px]
              md:left-1/2
              md:-translate-x-1/2
              top-0
              bottom-0
              w-[2px]
              bg-zinc-900
            "
          />

          {/* Active progress tracker line (grows on scroll) */}
          <motion.div
            style={{ scaleY }}
            className="
              absolute
              left-[9px]
              md:left-1/2
              md:-translate-x-1/2
              top-0
              bottom-0
              w-[2px]
              bg-accent
              origin-top
              transition-colors
              duration-1000
            "
          />

          {/* Timeline Nodes Grid */}
          <div className="flex flex-col gap-16 relative">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};

export default Timeline;