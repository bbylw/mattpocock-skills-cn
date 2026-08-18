import { useState, useMemo, useRef } from "react"
import { skills, type Skill } from "../data/skills"

type CategoryFilter = "all" | "engineering" | "productivity"
type InvocationFilter = "all" | "user" | "model"

const categoryShort: Record<Skill["category"], string> = {
  engineering: "ENG",
  productivity: "PROD",
}

const invocationStyles: Record<Skill["invocation"], string> = {
  user: "text-amber-500 border-amber-500/20",
  model: "text-sage-400 border-sage-500/20",
}

const categoryStyles: Record<Skill["category"], string> = {
  engineering: "text-sage-400",
  productivity: "text-blue-400",
}

// Spotlight border card with directional hover
function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }

  return (
    <a
      ref={ref}
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="spotlight-border group block break-inside-avoid mb-3 rounded-2xl border border-ink-800 bg-ink-900/60 p-5 transition-all hover:bg-ink-850 hover:border-ink-700"
    >
      {/* Top row: command + link icon */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <code className="font-mono text-sm font-semibold text-ink-100 group-hover:text-amber-400 transition-colors">
          /{skill.name}
        </code>
        <svg className={`w-3.5 h-3.5 transition-all ${hovered ? "text-amber-400 translate-x-0.5 -translate-y-0.5" : "text-ink-700"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </div>

      {/* Description */}
      <p className="text-xs text-ink-400 leading-relaxed mb-4">
        {skill.description}
      </p>

      {/* Tags — outside/below, per bento paradigm */}
      <div className="flex items-center gap-2 font-mono text-[10px]">
        <span className={`${categoryStyles[skill.category]} uppercase tracking-wider`}>
          {categoryShort[skill.category]}
        </span>
        <span className="text-ink-700">·</span>
        <span className={`px-1.5 py-0.5 rounded border ${invocationStyles[skill.invocation]}`}>
          {skill.invocation === "user" ? "USER" : "MODEL"}
        </span>
      </div>
    </a>
  )
}

// Filter button — active state with spotlight
function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
        active
          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
          : "text-ink-500 hover:text-ink-300"
      }`}
    >
      {label}
    </button>
  )
}

export function Skills() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [invocationFilter, setInvocationFilter] = useState<InvocationFilter>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      if (categoryFilter !== "all" && skill.category !== categoryFilter) return false
      if (invocationFilter !== "all" && skill.invocation !== invocationFilter) return false
      if (search && !skill.name.toLowerCase().includes(search.toLowerCase()) && !skill.description.includes(search)) return false
      return true
    })
  }, [categoryFilter, invocationFilter, search])

  const engineeringSkills = filtered.filter((s) => s.category === "engineering")
  const productivitySkills = filtered.filter((s) => s.category === "productivity")

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 border-t border-ink-800"
    >
      <div className="absolute inset-0 bg-mesh-amber opacity-30" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header — left-aligned */}
        <div className="mb-10 reveal-on-scroll">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            // 技能参考
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 tracking-tighter">
            全部技能
          </h2>
          <p className="mt-4 text-ink-400 leading-relaxed max-w-[60ch]">
            技能按一个维度划分——谁能调用它们。
            <span className="text-amber-500 font-mono text-sm"> 用户调用</span> 的技能只有当你输入时才可达，负责编排。
            <span className="text-sage-400 font-mono text-sm"> 模型调用</span> 的技能也可以被 agent 自动取用，承载可复用的纪律。
          </p>
        </div>

        {/* Filters — terminal-style bar, not centered */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-xl border border-ink-800 bg-ink-900/50 reveal-on-scroll">
          {/* Search input */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <span className="font-mono text-sm text-sage-400">/</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search skills..."
              className="flex-1 bg-transparent text-sm font-mono text-ink-200 placeholder-ink-600 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="font-mono text-xs text-ink-600 hover:text-amber-400"
              >
                ✕
              </button>
            )}
          </div>

          {/* Divider */}
          <span className="hidden sm:block w-px h-6 bg-ink-800" />

          {/* Category */}
          <div className="flex items-center gap-1">
            <FilterButton label="全部" active={categoryFilter === "all"} onClick={() => setCategoryFilter("all")} />
            <FilterButton label="工程" active={categoryFilter === "engineering"} onClick={() => setCategoryFilter("engineering")} />
            <FilterButton label="效率" active={categoryFilter === "productivity"} onClick={() => setCategoryFilter("productivity")} />
          </div>

          {/* Divider */}
          <span className="hidden sm:block w-px h-6 bg-ink-800" />

          {/* Invocation */}
          <div className="flex items-center gap-1">
            <FilterButton label="全部" active={invocationFilter === "all"} onClick={() => setInvocationFilter("all")} />
            <FilterButton label="用户调用" active={invocationFilter === "user"} onClick={() => setInvocationFilter("user")} />
            <FilterButton label="模型调用" active={invocationFilter === "model"} onClick={() => setInvocationFilter("model")} />
          </div>

          {/* Count */}
          <span className="font-mono text-xs text-ink-600 ml-auto">
            [{String(filtered.length).padStart(2, "0")} matches]
          </span>
        </div>

        {/* Skills — CSS columns masonry (not equal grid) */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-ink-600">// no matches found</p>
            <p className="text-xs text-ink-700 mt-2">try a different filter or search term</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Engineering section */}
            {engineeringSkills.length > 0 && (categoryFilter === "all" || categoryFilter === "engineering") && (
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-sage-400 uppercase tracking-widest">
                    Engineering
                  </span>
                  <span className="text-ink-700">—</span>
                  <span className="text-xs text-ink-600">我每天用于代码工作的技能</span>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
                  {engineeringSkills.map((skill) => (
                    <SkillCard key={skill.slug} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {/* Productivity section */}
            {productivitySkills.length > 0 && (categoryFilter === "all" || categoryFilter === "productivity") && (
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                    Productivity
                  </span>
                  <span className="text-ink-700">—</span>
                  <span className="text-xs text-ink-600">通用的流程工具，与代码无关</span>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
                  {productivitySkills.map((skill) => (
                    <SkillCard key={skill.slug} skill={skill} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Architecture note — border-t pattern, not a card */}
        <div className="mt-16 pt-8 border-t border-ink-800 reveal-on-scroll">
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-amber-500 mt-0.5">[rule]</span>
            <div>
              <h4 className="text-sm font-semibold text-ink-100 mb-1">技能架构规则</h4>
              <p className="text-xs text-ink-400 leading-relaxed max-w-[70ch]">
                一个<span className="text-amber-500 font-mono">用户调用</span>的技能可以调用
                <span className="text-sage-400 font-mono">模型调用</span>的技能，
                但绝不能调用另一个用户调用的技能。这保证了编排层不会被嵌套——总是由你来发起编排。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
