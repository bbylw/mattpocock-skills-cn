const features = [
  {
    title: "小巧",
    description: "每个技能只做一件事，不接管你的整个流程，不给你额外的认知负担。",
    span: "lg:col-span-2 lg:row-span-2",
    size: "large",
  },
  {
    title: "易改造",
    description: "技能以纯文本文件形式存在，你可以像修改代码一样随意调整它们。",
    span: "lg:col-span-2",
    size: "wide",
  },
  {
    title: "可组合",
    description: "一个用户调用的技能可以编排多个模型调用的技能，构建完整工作流。",
    span: "lg:col-span-2",
    size: "wide",
  },
  {
    title: "适用于任何模型",
    description: "不绑定特定厂商——Claude、Codex 或其他编码 agent 都能使用。",
    span: "lg:col-span-2",
    size: "wide",
  },
]

const counterpoints = [
  { tool: "GSD", reason: "接管整个流程" },
  { tool: "BMAD", reason: "难以排查 bug" },
  { tool: "Spec-Kit", reason: "夺走控制权" },
]

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section header — left-aligned, not centered */}
        <div className="mb-12 reveal-on-scroll">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            // 设计理念
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 tracking-tighter text-balance max-w-3xl">
            不是接管流程，而是
            <span className="text-amber-500">归还控制权</span>
          </h2>
        </div>

        {/* Counterpoint strip — border-t, divide-y pattern, not cards */}
        <div className="mb-12 border-t border-ink-800 reveal-on-scroll">
          <div className="divide-y divide-ink-800/60">
            {counterpoints.map((cp) => (
              <div
                key={cp.tool}
                className="flex items-center justify-between py-3 group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-ink-600 line-through">
                    {cp.tool}
                  </span>
                  <span className="text-sm text-ink-500">{cp.reason}</span>
                </div>
                <span className="font-mono text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  × rejected
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento grid — asymmetric cell sizes */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 auto-rows-[minmax(120px,auto)]">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`spotlight-border group relative rounded-2xl border border-ink-800 bg-ink-900 p-6 sm:p-8 transition-all hover:bg-ink-850 ${feature.span} reveal-on-scroll`}
              style={
                {
                  "--spot-x": "50%",
                  "--spot-y": "50%",
                  "--stagger-index": idx,
                } as React.CSSProperties
              }
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
              }}
            >
              {/* Number — outside/below, not inside card */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-xs text-ink-700">
                  0{idx + 1}
                </span>
                <h3 className={`font-bold text-ink-100 tracking-tight ${feature.size === "large" ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                  {feature.title}
                </h3>
              </div>
              <p className={`text-ink-400 leading-relaxed max-w-[45ch] ${feature.size === "large" ? "text-base" : "text-sm"}`}>
                {feature.description}
              </p>

              {/* Large card gets a decorative terminal prompt */}
              {feature.size === "large" && (
                <div className="mt-6 font-mono text-xs text-ink-600 space-y-1">
                  <div><span className="text-sage-400">$</span> cat skill.md</div>
                  <div className="text-ink-500">→ single responsibility</div>
                  <div className="text-ink-500">→ composable</div>
                  <div className="text-ink-500">→ editable</div>
                  <div><span className="text-amber-500">●</span> ready</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
