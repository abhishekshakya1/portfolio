# Abhishek Kumar — Developer Portfolio ⚡

> **Modern, interactive, and responsive developer portfolio showcasing production full-stack engineering, system architecture topologies, and verified problem-solving credentials.**

[![Vite](https://img.shields.io/badge/Vite-v6+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Interactive-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 🌐 Overview

This portfolio is engineered to go beyond standard static templates by presenting real-world engineering thinking:
- **Zero Inflated Claims**: Every credential is authentic and verifiable (BCA '26 graduate from DAV Centenary College / MDU Rohtak, 116+ DSA problems solved on LeetCode).
- **Architecture-First Presentation**: Projects feature interactive system topology maps and technical implementation breakdowns (e.g., token refresh queue concurrency, atomic slot bookings), rather than surface-level screenshots.
- **Audio-Tactile Experience**: Subtle, non-intrusive sound effects (with full user mute control) coupled with micro-animations powered by Framer Motion.

---

## ✨ Key Features

- **🎯 Interactive System Architecture Topology**: Visual pipeline viewer showing Client ➔ Proxy ➔ Server ➔ Database interactions with smooth horizontal scrolling.
- **🔊 Audio & Motion Feedback**: Bespoke UI sound effects for clicks, tab changes, and success alerts via the Web Audio API (with toggleable audio controls).
- **🎨 Dynamic Custom Accent Engine**: Real-time accent color switches and responsive glassmorphic cards.
- **⚡ Verified Social & Technical Proofs**: Direct interactive badges linking to verified LeetCode (`1_abhishekshakya`), GitHub (`@abhishekshakya1`), and LinkedIn profiles.
- **📨 Automated Email Engine**: Integrated contact system via EmailJS with robust client-side validation and multi-variable template compatibility.
- **📱 100% Responsive Design**: Carefully tailored layouts ensuring seamless usability across small mobile viewports (360px+) through to ultrawide displays.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | [React 19](https://react.dev/), [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/), Vanilla CSS Tokens, Clash Display Typography |
| **Animation & Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons & Media** | [React Icons](https://react-icons.github.io/react-icons/) (Heroicons, Feather, Simple Icons) |
| **Email Service** | [EmailJS](https://www.emailjs.com/) |
| **Build Tooling** | [Vite](https://vitejs.dev/) |

---

## 📂 Project Architecture

The repository adheres to a clean, modular structure:

```text
portfolio/
├── public/
│   ├── favicon.svg             # Custom vector favicon
│   └── resume.pdf              # Verified downloadable CV
├── src/
│   ├── assets/                 # Optimized project screenshots & graphics
│   ├── components/
│   │   ├── common/             # Reusable UI primitives (Container, Cursor, ThemeContext)
│   │   ├── home/               # Hero section, interactive social proof pills & stats
│   │   ├── about/              # Professional narrative & tactical interest cards
│   │   ├── skills/             # Categorized skill badges & verified profile links
│   │   ├── projects/           # Project gallery & interactive case study modal
│   │   ├── timeline/           # Career & academic milestones (2023 - 2026)
│   │   └── contact/            # Validated contact form, copy email action & minimal footer
│   ├── data/
│   │   ├── personalInfo.js     # Single source of truth for all profile details & links
│   │   ├── projects.js         # Case study data, system topologies & code snippets
│   │   ├── techStack.js        # Skill categorization & proficiency metadata
│   │   └── timeline.js         # Chronological milestones & achievements
│   ├── index.css               # Global theme tokens, typography & animations
│   ├── App.jsx                 # Master application layout
│   └── main.jsx                # React root bootstrap
├── .env.example                # Sample environment variables
└── package.json                # Project dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`

### 1. Clone the repository

```bash
git clone https://github.com/abhishekshakya1/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder (reference `.env.example`):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> *Note: If these variables are omitted, the form automatically runs in simulation mode for local testing without breaking.*

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### 5. Build for Production

```bash
npm run build
```

Generates an optimized production bundle in the `dist/` directory.

---

## 📬 Contact & Connect

- **Author**: Abhishek Kumar
- **Role**: Full Stack Engineer (React, Next.js, Node.js, PostgreSQL)
- **LinkedIn**: [Abhishek Kumar](https://www.linkedin.com/in/abhishek-kumar-shakya-34208a32a/)
- **GitHub**: [@abhishekshakya1](https://github.com/abhishekshakya1)
- **LeetCode**: [1_abhishekshakya](https://leetcode.com/u/1_abhishekshakya/)
- **Email**: [abhishekshakya2357@gmail.com](mailto:abhishekshakya844@gmail.com)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
