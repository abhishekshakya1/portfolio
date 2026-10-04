import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../common/ThemeContext";
import emailjs from "@emailjs/browser";
import { 
  FiMail, FiGithub, FiLinkedin, FiTwitter, 
  FiCheckCircle, FiLoader, FiAlertCircle, FiCopy, FiCheck, FiArrowUpRight
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Container from "../common/Container";
import { personalInfo } from "../../data/personalInfo";

const Contact = () => {
  const { playSound } = useTheme();
  
  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const socialLinks = [
    { 
      icon: FiGithub, 
      label: personalInfo.socials.github.label, 
      href: personalInfo.socials.github.url, 
      username: personalInfo.socials.github.handle, 
      color: "hover:border-white hover:text-white" 
    },
    { 
      icon: FiLinkedin, 
      label: personalInfo.socials.linkedin.label, 
      href: personalInfo.socials.linkedin.url, 
      username: personalInfo.socials.linkedin.handle, 
      color: "hover:border-sky-500 hover:text-sky-400" 
    },
    { 
      icon: SiLeetcode, 
      label: personalInfo.socials.leetcode.label, 
      href: personalInfo.socials.leetcode.url, 
      username: personalInfo.socials.leetcode.handle, 
      color: "hover:border-amber-500 hover:text-amber-400" 
    },
    { 
      icon: FiTwitter, 
      label: personalInfo.socials.twitter.label, 
      href: personalInfo.socials.twitter.url, 
      username: personalInfo.socials.twitter.handle, 
      color: "hover:border-teal-500 hover:text-teal-400" 
    },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.socials.email.address);
    setCopiedEmail(true);
    playSound("success");
    showToastMsg("Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const showToastMsg = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    if (type === "success") {
      playSound("success");
    } else {
      playSound("click");
    }
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 4000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      playSound("click");
      return;
    }

    setStatus("sending");
    playSound("click");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ""; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        const templateParams = {
          name: formData.name,
          from_name: formData.name,
          user_name: formData.name,
          sender_name: formData.name,

          email: formData.email,
          from_email: formData.email,
          user_email: formData.email,
          reply_to: formData.email,

          subject: formData.subject,
          message: formData.message,

          message_with_sender: `From: ${formData.name} <${formData.email}>\nSubject: ${formData.subject}\n\n${formData.message}`,
        };

        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
        setStatus("success");
        showToastMsg("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Automatically reset button back to idle after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } catch (err) {
        console.error("EmailJS Error: ", err);
        setStatus("error");
        showToastMsg("Sending failed. Please try again.", "error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } else {
      // Graceful simulator if credentials aren't plugged in yet
      setTimeout(() => {
        setStatus("success");
        showToastMsg("Message sent successfully! (Simulated)");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      }, 1500);
    }
  };

  return (
    <section className="py-24 relative border-t border-zinc-900/60" id="contact">
      {/* Background radial spotlights */}
      <div className="absolute bottom-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent opacity-[0.03] blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Core Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Contact & Connect
          </p>
          <h2 className="clash text-4xl md:text-6xl font-semibold text-white leading-none">
            Let's build something <span className="text-accent transition-colors duration-1000">together</span>.
          </h2>
        </motion.div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-start">
          
          {/* LEFT SIDE: Info cards & social grid */}
          <div className="space-y-6">
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
              Got a specific software engineering role, full-stack project, or simply want to connect? My inbox and DMs are always open.
            </p>

            {/* Pulsing beacon availability card */}
            <div className="inline-flex items-center gap-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm px-4 sm:px-5 py-3 max-w-full flex-wrap">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-zinc-300 leading-snug">
                Active Status: <span className="text-emerald-400 font-semibold">{personalInfo.status}</span>
              </span>
            </div>

            {/* Symmetrical 2x2 Platform Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => playSound("hover")}
                    onClick={() => playSound("click")}
                    className={`group relative flex items-center justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-3.5 sm:p-4 transition-all duration-300 ${s.color} hover:bg-black/60 hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-900 bg-black/60 group-hover:border-current/40 transition-colors">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white tracking-wider">{s.label}</h4>
                        <p className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate">{s.username}</p>
                      </div>
                    </div>
                    <FiArrowUpRight className="text-zinc-600 group-hover:text-current shrink-0 transition-colors" size={15} />
                  </a>
                );
              })}
            </div>

            {/* Dedicated Featured Direct Email Card (Full width with aligned copy button) */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-3.5 sm:p-4 hover:border-accent/40 hover:bg-black/60 transition-all duration-300 flex items-center justify-between gap-3">
              <a
                href={personalInfo.socials.email.url}
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
                className="flex items-center gap-3 min-w-0 flex-1 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-900 bg-black/60 group-hover:border-accent/40 group-hover:text-accent transition-colors text-zinc-300">
                  <FiMail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white tracking-wider group-hover:text-accent transition-colors">Direct Email</h4>
                    <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">(Click to write)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-full">
                    {personalInfo.socials.email.address}
                  </p>
                </div>
              </a>

              {/* Copy Button with flawless alignment & feedback */}
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                className={`shrink-0 flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl border transition-all cursor-pointer active:scale-95 text-xs font-mono ${
                  copiedEmail
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-accent/40 hover:bg-zinc-800"
                }`}
              >
                {copiedEmail ? (
                  <>
                    <FiCheck className="text-emerald-400 shrink-0" size={13} />
                    <span className="text-[11px] font-semibold text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={13} className="shrink-0" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive input form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-[32px] border border-zinc-900 bg-zinc-950/60 p-5 sm:p-7 md:p-10 backdrop-blur-sm hover:border-zinc-800 transition-colors"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`rounded-xl border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] ${
                      errors.name ? "border-rose-500/50" : "border-zinc-900"
                    }`}
                  />
                  {errors.name && <span className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"><FiAlertCircle /> {errors.name}</span>}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`rounded-xl border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] ${
                      errors.email ? "border-rose-500/50" : "border-zinc-900"
                    }`}
                  />
                  {errors.email && <span className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"><FiAlertCircle /> {errors.email}</span>}
                </div>
              </div>

              {/* Subject Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this regarding?"
                  className={`rounded-xl border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] ${
                    errors.subject ? "border-rose-500/50" : "border-zinc-900"
                  }`}
                />
                {errors.subject && <span className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"><FiAlertCircle /> {errors.subject}</span>}
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  className={`rounded-xl border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all resize-none focus:border-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] ${
                    errors.message ? "border-rose-500/50" : "border-zinc-900"
                  }`}
                />
                {errors.message && <span className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"><FiAlertCircle /> {errors.message}</span>}
              </div>

              {/* Submit Button with smooth reset */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                onMouseEnter={() => playSound("hover")}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold cursor-pointer transition-all duration-300 active:scale-[0.99] ${
                  status === "success"
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : status === "error"
                    ? "bg-rose-500 text-white"
                    : "bg-accent text-black hover:bg-accent-hover hover:-translate-y-0.5"
                } disabled:opacity-90`}
              >
                {status === "sending" ? (
                  <>
                    <FiLoader className="animate-spin" size={16} />
                    Sending Message...
                  </>
                ) : status === "success" ? (
                  <>
                    <FiCheckCircle size={16} />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <FiAlertCircle size={16} />
                    Failed — Try Again
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Clean direct email helper */}
              <div className="pt-1 text-center">
                <a
                  href={personalInfo.socials.email.url}
                  onClick={() => playSound("click")}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-accent transition-colors"
                >
                  <FiMail size={13} className="shrink-0" />
                  <span>Prefer your mail client? Open direct email ↗</span>
                </a>
              </div>
            </form>
          </motion.div>

        </div>

        {/* Professional Minimal Clean Footer */}
        <footer className="mt-28 border-t border-zinc-900/80 pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider clash text-sm">{"<AK/>"}</span>
            <span className="h-3.5 w-px bg-zinc-800" />
            <span className="text-zinc-400 font-medium">{personalInfo.name}</span>
            <span className="h-3.5 w-px bg-zinc-800 hidden sm:inline" />
            <span className="text-zinc-500 hidden sm:inline">Full Stack Engineer</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500 text-[11px] sm:text-xs">
            <span>{personalInfo.location}</span>
            <span className="h-3 w-px bg-zinc-800" />
            <span>© 2026 • All rights reserved</span>
          </div>
        </footer>

      </Container>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-3 rounded-2xl border w-[calc(100%-2rem)] max-w-sm px-6 py-3.5 shadow-2xl backdrop-blur-md ${
              toast.type === "success" 
                ? "border-emerald-500/30 bg-black/90 text-emerald-400 shadow-emerald-500/5" 
                : "border-rose-500/30 bg-black/90 text-rose-400 shadow-rose-500/5"
            }`}
          >
            {toast.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
            <span className="text-xs font-semibold uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;