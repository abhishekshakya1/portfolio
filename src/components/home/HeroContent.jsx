import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import { personalInfo } from "../../data/personalInfo";
import OpenToWork from "./OpenToWork";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const roles = personalInfo.roles;

const HeroContent = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { playSound } = useTheme();

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));

        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 30 : 70);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl py-2 lg:py-10 mx-auto lg:mx-0">
      {/* Availability Status Badge (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden lg:block"
      >
        <OpenToWork />
      </motion.div>

      {/* Hi, I'm indicator for mobile screens */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="block lg:hidden text-lg font-medium text-zinc-400 font-mono tracking-wide mb-1 select-none"
      >
        Hi, I'm
      </motion.span>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="clash text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mt-1 lg:mt-6"
      >
        <span className="text-white">Abhishek</span>{" "}
        <br className="hidden sm:inline" />
        <span className="text-zinc-500 hover:text-accent transition-colors duration-500">Kumar</span>
      </motion.h1>

      {/* Typing Role Subheading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 sm:mt-5 flex items-center gap-2.5 font-mono text-base sm:text-lg md:text-xl font-medium tracking-wide text-accent min-h-[32px] justify-center lg:justify-start"
      >
        <span className="text-zinc-500">&gt;</span>
        <span>{displayText}</span>
        <span className="h-5 w-[2px] bg-accent animate-pulse" />
      </motion.div>

      {/* Description Paragraph: Concise on Mobile, Rich on Desktop */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-zinc-400 font-normal"
      >
        <span className="block sm:hidden">
          Building resilient full-stack web applications with React, Next.js, Node.js & PostgreSQL, backed by 130+ DSA problems solved on LeetCode.
        </span>
        <span className="hidden sm:inline">
          Full Stack Engineer specializing in resilient web architectures, clean decoupled backend microservices, and high-performance interactive interfaces using React, Next.js, Node.js, PostgreSQL, and MongoDB.
        </span>
      </motion.p>

      {/* Action Buttons (Responsive Sizing across mobile & desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
      >
        <a
          href="#projects"
          onMouseEnter={() => playSound("hover")}
          onClick={() => playSound("click")}
          className="
            relative
            inline-flex
            items-center
            justify-center
            rounded-full
            lg:rounded-2xl
            bg-accent
            text-zinc-950
            px-8
            py-3.5
            text-sm
            font-bold
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_10px_20px_rgba(var(--accent-rgb),0.15)]
            w-full
            max-w-[280px]
            sm:w-auto
            text-center
            cursor-pointer
          "
        >
          See My Work ↓
        </a>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => playSound("hover")}
          onClick={() => playSound("click")}
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            lg:rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/40
            px-8
            py-3.5
            text-sm
            font-medium
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:border-zinc-600
            hover:bg-zinc-900/60
            hover:-translate-y-1
            w-full
            max-w-[280px]
            sm:w-auto
            text-center
            cursor-pointer
          "
        >
          Resume ↗
        </a>
      </motion.div>

      {/* Quick Social Proof Row (GitHub, LinkedIn, LeetCode) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 text-zinc-400"
      >
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">Verified:</span>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href={personalInfo.socials.github.url}
            target="_blank"
            rel="noreferrer"
            title="GitHub Profile"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("click")}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:border-zinc-600 transition-all hover:-translate-y-0.5"
          >
            <FaGithub size={13} />
            <span className="font-mono">GitHub</span>
          </a>

          <a
            href={personalInfo.socials.linkedin.url}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("click")}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-300 hover:text-sky-400 hover:border-sky-500/40 transition-all hover:-translate-y-0.5"
          >
            <FaLinkedin size={13} className="text-sky-400" />
            <span className="font-mono">LinkedIn</span>
          </a>

          <a
            href={personalInfo.socials.leetcode.url}
            target="_blank"
            rel="noreferrer"
            title="LeetCode Profile (116+ Solved)"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("click")}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all hover:-translate-y-0.5"
          >
            <SiLeetcode size={13} className="text-amber-400" />
            <span className="font-mono">LeetCode</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;