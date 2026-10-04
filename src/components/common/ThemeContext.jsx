import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "emerald";
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("portfolio-sound");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Apply theme class to body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-emerald", "theme-violet", "theme-amber", "theme-rose");
    body.classList.add(`theme-${theme}`);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("portfolio-sound", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Synthesize UI sound effects using Web Audio API (extremely robust, no external assets needed!)
  const playSound = (type = "hover") => {
    if (!soundEnabled) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      if (type === "hover") {
        // Soft mechanical tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "click") {
        // Quick clean click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === "success") {
        // Two-tone warm success chime
        const now = ctx.currentTime;
        
        const playNote = (freq, delay, duration) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + delay);
          
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now + delay);
          osc.stop(now + delay + duration + 0.05);
        };
        
        // E5 then A5
        playNote(659.25, 0, 0.25);
        playNote(880.00, 0.1, 0.35);
      } else if (type === "expand") {
        // Soft rising sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn("Web Audio API sound playback failed: ", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, soundEnabled, setSoundEnabled, playSound }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
