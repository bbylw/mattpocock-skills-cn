<p>
  <a href="https://www.aihero.dev/s/skills-newsletter">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skills-repo-dark_2x.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png">
      <img alt="Skills" src="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png" width="369">
    </picture>
  </a>
</p>

# 写给真正工程师的技能集（Skills）

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

这是我每天用来做正经工程（而不是「氛围编程」）的 agent 技能集。

开发真正的应用程序是困难的。像 GSD、BMAD、Spec-Kit 这类方案试图通过接管整个流程来提供帮助，但这样做的同时，它们夺走了你的控制权，也让流程中出现的 bug 难以排查。

这些技能的设计理念是小巧、易改造、可组合。它们适用于任何模型，建立在数十年的工程经验之上。随便折腾，把它们变成你自己的。玩得开心。

如果你想跟进这些技能的改动，以及我创建的任何新技能，可以加入我邮件订阅列表中约 60,000 名其他开发者：

[订阅邮件列表](https://www.aihero.dev/s/skills-newsletter)

## 安装（30 秒搞定）

两种进入方式，两种理念。**Claude Code 插件**把整个技能集作为一个受管理的只读包来安装，我会发布更新它就更新——你是在订阅，而不是复刻。**skills.sh** 则把可编辑的技能文件复制到你的项目中，这样你就能随意改动、据为己有。二选一即可——两个都装会让你每个技能都有两份。

### 1. 获取技能

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugins install mattpocock-skills
```

或者在会话内执行：

```
/plugin install mattpocock-skills
```

它位于 Claude Code 官方市场，因此无需先添加任何东西，更新也会自动送达。

</details>

<details>
<summary><strong>Codex 及其他 agent</strong></summary>

```bash
npx skills@latest add mattpocock/skills
```

选择你想要的技能，以及要把它们安装到哪些编码 agent 上。**安装器允许你选择要取用哪些技能——务必把 `setup-matt-pocock-skills` 包含在内。**

原生 Codex 插件已在路线图中——参见 [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](https://github.com/mattpocock/skills/blob/main/.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

</details>

<details>
<summary><strong>给折腾党</strong></summary>

用同一个安装器，在任何 agent 上（包括 Claude Code）都行：

```bash
npx skills@latest add mattpocock/skills
```

它会把这些技能作为你拥有且可编辑的普通文件写入你的仓库。背后不会偷偷更新；想取用我的最新改动时，运行 `npx skills update` 即可。

</details>

### 2. 运行 `/setup-matt-pocock-skills`

在你的 agent 中，每个仓库运行一次。它会：

- 询问你想用哪个问题追踪器（GitHub、Linear，或本地文件）
- 询问你在分类（triage）工单时会打上哪些标签（`/triage` 会用到标签）
- 询问你想把生成的文档保存在哪里

### 3. 搞定——准备开干。

## 这些技能为何存在

我构建这些技能，是为了修复我在 Claude Code、Codex 及其他编码 agent 上看到的常见失败模式。

### #1：Agent 没做我想要的东西

> "没有人能确切知道自己想要什么。"
>
> David Thomas & Andrew Hunt，《程序员修炼之道》（The Pragmatic Programmer）

**问题**。软件开发中最常见的失败模式就是目标不一致。你以为开发者知道你想要什么。然后你看到他做出来的东西——才发现他压根没理解你。

在 AI 时代也一样。你和 agent 之间存在沟通鸿沟。解决办法是一场**严拷式会话（grilling session）**——让 agent 就你正在构建的东西问你一堆详细问题。

**修复方法**是使用：

- [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) —— 用于非代码场景
- [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) —— 与 [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) 相同，但附加了更多好东西（见下文）

这些是我最热门的技能。它们能帮你在动手前与 agent 达成一致，并深入思考你正在做的改动。每次想做改动时都用它们。

### #2：Agent 太啰嗦了

> 有了通用语言（ubiquitous language），开发者之间的对话与代码的表达全都源自同一个领域模型。
>
> Eric Evans，《领域驱动设计》（Domain-Driven-Design）

**问题**：项目刚开始时，开发者与他们所构建软件的服务对象（领域专家）通常说着不同的语言。

我与我的 agent 之间也感受到了同样的张力。Agent 通常被随手丢进一个项目，然后被要求边走边弄清楚那些行话。于是它们用 20 个词才能说清 1 个词就能讲明白的事。

**修复方法**是建立一套通用语言。这是一份帮助 agent 解码项目中行话的文档。

<details>
<summary>
示例
</summary>

这里有一个来自我的 `course-video-manager` 仓库的 [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) 示例。哪种读起来更轻松？

- **改前**："当课程里某个章节中的一课被'实体化'（即被赋予了文件系统中的某个位置）时，会出问题。"
- **改后**："实体化级联（materialization cascade）出问题了。"

这种简洁会在一次次会话中持续带来回报。

</details>

这已内建在 [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) 中。它是一场严拷式会话，但会帮你与 AI 建立通用语言，并把难以解释的决策记录到 ADR 中。

这种方法的威力有多强，难以言表。它可能是本仓库里最酷的一项技术。试试看就知道了。

> [!TIP]
> 通用语言除了减少啰嗦，还有许多其他好处：
>
> - **变量、函数和文件的命名**能够使用通用语言保持一致
> - 由此，**agent 更容易在代码库中导航**
> - agent 也因为能用更简洁的语言，**在思考上耗费更少的 token**

### #3：代码跑不通

> "永远采取小而刻意的步骤。反馈的速率就是你的速度上限。绝不要接手过于庞大的任务。"
>
> David Thomas & Andrew Hunt，《程序员修炼之道》

**问题**：假设你和 agent 在要构建什么上达成了共识。当 agent _仍然_写出一堆垃圾时，会发生什么？

是时候审视你的反馈回路了。如果没有关于它产出的代码实际运行情况的反馈，agent 就是在盲飞。

**修复方法**：你需要常规的反馈回路组合：静态类型、浏览器访问，以及自动化测试。

对于自动化测试，红-绿-重构（red-green-refactor）循环至关重要。也就是让 agent 先写一个失败的测试，再去修复它。这有助于给 agent 提供稳定一致的反馈，从而产出好得多的代码。

我构建了一个可插入任意项目的 **[`/tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) 技能**。它倡导红-绿-重构，并就什么是好测试和坏测试给 agent 大量指引。

