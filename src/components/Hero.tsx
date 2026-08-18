import { useEffect, useRef, useState } from "react"

// Text Scramble effect — pure JS, no library (from motion recipes)
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/"

function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(0)
  const iterRef = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplay(text)
      return
    }
    iterRef.current = 0
    const max = text.length * 3
    const tick = () => {
      iterRef.current += 1
      const progress = iterRef.current / 3
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            i < progress
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      )
      if (iterRef.current < max) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [text, trigger])

  return display
}

// Magnetic button — cursor attracted, uses rAF not useState for continuous motion
function MagneticLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0, 0)"
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${className ?? ""} transition-transform`}
      style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </a>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const scrambled = useScramble("SKILLS", mounted)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden flex flex-col"
    >
      {/* Background: mesh + grid + grain */}
      <div className="absolute inset-0 bg-mesh-amber" />
      <div className="absolute inset-0 bg-grid-warm opacity-60" />
      {/* Warm glow blob — asymmetric, not centered */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "var(--color-amber-500)" }}
      />
      <div
        className="absolute bottom-0 left-10 w-[400px] h-[300px] rounded-full opacity-[0.04] blur-[80px]"
        style={{ background: "var(--color-blue-500)" }}
      />

      {/* Content — asymmetric, left-aligned, not centered */}
      <div className="relative z-10 flex-1 flex items-center pt-24 pb-12">
        <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-10">
          <div className="max-w-3xl">
            {/* Badge — terminal-style, not pill */}
            <div
              className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-8 stagger"
              style={{ "--stagger-index": 0 } as React.CSSProperties}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-dot" />
              <span className="tracking-widest uppercase">agent_skills v2.0</span>
              <span className="text-ink-600">— 适用于任何模型</span>
            </div>

            {/* Headline — large, tight tracking, no gradient text */}
            <h1
              className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] text-ink-100 text-balance mb-6 stagger"
              style={{ "--stagger-index": 1 } as React.CSSProperties}
            >
              写给真正<br />
              <span className="text-amber-500">
                {scrambled}
              </span>
              <br />
              工程师的技能集
            </h1>

            {/* Subtitle — max-w-65ch, leading-relaxed */}
            <p
              className="text-lg text-ink-400 leading-relaxed max-w-[65ch] mb-10 stagger"
              style={{ "--stagger-index": 2 } as React.CSSProperties}
            >
              每天用来做正经工程（而不是「氛围编程」）的 agent 技能集。
              小巧、易改造、可组合。建立在数十年的工程经验之上。
              随便折腾，把它们变成你自己的。
            </p>

            {/* CTA — asymmetric, left-aligned */}
            <div
              className="flex flex-col sm:flex-row items-start gap-4 stagger"
              style={{ "--stagger-index": 3 } as React.CSSProperties}
            >
              <MagneticLink
                href="#install"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold text-ink-950 bg-amber-500 hover:bg-amber-400 shadow-diffuse"
              >
                <span>30 秒安装</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticLink>

              <a
                href="https://github.com/mattpocock/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-medium text-ink-300 glass hover:text-ink-100"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.66 1.05-.82 1.65S8.93 17.41 9 18v4" />
                </svg>
                查看仓库
              </a>
            </div>

            {/* Stats — inline, not cards */}
            <div
              className="mt-16 flex items-center gap-8 font-mono stagger"
              style={{ "--stagger-index": 4 } as React.CSSProperties}
            >
              {[
                { value: "25+", label: "技能" },
                { value: "60K+", label: "订阅者" },
                { value: "2", label: "类别" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-ink-100">
                    {stat.value}
                  </span>
                  <span className="text-xs text-ink-600 uppercase tracking-widest">
                    {stat.label}
                  </span>
                  {i < 2 && <span className="text-ink-700 ml-4">/</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — terminal style */}
      <div className="relative z-10 border-t border-ink-800/60 glass">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-3 flex items-center justify-between font-mono text-xs text-ink-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">~</span>
            <span>cwd: /agent-skills</span>
            <span className="text-ink-700">|</span>
            <span>status: ready</span>
          </div>
          <a
            href="https://www.aihero.dev/s/skills-newsletter"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-ink-500 hover:text-amber-400 transition-colors"
          >
            <span>订阅 60,000+ 开发者</span>
            <span className="text-amber-500">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
