import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Copy,
  Check,
  Terminal as TerminalIcon,
  Mail,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Magnetic from './Magnetic';
import Card3D from './Card3D';
import TextScramble from './TextScramble';

export default function TerminalContact({ terminalRefFromParent, onTriggerWarp }) {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$10k - $25k',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'SYNAPSE VIRTUAL TERMINAL v2.4.0 (x86_64-node-webgl)' },
    { type: 'system', text: 'Type "help" or tap the command chips below.' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef(null);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(portfolioData.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', budget: '$10k - $25k', message: '' });
    }, 4500);
  };

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'AVAILABLE SYSTEM COMMANDS:\n  help        - Show available commands\n  about       - Brief architectural summary\n  skills      - List core engineering specializations\n  projects    - Summary of flagship deployments\n  3d          - Inspect global WebGL spatial engine\n  matrix      - Trigger synthetic cyber matrix overdrive\n  contact     - Display direct communications info\n  hire        - Initiate high-priority contract intake\n  warp        - Engage warp particle speed\n  clear       - Wipe terminal screen',
        });
        break;
      case '3d':
      case 'spatial':
        newHistory.push({
          type: 'output',
          text: 'GLOBAL SPATIAL 3D ENGINE:\n  - Renderer: WebGL2 Hardware Accelerated (Three.js)\n  - Active Shaders: Glossy Clearcoat Core + Wireframe Cage\n  - Particle Volume: 1,000+ Deep Space Nodes\n  - Coordinates: Synchronized to current scroll section\n  - Status: 120 FPS render target locked',
        });
        break;
      case 'matrix':
        setIsMatrixActive(true);
        sound.playWarp();
        newHistory.push({
          type: 'output',
          text: '01001011 01010110 00101111 00101111 00110000 00110001\n>> SIMULATION OVERDRIVE ENGAGED.\n>> RENDER LOOP AT 120HZ.\n>> NEURAL CONSTELLATION OVERLAY ONLINE.',
        });
        setTimeout(() => setIsMatrixActive(false), 5000);
        break;
      case 'warp':
        sound.playWarp();
        if (onTriggerWarp) onTriggerWarp();
        newHistory.push({
          type: 'output',
          text: '>> WARP DRIVE ENGAGED. DILATING Z-AXIS BUFFER.',
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: `${portfolioData.name} — ${portfolioData.role}\n${portfolioData.tagline}\nLocation: ${portfolioData.location}`,
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'CORE STACK:\n  - Frontend: React 19, TypeScript, Next.js 15, Tailwind\n  - Creative: Three.js, GLSL, WebGL, Framer Motion, GSAP\n  - Systems: Node.js, Bun, Go, PostgreSQL, Redis, Edge Networks',
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'FLAGSHIP WORKS:\n  [1] SYNAPSE OS (120fps WebGL Spatial Canvas)\n  [2] NEO-FINANCE (Sub-millisecond Trading Terminal)\n  [3] HYPERION KINETIC (Audiovisual 3D E-Commerce)\n  [4] AETHER CLOUD (Distributed Edge Runtime)',
        });
        break;
      case 'contact':
      case 'email':
        newHistory.push({
          type: 'output',
          text: `Direct Email: ${portfolioData.socials.email}\nDiscord: ${portfolioData.socials.discord}\nStatus: ${portfolioData.availability.status}`,
        });
        break;
      case 'hire':
        newHistory.push({
          type: 'output',
          text: 'CONTRACT INTAKE:\nPlease use the form to your left or send an encrypted transmission to kaelen.vance.dev@gmail.com.',
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'visitor@quantum-client [Permissions: READ_SHOWCASE, WRITE_INQUIRY]',
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of commands.`,
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  return (
    <section id="contact" className="py-16 sm:py-28 md:py-32 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-lime tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime" />
              <span>04 // INITIATE TRANSMISSION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              LET'S BUILD <br />
              <span className="gradient-headline">
                <TextScramble text="THE FUTURE" />
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-sm mt-3 md:mt-0 leading-relaxed">
            Available for select senior engineering leadership, high-impact WebGL implementations, and technical advisory.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Form / Right Interactive CLI Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left: Sleek Contact Form & Direct Actions */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <Card3D
              maxRotation={4}
              className="p-5 sm:p-8 rounded-3xl bg-surface-card/80 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-glow-card"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-lime/5 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-5 sm:mb-6 pb-4 border-b border-white/5">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">Direct Inquiry</h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">Average response window: &lt; 12 hours</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/30 font-mono text-[10px] sm:text-[11px] text-neon-lime">
                  ENCRYPTED
                </span>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-neon-lime/20 border border-neon-lime flex items-center justify-center mx-auto text-neon-lime shadow-neon-lime">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-white">TRANSMISSION RECEIVED</h4>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-sm mx-auto">
                    Your brief has been registered into the queue. Expect an encrypted response shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova // NextWave Labs"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-oled/80 border border-white/10 text-white font-sans text-base sm:text-sm focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                      Direct Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elena@nextwave.io"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-oled/80 border border-white/10 text-white font-sans text-base sm:text-sm focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                      Estimated Scope Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-oled/80 border border-white/10 text-white font-mono text-base sm:text-sm focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-colors"
                    >
                      <option value="$10k - $25k">$10k – $25k (Sprint / Feature)</option>
                      <option value="$25k - $50k">$25k – $50k (Full Product / WebGL)</option>
                      <option value="$50k+">$50k+ (Enterprise Architecture / Long-term)</option>
                      <option value="Advisory">Advisory & Code Audit Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                      Project Objectives & Timeline
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your technical challenges, architecture requirements, or creative goals..."
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-oled/80 border border-white/10 text-white font-sans text-base sm:text-sm focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-colors resize-none"
                    />
                  </div>

                  <Magnetic strength={0.2} className="w-full">
                    <button
                      type="submit"
                      className="w-full py-3.5 sm:py-4 rounded-xl bg-neon-lime text-black font-mono font-bold text-xs sm:text-sm tracking-wider hover:shadow-neon-lime transition-all flex items-center justify-center gap-2"
                    >
                      <span>TRANSMIT INQUIRY</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </form>
              )}
            </Card3D>

            {/* Direct Email Clipboard Tile */}
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-card/80 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-200/80 border border-white/10 flex items-center justify-center text-neon-lime">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase">DIRECT INBOX</div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-white break-all">
                    {portfolioData.socials.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-surface-200 border border-white/10 hover:border-neon-lime font-mono text-xs text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neon-lime" />
                    <span className="text-neon-lime">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Interactive Terminal Simulator & Social Ecosystem */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Interactive Terminal Window with 3D Tilt */}
            <Card3D
              maxRotation={4}
              className={`rounded-3xl bg-zinc-950/90 backdrop-blur-xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all ${
                isMatrixActive ? 'border-neon-lime shadow-[0_0_30px_rgba(204,255,0,0.3)]' : ''
              }`}
            >
              {/* Terminal Window Chrome */}
              <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-surface-card/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-zinc-400">
                  <TerminalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime" />
                  <span>bash — 80x24 (spatial link)</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-600">UTF-8</span>
              </div>

              {/* Terminal Screen Body */}
              <div
                ref={terminalBottomRef}
                className="p-4 sm:p-5 h-[280px] sm:h-[340px] overflow-y-auto font-mono text-xs space-y-2 text-zinc-300 select-text"
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'user' ? (
                      <span className="text-neon-lime font-bold">{item.text}</span>
                    ) : item.type === 'error' ? (
                      <span className="text-rose-400">{item.text}</span>
                    ) : item.type === 'system' ? (
                      <span className="text-zinc-500">{item.text}</span>
                    ) : (
                      <span className="text-zinc-300 whitespace-pre-line">{item.text}</span>
                    )}
                  </div>
                ))}

                {/* Live Command Line Input */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
                  <span className="text-neon-lime font-bold select-none">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => {
                      sound.playTerminalKey();
                      setTerminalInput(e.target.value);
                    }}
                    placeholder='type "help", "skills", or "matrix"...'
                    className="flex-1 bg-transparent text-white font-mono text-base sm:text-xs focus:outline-none placeholder-zinc-600"
                  />
                </form>
              </div>

              {/* Terminal Quick Tap Hint Chips (Thumb-Friendly on Phone) */}
              <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-surface-card/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto font-mono text-[10px] sm:text-[11px] text-zinc-500 scrollbar-none overscroll-x-contain">
                <span className="shrink-0">RUN:</span>
                {['help', 'skills', '3d', 'matrix', 'warp', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2.5 py-1 rounded bg-surface-200/90 border border-white/5 hover:border-neon-lime text-zinc-400 hover:text-neon-lime transition-all shrink-0 active:scale-95 text-[10px] sm:text-[11px]"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </Card3D>

            {/* Social Channels & Availability Matrix (Mobile 2x2 grid) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-card/80 backdrop-blur-xl border border-white/10 space-y-3.5 sm:space-y-4">
              <span className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest block">
                // EXTERNAL CHANNELS & VERIFIED PROFILES
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {[
                  { name: 'GitHub', icon: GithubIcon, url: portfolioData.socials.github, handle: '@kaelenvance' },
                  { name: 'X / Twitter', icon: TwitterIcon, url: portfolioData.socials.twitter, handle: '@kaelen_vance' },
                  { name: 'LinkedIn', icon: LinkedinIcon, url: portfolioData.socials.linkedin, handle: '/in/kaelenvance' },
                  { name: 'Discord', icon: DiscordIcon, url: '#', handle: 'kaelenvance' },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <Magnetic key={social.name} strength={0.25}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-3 sm:p-4 rounded-xl bg-surface-200/80 border border-white/5 hover:border-neon-lime flex flex-col justify-between transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2 sm:mb-3 text-zinc-400 group-hover:text-neon-lime transition-colors">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <div className="font-mono text-[11px] sm:text-xs font-bold text-white group-hover:text-neon-lime transition-colors">
                            {social.name}
                          </div>
                          <div className="font-mono text-[9px] sm:text-[10px] text-zinc-500 truncate">{social.handle}</div>
                        </div>
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