对于调试，我还构建了一个 **[`/diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md) 技能**，把最佳调试实践封装成一个循序渐进、逐阶段把关的纪律性循环。

### #4：我们造了一坨烂泥

> "每一天都要为系统的设计投入。"
>
> Kent Beck，《解析极限编程》（Extreme Programming Explained）

> "最好的模块是深的。它们通过一个简单的接口，就能访问大量功能。"
>
> John Ousterhout，《软件设计的哲学》（A Philosophy Of Software Design）

**问题**：大多数用 agent 构建的应用都复杂且难以改动。因为 agent 能极大地加速编码，它们也同时加速了软件的熵增。代码库以空前的速率变得越来越复杂。

**修复方法**是对 AI 驱动开发采取一种激进的新思路：关心代码的设计。

这已内建在这些技能的每一层：

- [`/to-spec`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md) 会在生成规格说明前，就你正在触碰哪些模块对你进行提问

而关键的是，[`/improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md) 会扫描代码库以寻找「加深」（deepening）的机会，并把候选者交到你手上。我建议每隔几天就在你的代码库上跑一次。它是一次调研，而非救援：对于一个真正老旧的代码库，它会找到真实的候选者，但不会替你把烂泥解开。

### 小结

软件工程的基本原则比以往任何时候都更重要。这些技能是我尽最大努力把这些原则浓缩成可重复实践的结果，以帮助你交付职业生涯中最好的应用。玩得开心。

## 参考

这些技能按一个维度划分——谁能调用它们。**用户调用（User-invoked）**的技能只有当你输入它们时（例如 `/grill-me`）才可达；它们的职责是做编排。**模型调用（Model-invoked）**的技能可以由你调用，也可以在任务契合时被 agent 自动取用；它们承载着可复用的纪律。一个用户调用的技能可以调用模型调用的技能，但绝不能调用另一个用户调用的技能。

### Engineering（工程）

我每天用于代码工作的技能。

**用户调用**

