import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useTheme } from "../common/ThemeContext";
import Logo from "../branding/Logo";
import Container from "../common/Container";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Timeline", href: "#timeline" },
  { name: "Contact", href: "#contact" },
];

const themes = [
  { name: "emerald", class: "bg-emerald-500 ring-emerald-500/30" },
  { name: "violet", class: "bg-violet-500 ring-violet-500/30" },
  { name: "amber", class: "bg-amber-500 ring-amber-500/30" },
  { name: "rose", class: "bg-rose-500 ring-rose-500/30" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, setTheme, soundEnabled, setSoundEnabled, playSound } = useTheme();

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "timeline", "contact"];

    const handleScroll = () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/60 bg-black/75 backdrop-blur-md">
      <Container>
        <div className="flex h-[76px] items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => {
                    playSound("click");
                    setActive(link.href.replace("#", ""));
                  }}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-accent" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions (Desktop vs Mobile) */}
          <div className="flex items-center gap-4">
            
            {/* Theme Selector (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name);
                    setTimeout(() => playSound("click"), 50);
                  }}
                  onMouseEnter={() => playSound("hover")}
                  className={`h-4 w-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${t.class} ${
                    theme === t.name 
                      ? "ring-4 scale-110" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                  title={`Switch to ${t.name} accent`}
                />
              ))}
            </div>

            {/* Sound Toggle (Desktop Only) */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) {
                  setTimeout(() => {
                    try {
                      const ctx = new (window.AudioContext || window.webkitAudioContext)();
                      const osc = ctx.createOscillator();
                      const gain = ctx.createGain();
                      osc.type = "sine";
                      osc.frequency.setValueAtTime(600, ctx.currentTime);
                      gain.gain.setValueAtTime(0.04, ctx.currentTime);
                      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                      osc.connect(gain);
                      gain.connect(ctx.destination);
                      osc.start();
                      osc.stop(ctx.currentTime + 0.09);
                    } catch (e) {}
                  }, 50);
                }
              }}
              onMouseEnter={() => playSound("hover")}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-white transition-all hover:border-zinc-700 cursor-pointer"
              title={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
            >
              {soundEnabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
            </button>

            {/* Resume Button (Desktop Only) */}
            <a
              href="/resume.pdf?v=2"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              className="hidden md:flex items-center rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60"
            >
              Resume ↗
            </a>

            {/* Mobile Menu Hamburger (Visible on mobile only) */}
            <button
              aria-label="Toggle Menu"
              className="md:hidden text-zinc-400 hover:text-white cursor-pointer p-1.5 rounded-lg border border-zinc-900 bg-zinc-950/30"
              onClick={() => {
                playSound("click");
                setOpen(!open);
              }}
            >
              {open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="border-t border-zinc-900 bg-black/98 md:hidden transition-all duration-300">
          <Container>
            <nav className="flex flex-col py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playSound("click");
                    setOpen(false);
                  }}
                  onMouseEnter={() => playSound("hover")}
                  className="py-3.5 text-base text-zinc-400 hover:text-white border-b border-zinc-900/40 last:border-0"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="/resume.pdf?v=2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                onMouseEnter={() => playSound("hover")}
                className="mt-6 inline-flex w-full justify-center rounded-xl border border-zinc-800 bg-zinc-950/60 py-3 text-sm font-medium transition-all hover:bg-zinc-900"
              >
                Resume ↗
              </a>

              {/* Mobile Dedicated Controls Panel */}
              <div className="mt-8 border-t border-zinc-900/80 pt-6 space-y-6">
                
                {/* Theme Accent Dot Swapper */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500">Theme Accent</span>
                  <div className="flex items-center gap-3 rounded-full border border-zinc-900 bg-zinc-950 px-3.5 py-2">
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => {
                          setTheme(t.name);
                          setTimeout(() => playSound("click"), 50);
                        }}
                        className={`h-4.5 w-4.5 rounded-full cursor-pointer transition-all duration-300 ${t.class} ${
                          theme === t.name 
                            ? "ring-4 scale-110" 
                            : "opacity-60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sound Effects Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500">Audio Feedback</span>
                  <button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      if (!soundEnabled) {
                        setTimeout(() => {
                          try {
                            const ctx = new (window.AudioContext || window.webkitAudioContext)();
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.type = "sine";
                            osc.frequency.setValueAtTime(600, ctx.currentTime);
                            gain.gain.setValueAtTime(0.04, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + 0.09);
                          } catch (e) {}
                        }, 50);
                      }
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 text-zinc-400"
                  >
                    {soundEnabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
                  </button>
                </div>

              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;