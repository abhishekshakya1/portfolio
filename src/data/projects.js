import careConnectImg from "../assets/images/projects/careconnect.png";
import pulseEngineImg from "../assets/images/projects/pulseengine.png";
import portfolioImg from "../assets/images/projects/portfolio.png";

/**
 * 💡 MODULAR PROJECT SHOWCASE DATA
 * To add a new project in the future:
 * 1. Place your screenshot in `src/assets/images/projects/your-project.png`
 * 2. Import it at the top of this file
 * 3. Add a new object to the `projects` array below
 */
export const projects = [
  {
    title: "PulseEngine",
    category: "Backend",
    badge: "Flagship Production SaaS",
    isLive: true,
    description:
      "A high-throughput distributed telemetry ingestion pipeline and autonomous AI SRE platform with sub-3ms Redis queuing, Neon PostgreSQL bulk batching, and Gemini 3.8 Flash root-cause diagnosis.",
    longDescription:
      "PulseEngine decouples high-frequency telemetry ingestion from database persistence through an in-memory Redis buffer and asynchronous bulk-batch worker processing over 100k+ events/sec without exhausting connection pools. When an incident or SLA degradation occurs, an integrated Gemini 3.8 Flash AI SRE Copilot autonomously performs deep root-cause analysis (RCA), assesses blast radius, and generates executable remediation commands with 1-click execution.",
    technologies: ["Next.js 16", "TypeScript", "Redis (Upstash)", "PostgreSQL (Neon)", "Gemini 3.8 Flash", "Docker", "Polar.sh", "Tailwind CSS", "Prisma"],
    image: pulseEngineImg,
    github: "https://github.com/abhishekshakya1/engine",
    live: "https://engine-lovat-beta.vercel.app/",
    features: [
      "Sub-3ms ingestion latency via in-memory Redis buffer and asynchronous worker bulk batching to Neon PostgreSQL.",
      "Autonomous AI SRE Copilot powered by Google Gemini 3.8 Flash delivering instant root-cause analysis & copyable fix commands.",
      "Real-time telemetry streaming dashboard tracking the 4 Golden Signals: Latency, Throughput, Error Rates, and Saturation.",
      "Enterprise multi-channel alerting with automated Telegram webhook triggers for severe latency and error spikes.",
      "Polar.sh subscription billing integration with automated tier quota metering, soft caps, and instant webhook upgrades.",
      "Production-grade Docker containerization with automated multi-stage builds and zero-downtime deployment."
    ],
    architecture: {
      nodes: [
        { name: "Client / SDK Telemetry", type: "Edge Producer" },
        { name: "Next.js 16 Edge Route", type: "Ingestion API" },
        { name: "Upstash Redis Queue", type: "In-Memory Buffer" },
        { name: "Async Worker Daemon", type: "Bulk Batcher" },
        { name: "Neon Serverless Postgres", type: "Persistent Storage" },
        { name: "Gemini 3.8 Flash SRE", type: "AI Diagnosis Engine" }
      ],
      connections: [
        "Application Telemetry -> Edge Ingestion API -> LPUSH into Redis buffer (< 3ms response)",
        "Background Worker -> RPOPLPUSH in micro-batches (500 items) -> Prisma bulk insert into Neon DB",
        "SLA Degradation Trigger -> Telemetry snapshot dispatched to Gemini 3.8 Flash for instant RCA & fix commands",
        "Polar.sh Webhook -> Instant quota elevation and Pro tier unlocks in Neon DB"
      ]
    },
    codeSnippet: `// Telemetry Ingestion Pipeline: Redis Buffering with <3ms Response
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const apiKey = req.headers.get("x-engine-key");

  // 1. O(1) Cache validation of API Key & Tenant Quota
  const tenant = await getCachedTenant(apiKey);
  if (!tenant || tenant.eventsConsumed >= tenant.monthlyQuota) {
    return NextResponse.json({ error: "Quota Exceeded or Invalid Key" }, { status: 429 });
  }

  // 2. Buffer telemetry payload into Redis stream (LPUSH)
  const event = await req.json();
  await redis.lpush("telemetry:stream", JSON.stringify({
    ...event,
    tenantId: tenant.id,
    timestamp: new Date().toISOString()
  }));

  // 3. Fire-and-forget anomaly detection check
  if (event.statusCode >= 500 || event.durationMs > 1500) {
    await triggerGeminiSREDiagnosis({ tenantId: tenant.id, incident: event });
  }

  return NextResponse.json({ success: true, latencyMs: Date.now() - startTime }, { status: 202 });
}`
  },

  {
    title: "CareConnect",
    category: "Full Stack",
    badge: "Flagship Live Project",
    isLive: true,
    description:
      "A production-grade doctor consultation and clinic booking platform featuring role-based dashboards, atomic slot scheduling, and robust JWT session rotation.",
    longDescription:
      "CareConnect addresses real-world healthcare scheduling bottlenecks by bridging patients and medical specialists. Built with React and an Express/MongoDB backend, it implements a decoupled 3-tier architecture (Controllers, Services, Repositories), an Axios interceptor queue that completely eliminates refresh-token race conditions, and atomic database queries to prevent concurrent appointment double-booking.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT Auth", "Axios"],
    image: careConnectImg,
    github: "https://github.com/abhishekshakya1/CareConnect",
    live: "https://care-connect-gamma-nine.vercel.app/",
    features: [
      "Axios response interceptor pipeline with queued request replay resolving token refresh race conditions.",
      "Atomic MongoDB appointment slot reservations preventing double-booking during concurrent checkouts.",
      "Role-Based Access Control (RBAC) supporting Patient, Doctor, and Administrative permissions.",
      "Real-time doctor schedule manager with automated slot expiry and status tracking.",
      "Fully responsive, dark-mode optimized interface built with Tailwind CSS and accessible UX."
    ],
    architecture: {
      nodes: [
        { name: "React SPA Client", type: "Frontend" },
        { name: "Axios Interceptor Queue", type: "Auth Pipeline" },
        { name: "Express REST API", type: "Backend Services" },
        { name: "MongoDB Atlas", type: "Database" }
      ],
      connections: [
        "User Action -> React Client -> Axios Interceptor handles request lifecycle",
        "401 Unauthorized -> Enqueue concurrent calls -> Exchange Refresh Token -> Replay Queue",
        "Express Controller -> Service Validation Layer -> Atomic MongoDB Slot Mutation"
      ]
    },
    codeSnippet: `// Production Axios Interceptor: Resolving Token Refresh Race Conditions
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr);
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);`
  },

  {
    title: "Interactive Developer Portfolio",
    category: "Frontend",
    badge: "Interactive Experience",
    description:
      "A modern, high-performance developer portfolio built with React 19, Tailwind CSS v4, and Framer Motion, featuring dynamic themes and browser-synthesized audio feedback.",
    longDescription:
      "Engineered to showcase full-stack engineering expertise through responsive design, fluid micro-interactions, and high visual fidelity. It implements a multi-accent CSS custom property engine, real-time IST clock, custom spring-physics 3D tilt cards, scroll-driven timeline progress tracks, and zero-asset audio synthesis utilizing the Web Audio API.",
    technologies: ["React", "Tailwind CSS v4", "Framer Motion", "Web Audio API", "Vite"],
    image: portfolioImg,
    github: "https://github.com/abhishekshakya1/portfolio",
    live: "https://abhishek-portfolio.vercel.app",
    features: [
      "Dynamic multi-theme CSS variable engine switching between Emerald, Violet, Amber, and Rose.",
      "Zero-asset audio feedback synthesized dynamically using the browser Web Audio API.",
      "Interactive 3D tilt parallax cards using Framer Motion springs and mouse vector tracking.",
      "Integrated System Architecture flowchart and code inspector drawer for each project.",
      "Fully responsive, semantic markup with accessible high-contrast obsidian styling."
    ],
    architecture: {
      nodes: [
        { name: "React 19 View", type: "Client UI" },
        { name: "Framer Motion", type: "Physics Engine" },
        { name: "Web Audio Context", type: "Audio Synthesizer" },
        { name: "Tailwind v4 Theme", type: "Design System" }
      ],
      connections: [
        "User Interactions -> Trigger Web Audio API Oscillator & Gain Ramp",
        "Theme Accent Toggle -> Update Root CSS Custom Properties -> Instant Re-paint",
        "Scroll Listener -> Framer Motion useScroll -> Dynamic SVG & Timeline Tracker"
      ]
    },
    codeSnippet: `// Web Audio API zero-asset sound synthesizer
const playSound = (type = "hover") => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  if (type === "hover") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  } else if (type === "click") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  }
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);
};`
  }
];