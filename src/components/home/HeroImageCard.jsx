import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import profileImage from "../../assets/images/profile/abhishek.png";

const HeroImageCard = () => {
  const { playSound } = useTheme();

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse positions to rotations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates from -0.5 to 0.5
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      {/* MOBILE ONLY: Circular profile picture with concentric orbit rings */}
      <div className="flex lg:hidden justify-center items-center py-4 w-full relative h-[250px] overflow-hidden">
        {/* Concentric Orbits */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-zinc-900/60 z-0 animate-[spin_40s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full border border-zinc-900/30 z-0 animate-[spin_20s_linear_infinite]" />
        
        {/* Glowing Orbits dots */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full z-0 pointer-events-none animate-[spin_25s_linear_infinite]">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb))] animate-pulse" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/40" />
        </div>
        
        {/* Avatar Container */}
        <div className="relative z-10 w-[140px] h-[140px] rounded-full p-[2px] bg-gradient-to-tr from-accent/20 via-zinc-800/60 to-accent/40 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-zinc-900/60 relative">
            
            {/* Ambient Backglow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--accent-rgb)/0.25),transparent_70%)]" />
            
            <img
              src={profileImage}
              alt="Abhishek Kumar — Full Stack Engineer"
              className="w-full h-full object-cover relative z-10"
            />
            {/* Shadow overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-20 pointer-events-none" />
          </div>

          {/* Availability status badge */}
          <div className="absolute bottom-1 right-2 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-950 p-[3px] shadow-lg">
            <span className="relative flex h-full w-full rounded-full bg-emerald-500">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP ONLY: macOS card with 3D hover tilt effects */}
      <div 
        className="hidden lg:flex justify-center items-center py-8 w-full"
        style={{ perspective: 1000 }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => playSound("hover")}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="
            relative
            w-full
            max-w-[280px]
            sm:max-w-[320px]
            lg:max-w-[360px]
            xl:max-w-[380px]
            overflow-hidden
            rounded-[32px]
            border
            border-zinc-800
            bg-zinc-950/90
            backdrop-blur-sm
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            transition-all
            duration-500
            hover:border-accent/40
            hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.15)]
          "
        >
          {/* macOS Window Controls bar */}
          <div className="flex items-center justify-between border-b border-zinc-900/80 bg-zinc-950 px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono tracking-wider text-zinc-500">abhishek.kumar</span>
          </div>

          {/* Profile Image Wrap */}
          <div className="relative group overflow-hidden bg-zinc-950" style={{ transform: "translateZ(30px)" }}>
            {/* Background Accent Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--accent-rgb)/0.15),transparent_65%)] transition-colors duration-1000" />
            
            <img
              src={profileImage}
              alt="Abhishek Kumar — Full Stack Engineer"
              className="
                aspect-[4/5]
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
                relative
                z-10
              "
            />
            {/* Glass Gradient overlay to smoothly blend cut shoulders */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-95 z-20 pointer-events-none" />
            
            {/* Glass Code Tag */}
            <div 
              style={{ transform: "translateZ(40px)" }}
              className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/60 px-3 py-1 text-xs font-mono font-medium text-zinc-300 backdrop-blur-md z-30"
            >
              <span>&lt;FullStack/&gt;</span>
            </div>
          </div>

          {/* Footer location tag */}
          <div 
            className="border-t border-zinc-900/80 bg-zinc-950/40 px-5 py-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <p className="text-center text-sm font-medium tracking-wide text-zinc-400">
              📍 Faridabad, Haryana, IN
            </p>
          </div>

          {/* Background Accent Glow Spot */}
          <div className="absolute -inset-px -z-10 rounded-[32px] bg-gradient-to-tr from-accent/0 via-accent/10 to-accent/20 opacity-0 transition-opacity duration-500 hover:opacity-100" />
        </motion.div>
      </div>
    </>
  );
};

export default HeroImageCard;