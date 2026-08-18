import { useState } from "react"

interface Tab {
  id: string
  label: string
  sublabel: string
  command: string
  note: string
}

const tabs: Tab[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    sublabel: "受管理的只读插件",
    command: "claude plugins install mattpocock-skills",
    note: "位于 Claude Code 官方市场，无需先添加任何东西，更新自动送达。你是在订阅，而不是复刻。",
  },
  {
    id: "codex",
    label: "Codex 及其他 agent",
    sublabel: "可选择安装的技能",
    command: "npx skills@latest add mattpocock/skills",
    note: "选择你想要的技能和编码 agent。务必把 setup-matt-pocock-skills 包含在内。",
  },
  {
    id: "tinkerer",
    label: "给折腾党",
    sublabel: "可编辑 · 据为己有",
    command: "npx skills@latest add mattpocock/skills",
    note: "技能作为你拥有且可编辑的普通文件写入仓库。想取用最新改动时，运行 npx skills update。",
  },
]

const steps = [
  {
    num: "01",
    title: "获取技能",
    description: "选择上方任一方式安装技能集",
  },
  {
    num: "02",
    title: "运行 /setup-matt-pocock-skills",
    description: "每个仓库运行一次，配置追踪器、标签和文档位置",
  },
  {
    num: "03",
    title: "搞定——准备开干",
    description: "在 agent 中直接调用各种技能",
  },
]

export function Install() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setCopiedKey(key)
    setTimeout(() => {
      setCopied(false)
      setCopiedKey(null)
    }, 2000)
  }

  return (
    <section
      id="install"
      className="relative py-20 sm:py-28 border-t border-ink-800 overflow-visible"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-mesh-amber opacity-50" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header — left-aligned */}
        <div className="mb-12 reveal-on-scroll">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            // 安装 · 30 秒搞定
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 tracking-tighter">
            开始使用
          </h2>
          <p className="mt-4 text-ink-400 leading-relaxed max-w-[55ch]">
            两种进入方式，两种理念。二选一即可——两个都装会让你每个技能都有两份。
          </p>
        </div>

        {/* Tab selector — spotlight border on active */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`spotlight-border group text-left p-5 rounded-xl border transition-all ${
                activeTab === idx
                  ? "border-amber-500/40 bg-ink-850"
                  : "border-ink-800 bg-ink-900 hover:bg-ink-850 hover:border-ink-700"
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-mono text-xs ${activeTab === idx ? "text-amber-500" : "text-ink-700"}`}>
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <span className={`text-sm font-semibold ${activeTab === idx ? "text-ink-100" : "text-ink-300"}`}>
                  {tab.label}
                </span>
              </div>
              <p className="text-xs text-ink-600">{tab.sublabel}</p>
            </button>
          ))}
        </div>

        {/* Terminal block — spotlight border, glass */}
        <div
          className="spotlight-border rounded-2xl border border-ink-800 bg-ink-950/80 overflow-hidden shadow-diffuse reveal-on-scroll"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
            e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-ink-800/80 bg-ink-900/60">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500/50" />
              <span className="w-3 h-3 rounded-full bg-sage-500/40" />
              <span className="w-3 h-3 rounded-full bg-blue-500/40" />
            </div>
            <span className="font-mono text-xs text-ink-600">bash — 80×24</span>
            <span className="font-mono text-xs text-ink-700 ml-auto">
              ~/projects/my-app
            </span>
          </div>

          {/* Command — with blinking cursor */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="select-none font-mono text-sm text-sage-400 mt-0.5">$</span>
              <div className="flex-1">
                <code className="font-mono text-sm sm:text-base text-ink-200 break-all">
                  {tabs[activeTab].command}
                </code>
                <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-blink align-middle" />
              </div>
              <button
                onClick={() => handleCopy(tabs[activeTab].command, tabs[activeTab].id)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-ink-500 hover:text-amber-400 hover:bg-ink-800/60 transition-all"
              >
                {copied && copiedKey === tabs[activeTab].id ? (
                  <span className="text-sage-400">✓ copied</span>
                ) : (
                  "copy"
                )}
              </button>
            </div>

            {/* Claude Code session command */}
            {activeTab === 0 && (
              <div className="mt-4 pt-4 border-t border-ink-800/60">
                <div className="flex items-start gap-3">
                  <span className="select-none font-mono text-sm text-ink-600 mt-0.5">›</span>
                  <code className="flex-1 font-mono text-sm text-ink-400 break-all">
                    /plugin install mattpocock-skills
                  </code>
                </div>
              </div>
            )}

            {/* Note */}
            <p className="mt-5 text-xs text-ink-600 leading-relaxed max-w-[65ch]">
              {tabs[activeTab].note}
            </p>
          </div>
        </div>

        {/* Steps — sticky stack pattern */}
        <div className="mt-16 pb-32">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-600 mb-6 block">
            // 三步搞定
          </span>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="group flex items-start gap-4 sm:gap-6 p-5 rounded-xl border border-ink-800 bg-ink-900/50 hover:bg-ink-850 hover:border-ink-700 transition-all spotlight-border"
                style={
                  {
                    "--stagger-index": idx,
                    position: "sticky",
                    top: `${idx * 2}rem`,
                    zIndex: 10 - idx,
                  } as React.CSSProperties
                }
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
                }}
              >
                <span className="font-mono text-2xl sm:text-3xl font-bold text-ink-800 group-hover:text-amber-500/30 transition-colors">
                  {step.num}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-ink-100 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-ink-700 group-hover:text-amber-500/40 transition-colors">
                  {idx < steps.length - 1 ? "↓" : "●"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