- **[ask-matt](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md)** —— 询问哪个技能或流程适合你当下的处境。本仓库用户调用技能之上的一个路由器。
- **[grill-with-docs](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md)** —— 严拷式会话，同时构建你项目的领域模型，打磨术语并就地更新 `CONTEXT.md` 和 ADR。
- **[triage](https://github.com/mattpocock/skills/blob/main/skills/engineering/triage/SKILL.md)** —— 让问题通过一组成分类角色的状态机流转。
- **[improve-codebase-architecture](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md)** —— 扫描代码库以寻找「加深」机会，以可视化 HTML 报告呈现，然后就你选中的那个逐一严拷。
- **[setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md)** —— 为本仓库配置工程技能（问题追踪器、分类标签、领域文档布局）。在使用其他工程技能前，每个仓库运行一次。
- **[to-spec](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md)** —— 把当前对话转成一份规格说明，并发布到问题追踪器。没有访谈——只是综合你已经讨论过的内容。
- **[to-tickets](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md)** —— 把任何计划、规格说明或对话拆成一组「追踪子弹」式工单，每张都声明自己的阻塞边界——写成本地文件中的文本，或写成真实追踪器上的原生阻塞链接。
- **[implement](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md)** —— 构建由一份规格说明或一组工单描述的工作，在预先约定的接缝处驱动 `/tdd`，并在提交前以 `/code-review` 收尾。
- **[wayfinder](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md)** —— 把远超单个 agent 会话所能承载的一大块工作，规划成问题追踪器上一张共享的决策工单地图——逐一解决，直到通往目的地的路清晰为止。

**模型调用**

- **[prototype](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md)** —— 构建一个一次性的原型来回答一个设计问题——一个用于状态/逻辑问题的可分享 HTML 文件，或从同一条路由可切换的几种截然不同的 UI 变体。
- **[diagnosing-bugs](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)** —— 针对疑难 bug 和性能回退的严谨诊断循环：构建一个在本 bug 上变红的反馈回路 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。
- **[research](https://github.com/mattpocock/skills/blob/main/skills/engineering/research/SKILL.md)** —— 针对高可信的一手来源调研一个问题，并把结论以带引用的 Markdown 文件记录到仓库中，作为后台 agent 运行。
- **[tdd](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md)** —— 测试驱动开发，采用红-绿-重构循环。一次以一个垂直切片的方式构建功能或修复 bug。
- **[domain-modeling](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md)** —— 主动构建并打磨项目的领域模型——对照术语表挑战术语、用边界场景施压测试，并就地更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md)** —— 设计深模块（deep modules）的共享纪律与词汇：大量行为藏在一个小接口之后，置于干净的接缝处，并可通过该接口测试。
- **[code-review](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)** —— 对自某个固定点以来的 diff 做双轴审查：**标准（Standards）**（它是否遵循仓库的编码标准，外加一个 Fowler 坏味道基线？）与**规格（Spec）**（它是否忠实地实现了源头的 issue/规格？），以并行子 agent 运行，互不污染。
- **[resolving-merge-conflicts](https://github.com/mattpocock/skills/blob/main/skills/engineering/resolving-merge-conflicts/SKILL.md)** —— 逐块走完一个进行中的 git merge 或 rebase 冲突，依据追溯到各方一手来源的意图来解决，然后完成该操作——绝不 `--abort`。
- **[wizard](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md)** —— 生成一个交互式 bash 向导，带着人类走过只有他们才能完成的步骤：配置基础设施、设置凭据或 CI 密钥、走查不熟悉的第三方后台，或运行一次性的迁移/切换。

### Productivity（效率）

通用的流程工具，与代码无关。

**用户调用**

- **[grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md)** —— 就被 relentlessly 地就一个计划或设计盘问，直到设计树的每个分支都被解决。
- **[handoff](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md)** —— 把当前对话压缩成一份交接文档，以便另一个 agent 继续这项工作。
- **[teach](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md)** —— 在多个会话中教用户一项新技能或概念，以当前目录作为一个有状态的教学习工作区。
- **[to-questionnaire](https://github.com/mattpocock/skills/blob/main/skills/productivity/to-questionnaire/SKILL.md)** —— 把你独自无法决定的事情，转成一份 Markdown 问卷给那个唯一能作答的人——异步填写，或一起开会填。它盘问的是这次发件（发给谁、你需要拿回什么），而不是主题本身。
- **[wait-what](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md)** —— 一旦某条消息没被听懂就立刻触发。agent 会结合你所缺失的上下文，用大白话并借助你的 `CONTEXT.md` 词汇，重新把它讲一遍。

**模型调用**

- **[grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)** —— 就一个计划、决策或想法对用户进行 relentlessly 的盘问，直到设计树的每个分支都被解决。`grill-me`、`grill-with-docs`、`triage`、`wayfinder` 和 `improve-codebase-architecture` 背后可复用的访谈原语。
- **[writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)** —— 为 agent 写文档：技能、AGENTS.md/CLAUDE.md，以及任何 agent 通过指针可达的文档。
