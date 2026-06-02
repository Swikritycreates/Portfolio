"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Project { title: string; description: string; tags: string[]; repo: string; demo?: string; highlight?: string; }
interface Role { org: string; role: string; period: string; bullets: string[]; }

const PROJECTS: Project[] = [
  { title: "LIPI AI", description: "End-to-end translation pipeline for digitizing Tibetan scripts from textured surfaces using OpenCV for image preprocessing and fine-tuned transformer models from Hugging Face for text translation.", tags: ["Python", "OpenCV", "HuggingFace", "Transformers"], repo: "https://github.com/swikritycreates/lipi-ai" },
  { title: "Smith Circle", description: "Developed a variation of the PageRank algorithm to study and analyze the real-life social network of undergraduate students at Smith College.", tags: ["Python", "Graph Theory", "NetworkX", "PageRank"], repo: ""},
  { title: "Brain-Body Weight Analysis", description: "Applied regression modeling, diagnostic testing, and confidence interval estimation in R to study allometric scaling between brain and body weight across mammalian species.", tags: ["Statistical Modeling", "Regression", "Hypothesis Testing"], repo: "https://swikritycreates.github.io/brain-body-scaling-analysis/" },
  { title: "Voter Behavior Prediction Model", description: "Logistic regression model to predict infrequent voting behavior using demographic data. Evaluated using ROC/AUC and analyzed classification trade-offs for decision thresholds.", tags: ["R", "Logistic Regression", "ROC/AUC", "Statistics"], repo: "https://github.com/Swikritycreates/voter-frequency--analysis" },
  { title: "Racial Wage Gap Analysis", description: "Multivariate regression analysis of wage disparities across racial groups, controlling for key variables and interpreting coefficients to quantify and explain differences.", tags: ["R", "Regression", "ggplot2", "Statistics"], repo: "https://github.com/Swikritycreates/racial-wage-gap-analysis" },
];

const EXPERIENCE = [
  { org: <a href = "https://github.com/vbilsmith/vbilsmith.github.io">"Veterinary & Biological Informatics Lab, Smith College" </a>, role: "Research Assistant", period: "Jan 2026 – May 2026", bullets: ["Applied relational database concepts and SQL to extract, clean, and organize large-scale genomic tabular datasets.", "Wrote unit tests using pytest to validate bioinformatics pipelines processing RNA-seq datasets."] },
  { org: "Smith College ITS", role: "CRM Intern", period: "May 2025 – Present", bullets: ["Reverse engineered Salesforce order of execution from system logs and identified checkpoints using Notebook LLM to read debug logs.", "Evaluated 80+ workflow rules to identify redundancies and built 9 scalable, logic-driven flows that reduced system complexity by 80%.", "Translated stakeholder requirements into user stories and wrote test scripts that identified and resolved 12 critical logic errors."] },
  { org: "Smith College ITS", role: "Data Integration Intern", period: "May 2025 – Aug 2025", bullets: ["Built SnapLogic integration pipelines to resolve ticket duplication errors between TeamDynamix and 25Live, automating 17 slow workflows and saving 55+ hours of manual work per week.", "Diagnosed pipeline errors by analyzing historical JSON payloads to trace data inconsistencies in automated workflows.", "Conducted stakeholder consultations and produced technical documentation for system design and workflow behavior."] },
];

const EDUCATION = [ 
  {org: "Smith College", title: "B.A. in Computer Science and Statistics", description: "Expected May 2028 | GPA: 3.93/4.00", tags: ["Relevant Coursework: Data Structures, Algorithms, Machine Learning, Statistical Inference, Regression Analysis, Database Systems"]},
  {org: "St. Xavier's College, Maitighat", title: "High School", description: "2020- 2022| GPA: 3.85/4.00", tags: ["Relevant Coursework: Mathematics, Biology, Chemistry, Physics", "🎓 Full Tuition Award Recipient"]},
  {org: "Kalika Manavgyan Secondary School", title: "Secondary School", description: "2018 - 2020 | GPA: 4.00/4.00", tags: ["⭐ Academic Excellence Award Recipient"]},
];

