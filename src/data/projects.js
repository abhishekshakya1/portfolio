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
    title: "PulseEngine",
    category: "Backend",
    badge: "In Active Development (WIP)",
    isWip: true,
    description:
      "A high-throughput distributed event ingestion and background task queue engine with Redis caching, worker thread pools, idempotency enforcement, and PostgreSQL persistence.",
    longDescription:
      "PulseEngine decouples high-frequency HTTP ingestion from resource-intensive background processing. Designed with TypeScript, Node.js, and PostgreSQL via Prisma, it leverages Redis task queues, exponential backoff retries, dead-letter queues (DLQ), and strict idempotency key tracking to guarantee fault tolerance and high-volume consistency.",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker"],
    image: pulseEngineImg,
    github: "https://github.com/abhishekshakya1/pulse-engine",
    live: null,
    features: [
      "Redis-backed asynchronous message broker with exponential backoff and dead-letter queues (DLQ).",
      "Strict idempotency key enforcement eliminating duplicate job executions across network retries.",
      "Strongly typed relational persistence model powered by PostgreSQL and Prisma ORM.",
      "Scalable worker pool processing async batches up to 14,000+ operations/sec.",
      "Containerized microservice setup with automated Docker Compose orchestration."
    ],
    architecture: {
      nodes: [
        { name: "HTTP Ingestion API", type: "Producer" },
        { name: "Redis Task Queue", type: "Message Broker" },
        { name: "Async Worker Pool", type: "Consumers" },
        { name: "PostgreSQL + Prisma", type: "Persistent Audit" }
      ],
      connections: [
        "Client Request -> Validate Schema & Idempotency Key -> Push to Redis Task Stream",
        "Worker Threads -> Dequeue Jobs -> Execute Payload with Exponential Backoff",
        "State Transition -> Committed via Prisma to PostgreSQL -> Metrics Emitted"
      ]
    },
    codeSnippet: `// Worker Task Handler with Idempotency Validation & Exponential Backoff
export async function processTaskJob(job: TaskJob): Promise<JobResult> {
  const { idempotencyKey, payload, retryCount = 0 } = job;

  // 1. Enforce Idempotency Key check in Redis
  const isProcessed = await redis.get(\`idemp:\${idempotencyKey}\`);
  if (isProcessed) {
    return { status: "SKIPPED", message: "Job already executed successfully." };
  }

  try {
    // 2. Execute business task logic atomically
    const result = await prisma.$transaction(async (tx) => {
      return await executeBusinessLogic(payload, tx);
    });

    // 3. Mark job complete with 24h TTL
    await redis.set(\`idemp:\${idempotencyKey}\`, "COMPLETED", "EX", 86400);
    return { status: "SUCCESS", data: result };
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential Backoff
      await taskQueue.add(job, { delay, retryCount: retryCount + 1 });
      return { status: "RETRY_SCHEDULED", delayMs: delay };
    }
    // Route fatal errors to Dead Letter Queue (DLQ)
    await deadLetterQueue.add({ job, error: String(error) });
    throw error;
  }
}`
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