export interface Skill {
  name: string
  slug: string
  url: string
  description: string
  category: "engineering" | "productivity"
  invocation: "user" | "model"
}

export const skills: Skill[] = [
  // Engineering — User-invoked
  {
    name: "ask-matt",
    slug: "ask-matt",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md",
    description: "询问哪个技能或流程适合你当下的处境。本仓库用户调用技能之上的一个路由器。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "grill-with-docs",
    slug: "grill-with-docs",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md",
    description: "严拷式会话，同时构建你项目的领域模型，打磨术语并就地更新 CONTEXT.md 和 ADR。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "triage",
    slug: "triage",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/triage/SKILL.md",
    description: "让问题通过一组成分类角色的状态机流转。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "improve-codebase-architecture",
    slug: "improve-codebase-architecture",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md",
    description: "扫描代码库以寻找「加深」机会，以可视化 HTML 报告呈现，然后就你选中的那个逐一严拷。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "setup-matt-pocock-skills",
    slug: "setup-matt-pocock-skills",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md",
    description: "为本仓库配置工程技能（问题追踪器、分类标签、领域文档布局）。在使用其他工程技能前，每个仓库运行一次。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "to-spec",
    slug: "to-spec",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md",
    description: "把当前对话转成一份规格说明，并发布到问题追踪器。没有访谈——只是综合你已经讨论过的内容。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "to-tickets",
    slug: "to-tickets",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md",
    description: "把任何计划、规格说明或对话拆成一组「追踪子弹」式工单，每张都声明自己的阻塞边界。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "implement",
    slug: "implement",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md",
    description: "构建由一份规格说明或一组工单描述的工作，在预先约定的接缝处驱动 /tdd，并在提交前以 /code-review 收尾。",
    category: "engineering",
    invocation: "user",
  },
  {
    name: "wayfinder",
    slug: "wayfinder",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md",
    description: "把远超单个 agent 会话所能承载的一大块工作，规划成问题追踪器上一张共享的决策工单地图。",
    category: "engineering",
    invocation: "user",
  },
  // Engineering — Model-invoked
  {
    name: "prototype",
    slug: "prototype",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md",
    description: "构建一个一次性的原型来回答一个设计问题——一个用于状态/逻辑问题的可分享 HTML 文件。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "diagnosing-bugs",
    slug: "diagnosing-bugs",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md",
    description: "针对疑难 bug 和性能回退的严谨诊断循环：构建反馈回路 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "research",
    slug: "research",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/research/SKILL.md",
    description: "针对高可信的一手来源调研一个问题，并把结论以带引用的 Markdown 文件记录到仓库中。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "tdd",
    slug: "tdd",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md",
    description: "测试驱动开发，采用红-绿-重构循环。一次以一个垂直切片的方式构建功能或修复 bug。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "domain-modeling",
    slug: "domain-modeling",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md",
    description: "主动构建并打磨项目的领域模型——对照术语表挑战术语、用边界场景施压测试。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "codebase-design",
    slug: "codebase-design",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md",
    description: "设计深模块的共享纪律与词汇：大量行为藏在一个小接口之后，置于干净的接缝处。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "code-review",
    slug: "code-review",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md",
    description: "对自某个固定点以来的 diff 做双轴审查：标准（Standards）与规格（Spec），以并行子 agent 运行。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "resolving-merge-conflicts",
    slug: "resolving-merge-conflicts",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/resolving-merge-conflicts/SKILL.md",
    description: "逐块走完一个进行中的 git merge 或 rebase 冲突，依据意图来解决，然后完成该操作——绝不 abort。",
    category: "engineering",
    invocation: "model",
  },
  {
    name: "wizard",
    slug: "wizard",
    url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md",
    description: "生成一个交互式 bash 向导，带着人类走过只有他们才能完成的步骤。",
    category: "engineering",
    invocation: "model",
  },
  // Productivity — User-invoked
  {
    name: "grill-me",
    slug: "grill-me",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md",
    description: "就被 relentlessly 地就一个计划或设计盘问，直到设计树的每个分支都被解决。",
    category: "productivity",
    invocation: "user",
  },
  {
    name: "handoff",
    slug: "handoff",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md",
    description: "把当前对话压缩成一份交接文档，以便另一个 agent 继续这项工作。",
    category: "productivity",
    invocation: "user",
  },
  {
    name: "teach",
    slug: "teach",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md",
    description: "在多个会话中教用户一项新技能或概念，以当前目录作为一个有状态的教学习工作区。",
    category: "productivity",
    invocation: "user",
  },
  {
    name: "to-questionnaire",
    slug: "to-questionnaire",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/to-questionnaire/SKILL.md",
    description: "把你独自无法决定的事情，转成一份 Markdown 问卷给那个唯一能作答的人。",
    category: "productivity",
    invocation: "user",
  },
  {
    name: "wait-what",
    slug: "wait-what",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md",
    description: "一旦某条消息没被听懂就立刻触发。agent 会结合你所缺失的上下文，用大白话重新把它讲一遍。",
    category: "productivity",
    invocation: "user",
  },
  // Productivity — Model-invoked
  {
    name: "grilling",
    slug: "grilling",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md",
    description: "就一个计划、决策或想法对用户进行 relentlessly 的盘问。grill-me、grill-with-docs 等背后可复用的访谈原语。",
    category: "productivity",
    invocation: "model",
  },
  {
    name: "writing-for-agents",
    slug: "writing-for-agents",
    url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md",
    description: "为 agent 写文档：技能、AGENTS.md/CLAUDE.md，以及任何 agent 通过指针可达的文档。",
    category: "productivity",
    invocation: "model",
  },
]

