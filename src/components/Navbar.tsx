import { useEffect, useState } from "react"

const navItems = [
  { label: "理念", href: "#philosophy", cmd: "philosophy" },
  { label: "安装", href: "#install", cmd: "install" },
  { label: "痛点", href: "#pain-points", cmd: "pain-points" },
  { label: "技能", href: "#skills", cmd: "skills" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-ink-800/60"
          : "bg-gradient-to-b from-ink-950/80 to-transparent border-b border-transparent"
      }`}
      style={{ transitionTimingFunction: "var(--ease-smooth-out)" }}
    >
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo — monospace style */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 text-ink-950 font-bold font-mono text-base transition-transform group-hover:scale-105">
            S
          </span>
          <span className="font-mono text-sm text-ink-200">
            <span className="text-amber-500">~</span>/skills
          </span>
        </a>

        {/* Dock magnification — items scale on hover */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-ink-900/40 border border-ink-800/50">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setActiveItem(i)}
              onMouseLeave={() => setActiveItem(null)}
              className="relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300"
              style={{
                transform: activeItem === i ? "scale(1.12)" : "scale(1)",
                color: activeItem === i ? "var(--color-amber-500)" : "var(--color-ink-500)",
                transitionTimingFunction: "var(--ease-smooth-out)",
              }}
            >
              {item.label}
              {/* Active underline */}
              <span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-amber-500 transition-all duration-300"
                style={{
                  width: activeItem === i ? "60%" : "0%",
                  transitionTimingFunction: "var(--ease-smooth-out)",
                }}
              />
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/mattpocock/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-ink-500 hover:text-amber-400 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.66 1.05-.82 1.65S8.93 17.41 9 18v4" />
            </svg>
            <span className="hidden sm:inline">github</span>
          </a>
          <a
            href="#install"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold text-ink-950 bg-amber-500 hover:bg-amber-400 transition-colors"
          >
            install →
          </a>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1.5 rounded-lg text-ink-400 hover:bg-ink-800/50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="菜单"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-ink-800/60">
          <div className="px-6 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-mono text-ink-400 hover:text-amber-400 transition-colors"
              >
                <span className="text-ink-700">→</span>
                {item.label}
                <span className="text-ink-700 ml-auto text-xs">#{item.cmd}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