const INVOLVEMENT: Role[] = [
  { org: "Smith International Student Organization", role: "Publicity Lead", period: "Jan 2025 – Present", bullets: ["Designed promotional content and supported event logistics for programs supporting 1,000+ students.", "Strengthened audience engagement and campus participation through targeted digital content."] },
  { org: "Office of Student Engagement, Smith College", role: "Student Staff", period: "Aug 2025 – Present", bullets: ["Managed front-desk operations and provided operational support for campus events.", "Resolved facility, scheduling, and navigation inquiries in a high-traffic environment."] },
  { org: "Junior Division Nepal Organization, Kathmandu", role: "President", period: "Sept 2023 – Sept 2024", bullets: ["Organized weekly teaching sessions and coordinated a 7-member team to deliver accessible technical education.", "Led a year-long digital literacy initiative reaching more than 500 participants."] },
];

const SECTION_CONFIGS = [
  { color: "#f472b6", speed: 0.22, size: [9, 15] },
  { color: "#e879a0", speed: 0.18, size: [8, 13] },
  { color: "#c026d3", speed: 0.28, size: [10, 14] },
  { color: "#be185d", speed: 0.20, size: [9, 16] },
  { color: "#db2777", speed: 0.15, size: [8, 12] },
  { color: "#ec4899", speed: 0.25, size: [10, 15] },
];

// Dark mode versions of particle colors
const SECTION_CONFIGS_DARK = [
  { color: "#f9a8d4", speed: 0.22, size: [9, 15] },
  { color: "#f472b6", speed: 0.18, size: [8, 13] },
  { color: "#e879f9", speed: 0.28, size: [10, 14] },
  { color: "#ec4899", speed: 0.20, size: [9, 16] },
  { color: "#f472b6", speed: 0.15, size: [8, 12] },
  { color: "#fbcfe8", speed: 0.25, size: [10, 15] },
];

const ML_TERMS = [
  "∇L(θ)","σ(z)","argmax","∑wᵢxᵢ","P(y|x)","relu(x)","β̂=(XᵀX)⁻¹Xᵀy",
  "softmax","H(p,q)","KL div","∂J/∂w","μ±2σ","R²=0.94","AUC=0.87",
  "dropout(0.3)","epoch 42","loss:0.023","acc:97.4%","lr=1e-4",
  "precision:0.91","recall:0.88","F1:0.89","χ² test","p<0.05",
  "n=1024","k-fold=5","LSTM","attention","embedding","conv2d(64,3)",
  "BatchNorm","AdamW","residual","transformer","tokenize","fit(X,y)",
  "predict()","eigenvalue","SVD","PCA","t-SNE","z-score","IQR",
  "bootstrap","Bayes","posterior","likelihood","H₀ rejected","α=0.05",
  "CI:[0.82,0.96]","RNA-seq","bioinformatics","np.linalg","torch.nn",
  "sklearn","ggplot2","logit(p)","glm()","lm(y~x)","cor(X,Y)=0.73","ANOVA",
];