export interface PainPoint {
  number: string
  title: string
  quote: string
  quoteSource: string
  problem: string
  solutionLabel: string
  solution: string
  links: { label: string; url: string }[]
}

export const painPoints: PainPoint[] = [
  {
    number: "01",
    title: "Agent 没做我想要的东西",
    quote: "没有人能确切知道自己想要什么。",
    quoteSource: "David Thomas & Andrew Hunt，《程序员修炼之道》",
    problem:
      "软件开发中最常见的失败模式就是目标不一致。你以为开发者知道你想要什么。然后你看到他做出来的东西——才发现他压根没理解你。在 AI 时代也一样。你和 agent 之间存在沟通鸿沟。",
    solutionLabel: "修复方法是严拷式会话",
    solution:
      "让 agent 就你正在构建的东西问你一堆详细问题。帮你在动手前与 agent 达成一致，并深入思考你正在做的改动。每次想做改动时都用它们。",
    links: [
      { label: "/grill-me", url: "https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md" },
      { label: "/grill-with-docs", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md" },
    ],
  },
  {
    number: "02",
    title: "Agent 太啰嗦了",
    quote: "有了通用语言，开发者之间的对话与代码的表达全都源自同一个领域模型。",
    quoteSource: "Eric Evans，《领域驱动设计》",
    problem:
      "项目刚开始时，开发者与他们所构建软件的服务对象通常说着不同的语言。Agent 通常被随手丢进一个项目，然后被要求边走边弄清楚那些行话。于是它们用 20 个词才能说清 1 个词就能讲明白的事。",
    solutionLabel: "修复方法是建立一套通用语言",
    solution:
      "这是一份帮助 agent 解码项目中行话的文档。内建在 /grill-with-docs 中——它是一场严拷式会话，但会帮你与 AI 建立通用语言，并把难以解释的决策记录到 ADR 中。",
    links: [
      { label: "/grill-with-docs", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md" },
    ],
  },
  {
    number: "03",
    title: "代码跑不通",
    quote: "永远采取小而刻意的步骤。反馈的速率就是你的速度上限。绝不要接手过于庞大的任务。",
    quoteSource: "David Thomas & Andrew Hunt，《程序员修炼之道》",
    problem:
      "假设你和 agent 在要构建什么上达成了共识。当 agent 仍然写出一堆垃圾时，会发生什么？是时候审视你的反馈回路了。如果没有关于它产出的代码实际运行情况的反馈，agent 就是在盲飞。",
    solutionLabel: "修复方法是常规的反馈回路组合",
    solution:
      "静态类型、浏览器访问，以及自动化测试。红-绿-重构循环至关重要——让 agent 先写一个失败的测试，再去修复它。还提供了诊断循环技能来封装最佳调试实践。",
    links: [
      { label: "/tdd", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md" },
      { label: "/diagnosing-bugs", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md" },
    ],
  },
  {
    number: "04",
    title: "我们造了一坨烂泥",
    quote: "最好的模块是深的。它们通过一个简单的接口，就能访问大量功能。",
    quoteSource: "John Ousterhout，《软件设计的哲学》",
    problem:
      "大多数用 agent 构建的应用都复杂且难以改动。因为 agent 能极大地加速编码，它们也同时加速了软件的熵增。代码库以空前的速率变得越来越复杂。",
    solutionLabel: "修复方法是对 AI 驱动开发关心代码设计",
    solution:
      "to-spec 会在生成规格说明前就你正在触碰哪些模块对你进行提问。improve-codebase-architecture 会扫描代码库以寻找「加深」机会，并把候选者交到你手上。建议每隔几天就在你的代码库上跑一次。",
    links: [
      { label: "/to-spec", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md" },
      { label: "/improve-codebase-architecture", url: "https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md" },
    ],
  },
]
