const marqueeItems = [
  "小巧",
  "易改造",
  "可组合",
  "任何模型",
  "grill-me",
  "tdd",
  "code-review",
  "domain-modeling",
  "wayfinder",
  "triage",
  "prototype",
  "research",
]

export function Footer() {
  return (
    <footer className="relative border-t border-ink-800 bg-ink-950">
      {/* Kinetic marquee — brand values scrolling */}
      <div className="overflow-hidden py-12 border-b border-ink-800/60">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-3xl sm:text-5xl font-bold tracking-tighter text-ink-800"
            >
              {item}
              <span className="text-amber-500/30 ml-6">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA section — asymmetric, left-aligned */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: headline */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
              // 最终行动
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 tracking-tighter text-balance max-w-xl">
              交付你职业生涯中
              <span className="text-amber-500">最好的应用</span>
            </h2>
            <p className="mt-4 text-ink-400 leading-relaxed max-w-[55ch]">
              玩得开心。把这些技能变成你自己的。随便折腾。
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href="#install"
              className="group inline-flex items-center justify-between gap-3 px-6 py-4 rounded-xl text-sm font-semibold text-ink-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-diffuse"
            >
              <span>30 秒安装</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://www.aihero.dev/s/skills-newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-6 py-4 rounded-xl text-sm font-mono text-ink-300 glass hover:text-ink-100 transition-colors"
            >
              <span>加入 60,000+ 订阅者</span>
              <span className="text-amber-500">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar — terminal style */}
      <div className="border-t border-ink-800/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-ink-600">
          <div className="flex items-center gap-3">
            <span className="text-amber-500">~</span>
            <span>skills · 写给真正工程师的技能集</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/mattpocock/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              github
            </a>
            <a
              href="https://www.aihero.dev/s/skills-newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              newsletter
            </a>
            <a
              href="https://skills.sh/mattpocock/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              skills.sh
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
