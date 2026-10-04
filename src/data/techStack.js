import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiVercel,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiPostman,
  SiLeetcode,
} from "react-icons/si";

import { personalInfo } from "./personalInfo";

export const techStack = [
  {
    title: "Frontend",
    category: "Frontend",
    count: "06",
    color: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    skills: [
      {
        name: "React.js",
        icon: FaReact,
        iconColor: "#61DAFB",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        iconColor: "#FFFFFF",
      },
      {
        name: "JavaScript (ES6+)",
        icon: FaJs,
        iconColor: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        iconColor: "#3178C6",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        iconColor: "#06B6D4",
      },
      {
        name: "HTML5 & CSS3",
        icon: FaHtml5,
        iconColor: "#E34F26",
      },
    ],
  },

  {
    title: "Backend",
    category: "Backend",
    count: "04",
    color: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    skills: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        iconColor: "#339933",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        iconColor: "#FFFFFF",
      },
      {
        name: "REST APIs",
        icon: SiExpress,
        iconColor: "#38BDF8",
      },
      {
        name: "Auth & Security (JWT)",
        icon: SiExpress,
        iconColor: "#F43F5E",
      },
    ],
  },

  {
    title: "Database",
    category: "Database",
    count: "03",
    color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    skills: [
      {
        name: "MongoDB",
        icon: SiMongodb,
        iconColor: "#47A248",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        iconColor: "#4169E1",
      },
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        iconColor: "#2D3748",
      },
    ],
  },

  {
    title: "Tools & Problem Solving",
    category: "Tools",
    count: "06",
    color: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    skills: [
      {
        name: "LeetCode (116+ DSA)",
        icon: SiLeetcode,
        iconColor: "#FFA116",
        url: personalInfo.socials.leetcode.url,
      },
      {
        name: "Git",
        icon: FaGitAlt,
        iconColor: "#F05032",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        iconColor: "#FFFFFF",
        url: personalInfo.socials.github.url,
      },
      {
        name: "Postman",
        icon: SiPostman,
        iconColor: "#FF6C37",
      },
      {
        name: "Docker",
        icon: SiDocker,
        iconColor: "#2496ED",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        iconColor: "#FFFFFF",
      },
    ],
  },
];