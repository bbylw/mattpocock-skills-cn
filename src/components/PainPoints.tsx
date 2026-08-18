import { painPoints } from "../data/skills"

const accents = [
  { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", bar: "bg-amber-500" },
  { text: "text-sage-400", bg: "bg-sage-500/10", border: "border-sage-500/20", bar: "bg-sage-400" },
  { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", bar: "bg-blue-400" },
  { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", bar: "bg-amber-400" },
]

function PainPointCard({ point, idx }: { point: typeof painPoints[0]; idx: number }) {
  const accent = accents[idx]

  return (
    <article
      className="group relative"
      style={{
        // Stagger via inline animation-delay — no transform on the sticky wrapper
        animationDelay: `${idx * 100}ms`,
      }}
    >
      <div
        className="spotlight-border rounded-2xl border border-ink-800 bg-ink-900/80 backdrop-blur shadow-diffuse transition-colors hover:bg-ink-850 overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
          e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
        }}
      >
        {/* Left accent bar — grows on hover */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bar} origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500`}
          style={{ transitionTimingFunction: "var(--ease-smooth-out)" }}
        />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: number + title */}
            <div className="lg:col-span-4">
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`font-mono text-5xl sm:text-6xl font-bold ${accent.text} opacity-20 group-hover:opacity-100 transition-opacity`}>
                  {point.number}
                </span>
                <span className={`font-mono text-xs ${accent.text} uppercase tracking-widest`}>
                  failure_mode
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink-100 tracking-tight leading-tight">
                {point.title}
              </h3>
            </div>

            {/* Middle: quote + problem */}
            <div className="lg:col-span-5">
              <blockquote className={`border-l-2 ${accent.border.replace("/20", "/40")} pl-4 mb-5`}>
                <p className="text-sm text-ink-300 italic leading-relaxed mb-2">
                  "{point.quote}"
                </p>
                <cite className="text-xs text-ink-600 not-italic font-mono">
                  — {point.quoteSource}
                </cite>
              </blockquote>
              <p className="text-sm text-ink-400 leading-relaxed">
                {point.problem}
              </p>
            </div>

            {/* Right: solution + links */}
            <div className="lg:col-span-3 lg:border-l lg:border-ink-800 lg:pl-6">
              <div className={`font-mono text-xs ${accent.text} mb-2 uppercase tracking-wider`}>
                {point.solutionLabel}
              </div>
              <p className="text-sm text-ink-300 leading-relaxed mb-4">
                {point.solution}
              </p>
              <div className="flex flex-col gap-1.5">
                {point.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-ink-500 hover:text-amber-400 transition-colors"
                  >
                    <span className={accent.text}>→</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PainPoints() {
  return (
    <section
      id="pain-points"
      className="relative py-20 sm:py-28 border-t border-ink-800"
    >
      <div className="absolute inset-0 bg-grid-warm opacity-40" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 reveal-on-scroll">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            // 为何存在
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 tracking-tighter max-w-2xl">
            四个常见失败模式，
            <span className="text-amber-500">四种修复</span>
          </h2>
          <p className="mt-4 text-ink-400 leading-relaxed max-w-[55ch]">
            我构建这些技能，是为了修复我在 Claude Code、Codex 及其他编码 agent 上看到的常见失败模式。
          </p>
        </div>

        {/* Pain point cards — vertical stack with scroll reveal */}
        <div className="space-y-6">
          {painPoints.map((point, idx) => (
            <div
              key={point.number}
              className="reveal-on-scroll"
            >
              <PainPointCard point={point} idx={idx} />
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-16 pt-12 border-t border-ink-800 reveal-on-scroll">
          <p className="text-lg text-ink-300 max-w-[55ch] leading-relaxed font-medium">
            软件工程的基本原则比以往任何时候都更重要。
            这些技能是我尽最大努力把这些原则浓缩成可重复实践的结果。
          </p>
        </div>
      </div>
    </section>
  )
}