// ─── Intro Screen ─────────────────────────────────────────────────────────────
function IntroScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading"|"done"|"exit">("loading");
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  const LOG_LINES = [
    "initializing portfolio v2.6.1...",
    "loading modules: [math, stats, cs]",
    "fitting model on experience data...",
    "σ(z) = 1/(1 + e^(-z))  ✓",
    "running cross-validation (k=5)...",
    "AUC: 0.97 | F1: 0.94 | acc: 96.8%",
    "pipeline: Everything I know → Machine learning and data analysis ✓",
    "pipeline validating ✓",
    "merging datasets ✓",
    "extraction complete ✓",
    "ready.",
  ];

  useEffect(() => {
    let lineIdx = 0;
    let prog = 0;

    const tick = () => {
      prog = Math.min(100, prog + Math.random() * 12 + 4);
      setProgress(Math.round(prog));

      if (lineIdx < LOG_LINES.length && prog > (lineIdx / LOG_LINES.length) * 100) {
        setLines(l => [...l, LOG_LINES[lineIdx]]);
        lineIdx++;
      }

      if (prog >= 100) {
        setPhase("done");
        setTimeout(() => {
          setExiting(true);
          setTimeout(onDone, 700);
        }, 700);
        return;
      }
      setTimeout(tick, 120 + Math.random() * 80);
    };

    setTimeout(tick, 300);
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#0d0d0d",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* faint pink grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(236,72,153,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(236,72,153,0.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{ width: "min(520px, 92vw)", fontFamily: "monospace", position: "relative", zIndex: 1 }}>
        {/* header */}
        <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ec4899", boxShadow: "0 0 12px #ec4899" }} />
          <span style={{ color: "#ec4899", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            swikriti.dumre — portfolio init
          </span>
        </div>

        {/* log lines */}
        <div style={{ marginBottom: 24, minHeight: 200 }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              display: "flex", gap: 10, marginBottom: 5,
              opacity: 1,
              animation: "fadeSlideIn 0.3s ease",
            }}>
              <span style={{ color: "#6b7280", fontSize: 11, userSelect: "none", minWidth: 24 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{
                color: line === "ready." ? "#ec4899" : line.includes("✓") ? "#86efac" : "#d1d5db",
                fontSize: 13,
                fontWeight: line === "ready." ? 700 : 400,
              }}>
                {line}
              </span>
            </div>
          ))}
          {phase === "loading" && (
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <span style={{ color: "#6b7280", fontSize: 11, minWidth: 24 }}>
                {String(lines.length + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "#ec4899", fontSize: 13 }}>▋</span>
            </div>
          )}
        </div>

        {/* progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#6b7280", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>loading</span>
            <span style={{ color: "#ec4899", fontSize: 11 }}>{progress}%</span>
          </div>
          <div style={{ height: 3, background: "#1f1f1f", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4)",
              borderRadius: 99,
              transition: "width 0.15s ease",
              boxShadow: "0 0 8px #ec4899aa",
            }} />
          </div>
        </div>

        {phase === "done" && (
          <div style={{
            color: "#ec4899", fontSize: 12, textAlign: "center", letterSpacing: "0.15em",
            textTransform: "uppercase", opacity: 1,
            animation: "fadeSlideIn 0.4s ease",
          }}>
            welcome ✦
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Animated Background Canvas ───────────────────────────────────────────────
function AnimatedBackground({ sectionIndex, dark }: { sectionIndex: number; dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef(SECTION_CONFIGS[0]);
  const targetConfigRef = useRef(SECTION_CONFIGS[0]);
  const transitionRef = useRef(0);
  const particlesRef = useRef<Array<{ text: string; x: number; y: number; vy: number; vx: number; opacity: number; size: number; life: number }>>([]);

  useEffect(() => {
    const W = window.innerWidth, H = window.innerHeight;
    particlesRef.current = Array.from({ length: 55 }, () => ({
      text: ML_TERMS[Math.floor(Math.random() * ML_TERMS.length)],
      x: Math.random() * W, y: Math.random() * H,
      vy: -(Math.random() * 0.25 + 0.08), vx: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.16 + 0.04, size: Math.random() * 6 + 9, life: Math.random() * 400,
    }));
  }, []);

  useEffect(() => {
    const configs = dark ? SECTION_CONFIGS_DARK : SECTION_CONFIGS;
    targetConfigRef.current = configs[Math.min(sectionIndex, configs.length - 1)];
    transitionRef.current = 0;
  }, [sectionIndex, dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const hexToRgb = (hex: string) => ({ r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) });
    const lerpColor = (c1: string, c2: string, t: number) => {
      const a = hexToRgb(c1), b = hexToRgb(c2);
      return `rgb(${Math.round(lerp(a.r,b.r,t))},${Math.round(lerp(a.g,b.g,t))},${Math.round(lerp(a.b,b.b,t))})`;
    };

    let frame: number;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (transitionRef.current < 1) transitionRef.current = Math.min(1, transitionRef.current + 0.012);
      const t = transitionRef.current;
      const cur = configRef.current, tgt = targetConfigRef.current;
      const color = lerpColor(cur.color, tgt.color, t);
      const speed = lerp(cur.speed, tgt.speed, t);
      const sizeMin = lerp(cur.size[0], tgt.size[0], t);
      const sizeRange = lerp(cur.size[1]-cur.size[0], tgt.size[1]-tgt.size[0], t);
      if (t >= 1) configRef.current = tgt;

      particlesRef.current.forEach((p) => {
        p.x += p.vx * (speed / 0.2);
        p.y += p.vy * (speed / 0.2);
        p.life++;
        if (p.y < -30 || p.x < -120 || p.x > W + 120) {
          p.x = Math.random() * W; p.y = H + 20;
          p.text = ML_TERMS[Math.floor(Math.random() * ML_TERMS.length)];
          p.opacity = Math.random() * 0.16 + 0.04;
          p.size = sizeMin + Math.random() * sizeRange; p.life = 0;
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [dark]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── useReveal ────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up"|"left"|"right" }) {
  const { ref, visible } = useReveal();
  const t = direction === "up" ? "translateY(28px)" : direction === "left" ? "translateX(-28px)" : "translateX(28px)";
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translate(0,0)" : t, transition: `opacity 0.6s cubic-bezier(.25,.8,.25,1) ${delay}ms, transform 0.6s cubic-bezier(.25,.8,.25,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Theme-aware primitives ───────────────────────────────────────────────────
function Tag({ label, dark }: { label: string; dark: boolean }) {
  return (
    <span className={`rounded-full border px-3 py-0.5 text-xs font-mono ${dark ? "border-pink-800 bg-pink-950/60 text-pink-300" : "border-pink-200 bg-pink-50 text-pink-700"}`}>
      {label}
    </span>
  );
}

function Card({ children, dark, className = "" }: { children: React.ReactNode; dark: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl border backdrop-blur shadow-sm transition-all duration-300 ${dark ? "border-pink-900/60 bg-zinc-900/80 hover:border-pink-700/60" : "border-pink-100 bg-white/85 hover:border-pink-300"} hover:shadow-md hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}

function ProjectCard({ p, index, dark }: { p: Project; index: number; dark: boolean }) {
  return (
    <Reveal delay={index * 100} direction={index % 2 === 0 ? "left" : "right"}>
      <Card dark={dark} className="flex flex-col h-full p-6 hover:shadow-[0_4px_32px_rgba(236,72,153,0.13)]">
        {p.highlight && (
          <span className={`mb-3 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-semibold tracking-widest uppercase ${dark ? "bg-pink-900/50 text-pink-300" : "bg-pink-100 text-pink-600"}`}>
            {p.highlight}
          </span>
        )}
        <h3 className={`mb-2 text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{p.title}</h3>
        <p className={`mb-4 flex-1 text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-gray-500"}`}>{p.description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {p.tags.map((t) => <Tag key={t} label={t} dark={dark} />)}
        </div>
        <div className="flex gap-3">
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${dark ? "border-pink-800 text-pink-300 hover:bg-pink-900/40" : "border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-400"}`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-700">↗ Live Demo</a>}
        </div>
      </Card>
    </Reveal>
  );
}

function EducationCard({
  p: edu,
  index,
  dark,
}: {
  p: typeof EDUCATION[0];
  index: number;
  dark: boolean;
}) {
  return (
    <Reveal
      delay={index * 100}
      direction={index % 2 === 0 ? "left" : "right"}
    >
      <Card
        dark={dark}
        className="flex flex-col h-full p-6 hover:shadow-[0_4px_32px_rgba(236,72,153,0.13)]"
      >
        <h3
          className={`mb-2 text-xl font-bold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {edu.org}
        </h3>

        <p className="text-pink-500 font-semibold mb-2">
          {edu.title}
        </p>

        <p
          className={`mb-4 text-sm leading-relaxed ${
            dark ? "text-zinc-400" : "text-gray-500"
          }`}
        >
          {edu.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {edu.tags.map((t) => (
            <Tag key={t} label={t} dark={dark} />
          ))}
        </div>
      </Card>
    </Reveal>
  );
}
function RoleCard({ role, index, dark }: { role: typeof EXPERIENCE[0]; index: number; dark: boolean }) {
  return (
    <Reveal delay={index * 80}>
      <Card dark={dark} className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>{role.org}</h3>
            <p className="text-pink-500 font-semibold text-sm">{role.role}</p>
          </div>
          <span className={`rounded-full border px-3 py-1 font-mono text-xs shrink-0 ${dark ? "border-pink-900 bg-pink-950/50 text-pink-400" : "border-pink-100 bg-pink-50 text-pink-500"}`}>
            {role.period}
          </span>
        </div>
        <ul className="space-y-1.5">
          {role.bullets.map((b, i) => (
            <li key={i} className={`flex gap-3 text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-gray-500"}`}>
              <span className="mt-1 text-pink-400 shrink-0 text-xs">◆</span>{b}
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

function useSectionTracker(ids: string[], onChange: (i: number) => void) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onChange(i); }, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids, onChange]);
}

const SECTION_IDS = ["hero","about","education","experience","projects","involvement","connect"];

// ─── Dark mode toggle button ──────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={`relative flex items-center rounded-full border px-1 transition-all duration-300 ${dark ? "border-pink-700 bg-zinc-800 w-12 h-6" : "border-pink-200 bg-pink-50 w-12 h-6"}`}
    >
      {/* track icons */}
      <span className="absolute left-1.5 text-[10px] select-none">🌙</span>
      <span className="absolute right-1.5 text-[10px] select-none">☀️</span>
      {/* thumb */}
      <span className={`absolute top-0.5 h-5 w-5 rounded-full shadow transition-all duration-300 ${dark ? "left-[1.35rem] bg-pink-400" : "left-0.5 bg-pink-600"}`} />
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [dark, setDark] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);

  const handleSectionChange = useCallback((i: number) => setSectionIndex(i), []);
  useSectionTracker(SECTION_IDS, handleSectionChange);

  const bg = dark ? "bg-[#0d0d0f]" : "bg-[#fdf6f9]";
  const text = dark ? "text-white" : "text-gray-900";
  const subtext = dark ? "text-zinc-400" : "text-gray-500";
  const navBg = dark ? "bg-zinc-950/80 border-zinc-800" : "bg-white/70 border-pink-100/80";
  const navLink = dark ? "text-zinc-400 hover:text-pink-400" : "text-gray-500 hover:text-pink-600";
  const sectionH = dark ? "text-white" : "text-gray-900";

  return (
    <>
      {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}

      <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${bg} ${text}`}>
        <AnimatedBackground sectionIndex={sectionIndex} dark={dark} />

        {/* ambient glows */}
        <div className={`pointer-events-none fixed top-0 left-0 h-[500px] w-[500px] rounded-full blur-[150px] transition-all duration-1000 ${dark ? "bg-pink-900/20" : "bg-pink-200/25"}`} />
        <div className={`pointer-events-none fixed bottom-0 right-0 h-[500px] w-[500px] rounded-full blur-[150px] transition-all duration-1000 ${dark ? "bg-rose-900/15" : "bg-rose-200/20"}`} />

        {/* ── NAV ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b backdrop-blur-md transition-colors duration-300 ${navBg}`}>
          <div className="hidden gap-8 text-sm md:flex font-medium">
            {["about","education","experience","projects","involvement","connect"].map((s) => (
              <a key={s} href={`#${s}`} className={`transition-colors capitalize tracking-wide ${navLink}`}>{s}</a>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
            <a href="/Resume_Swikriti_Dumre_CS.pdf" download className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${dark ? "border-pink-700 bg-pink-950/40 text-pink-300 hover:bg-pink-900/50" : "border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100 hover:border-pink-300"}`}>
              ↓ Resume
            </a>
            <span className={`text-base font-black tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Swikriti Dumre</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="hero" className="relative z-10 flex min-h-screen items-center justify-center px-8 md:px-16 text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-pink-400">Mathematics · Statistics · Computer Science</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={`mb-6 text-[clamp(3.2rem,9vw,6.5rem)] font-black leading-[0.93] tracking-tight ${sectionH}`}>
                {" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#ec4899 0%,#be185d 100%)" }}>
                  Swikriti Dumre
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${subtext}`}>
                Curiosity drives me. I work at the intersection of Mathematics, Statistics and Computer Science to bring unique solutions backed by strong patterns.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <a href="#projects" className="rounded-2xl bg-pink-600 px-7 py-3 font-bold text-white text-sm tracking-wide transition hover:bg-pink-700 hover:scale-105 shadow-lg shadow-pink-200/40">
                  See My Work
                </a>
                <a href="/Resume_Swikriti_Dumre_CS.pdf"  target="_blank" rel="noopener noreferrer" className={`rounded-2xl border px-7 py-3 text-sm font-semibold transition ${dark ? "border-pink-800 text-pink-300 hover:bg-pink-950/50" : "border-pink-200 text-pink-700 bg-white/80 hover:border-pink-400 hover:bg-pink-50"}`}>
                  View Computer Science Resume
                </a>
                <a href="/SwikritiDumre_ResumeF.pdf"  target="_blank" rel="noopener noreferrer" className={`rounded-2xl border px-7 py-3 text-sm font-semibold transition ${dark ? "border-pink-800 text-pink-300 hover:bg-pink-950/50" : "border-pink-200 text-pink-700 bg-white/80 hover:border-pink-400 hover:bg-pink-50"}`}>
                  View Data Science Resume
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className={`mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm backdrop-blur shadow-sm ${dark ? "border-pink-900 bg-zinc-900/70 text-zinc-300" : "border-pink-200 bg-white/80 text-gray-600"}`}>
                🏆 <span className="font-semibold text-pink-500">Best Business Pitch</span> — ASA DataFest 2026
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="relative z-10 mx-auto max-w-7xl px-8 py-32 md:px-16">
          <Reveal><h2 className={`text-4xl md:text-5xl font-black mb-14 ${sectionH}`}>About Me</h2></Reveal>
          <div className="grid gap-14 md:grid-cols-2 items-center">
            <Reveal direction="left">
              <div className="flex justify-center md:justify-start">
                <div className={`relative h-72 w-72 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 shadow-inner ${dark ? "border-pink-800 bg-pink-950/30" : "border-pink-300 bg-pink-50/80"}`}>
                  <div className="text-5xl">🌸</div>
                  <img src="img.jpeg" alt="Swikriti's Photo"></img>

                </div>
              </div>
            </Reveal>
            <div>
              <Reveal direction="right" delay={80}>
                <p className={`text-lg leading-relaxed ${subtext}`}>
                  Hi! I'm Swikriti. I am currently a junior at Smith College studying{" "}
                  <strong className={dark ? "text-white" : "text-gray-900"}>Mathematics & Statistics</strong> and{" "}
                  <strong className={dark ? "text-white" : "text-gray-900"}>Computer Science</strong>.
                </p>
              </Reveal>
              <Reveal direction="right" delay={160}>
                <p className={`mt-4 text-lg leading-relaxed ${subtext}`}>
                  I enjoy building software that brings a creative tangent to monotonous workflows. I think to scale my products and the impacts associated with them, and solve problems that create positive change.
                </p>
              </Reveal>
              <Reveal direction="right" delay={240}>
                <dl className="mt-8 grid grid-cols-2 gap-4">
                  {[["School","Smith College, '28"],["Location","Northampton, MA"],["Focus","Statistical Learning"],["Certification","Quantum Computing"]].map(([l,v]) => (
                    <div key={l} className={`rounded-xl border p-4 shadow-sm ${dark ? "border-pink-900/60 bg-zinc-900/60" : "border-pink-100 bg-white/80"}`}>
                      <dt className="text-xs font-mono uppercase tracking-widest text-pink-400">{l}</dt>
                      <dd className={`mt-1 text-sm font-semibold ${dark ? "text-zinc-100" : "text-gray-800"}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal direction="right" delay={320}>
                <div className="mt-6">
                  <p className="text-xs font-mono uppercase tracking-widest text-pink-400 mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python","R","SQL","Java","JavaScript","TypeScript","React","Django","TensorFlow","PyTorch","OpenCV","pandas","NumPy","Git","Salesforce","SnapLogic","MATLAB","Figma"].map((s) => (
                      <Tag key={s} label={s} dark={dark} />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16">
          <Reveal><h2 className={`text-4xl md:text-5xl font-black mb-14 ${sectionH}`}>Experience</h2></Reveal>
          <div className="space-y-5">
            {EXPERIENCE.map((role, i) => <RoleCard key={role.role+role.org} role={role} index={i} dark={dark} />)}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16">
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${sectionH}`}>Education</h2>
            <p className={`text-lg mb-14 ${subtext}`}>My academic journey.</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {EDUCATION.map((edu, i) => <EducationCard key={edu.org} p={edu} index={i} dark={dark} />)}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16">
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${sectionH}`}>Projects</h2>
            <p className={`text-lg mb-14 ${subtext}`}>Things I've built and researched.</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} dark={dark} />)}
          </div>
        </section>

        {/* ── INVOLVEMENT ── */}
        <section id="involvement" className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16">
          <Reveal><h2 className={`text-4xl md:text-5xl font-black mb-14 ${sectionH}`}>Involvement & Leadership</h2></Reveal>
          <div className="space-y-5">
            {INVOLVEMENT.map((role, i) => <RoleCard key={role.org} role={role} index={i} dark={dark} />)}
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🏆", title: "Best Business Pitch", sub: "ASA DataFest 2026" },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div className={`rounded-2xl border p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${dark ? "border-pink-900/60 bg-zinc-900/80" : "border-pink-100 bg-white/85"}`}>
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <p className={`font-bold text-sm ${dark ? "text-white" : "text-gray-900"}`}>{a.title}</p>
                  <p className={`text-xs mt-1 ${dark ? "text-zinc-500" : "text-gray-400"}`}>{a.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CONNECT ── */}
        <section id="connect" className="relative z-10 mx-auto max-w-7xl px-8 py-28 md:px-16">
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${sectionH}`}>You can get in touch with me through </h2>
            <p className={`text-lg max-w-xl mb-14 ${subtext}`}>I am open to research collaborations, internships, and informational conversations.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {/* Email — opens mail client */}
            <Reveal delay={0}>
              <a href="mailto:sdumre@smith.edu"
                className={`group flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${dark ? "border-pink-900/60 bg-zinc-900/80 hover:border-pink-700/60" : "border-pink-100 bg-white/85 hover:border-pink-300"}`}>
                <span className="text-2xl">✉️</span>
                <span className={`font-semibold group-hover:text-pink-500 ${dark ? "text-zinc-200" : "text-gray-800"}`}>Email</span>
                <span className={`font-mono text-xs ${dark ? "text-zinc-500" : "text-gray-400"}`}>sdumre@smith.edu</span>
                <span className="mt-auto text-xs text-pink-500 font-mono">↗ open mail</span>
              </a>
            </Reveal>
            {/* LinkedIn */}
            <Reveal delay={80}>
              <a href="https://linkedin.com/in/swikriti-dumre" target="_blank" rel="noopener noreferrer"
                className={`group flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${dark ? "border-pink-900/60 bg-zinc-900/80 hover:border-pink-700/60" : "border-pink-100 bg-white/85 hover:border-pink-300"}`}>
                <span className="text-2xl">💼</span>
                <span className={`font-semibold group-hover:text-pink-500 ${dark ? "text-zinc-200" : "text-gray-800"}`}>LinkedIn</span>
                <span className={`font-mono text-xs ${dark ? "text-zinc-500" : "text-gray-400"}`}>Swikriti Dumre</span>
                <span className="mt-auto text-xs text-pink-500 font-mono">↗ open</span>
              </a>
            </Reveal>
            {/* GitHub */}
            <Reveal delay={160}>
              <a href="https://github.com/swikritycreates" target="_blank" rel="noopener noreferrer"
                className={`group flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${dark ? "border-pink-900/60 bg-zinc-900/80 hover:border-pink-700/60" : "border-pink-100 bg-white/85 hover:border-pink-300"}`}>
                <span className="text-2xl">🐙</span>
                <span className={`font-semibold group-hover:text-pink-500 ${dark ? "text-zinc-200" : "text-gray-800"}`}>GitHub</span>
                <span className={`font-mono text-xs ${dark ? "text-zinc-500" : "text-gray-400"}`}>swikritycreates</span>
                <span className="mt-auto text-xs text-pink-500 font-mono">↗ open</span>
              </a>
            </Reveal>
            {/* Google Calendar */}
            <Reveal delay={160}>
              <a href="https://calendar.app.google/89TDfTd99K4JdysS8" target="_blank" rel="noopener noreferrer"
                className={`group flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${dark ? "border-pink-900/60 bg-zinc-900/80 hover:border-pink-700/60" : "border-pink-100 bg-white/85 hover:border-pink-300"}`}>
                <span className="text-2xl">🗓️🧑</span>
                <span className={`font-semibold group-hover:text-pink-500 ${dark ? "text-zinc-200" : "text-gray-800"}`}>Google Calendar</span>
                <span className={`font-mono text-xs ${dark ? "text-zinc-500" : "text-gray-400"}`}>Swikriti Dumre</span>
                <span className="mt-auto text-xs text-pink-500 font-mono">↗ Book a Meeting</span>
              </a>
            </Reveal>


          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={`relative z-10 border-t px-8 py-8 text-center font-mono text-xs ${dark ? "border-zinc-800 text-zinc-600" : "border-pink-100 text-gray-400"}`}>
          <p>© 2026 Swikriti Dumre · Built with Next.js · Smith College</p>
        </footer>
      </main>
    </>
  );
}