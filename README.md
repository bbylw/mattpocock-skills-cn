# Agent 技能包

一组扩展规划、开发与工具链能力的 Agent 技能集合。

## 规划与设计

这些技能帮助你在编写代码之前理清思路。

- **to-prd** — 将当前对话上下文转化为 PRD（产品需求文档），并提交为 GitHub Issue。无需访谈——直接综合你已讨论过的内容。

  ```
  npx skills@latest add mattpocock/skills/to-prd
  ```

- **to-issues** — 使用垂直切片方式，将任何计划、规格说明或 PRD 拆分为可独立认领的 GitHub Issue。

  ```
  npx skills@latest add mattpocock/skills/to-issues
  ```

- **grill-me** — 就某个计划或设计进行持续追问式访谈，直到决策树上的每一个分支都得到解决。

  ```
  npx skills@latest add mattpocock/skills/grill-me
  ```

- **design-an-interface** — 使用并行子 Agent 为某个模块生成多个截然不同的接口设计方案。

  ```
  npx skills@latest add mattpocock/skills/design-an-interface
  ```

- **request-refactor-plan** — 通过用户访谈创建带有细小提交的详细重构计划，并提交为 GitHub Issue。

  ```
  npx skills@latest add mattpocock/skills/request-refactor-plan
  ```

## 开发

这些技能帮助你编写、重构和修复代码。

- **tdd** — 遵循红-绿-重构循环的测试驱动开发。每次一个垂直切片地构建功能或修复缺陷。

  ```
  npx skills@latest add mattpocock/skills/tdd
  ```

- **triage-issue** — 通过探索代码库排查缺陷，定位根因，并提交附带 TDD 修复方案的 GitHub Issue。

  ```
  npx skills@latest add mattpocock/skills/triage-issue
  ```

- **improve-codebase-architecture** — 依据 `CONTEXT.md` 中的领域语言以及 `docs/adr/` 中的决策记录，在代码库中发现可深化改进的机会。

  ```
  npx skills@latest add mattpocock/skills/improve-codebase-architecture
  ```

- **migrate-to-shoehorn** — 将测试文件中的 `as` 类型断言迁移为 @total-typescript/shoehorn。

  ```
  npx skills@latest add mattpocock/skills/migrate-to-shoehorn
  ```

- **scaffold-exercises** — 创建包含章节、习题、解答和讲解的练习目录结构。

  ```
  npx skills@latest add mattpocock/skills/scaffold-exercises
  ```

## 工具链与环境配置

- **setup-pre-commit** — 配置 Husky pre-commit 钩子，集成 lint-staged、Prettier、类型检查和测试。

  ```
  npx skills@latest add mattpocock/skills/setup-pre-commit
  ```

- **git-guardrails-claude-code** — 设置 Claude Code 钩子，在执行危险 git 命令（push、reset --hard、clean 等）前进行拦截。

  ```
  npx skills@latest add mattpocock/skills/git-guardrails-claude-code
  ```

## 写作与知识管理

- **write-a-skill** — 按照合理的结构、渐进式展开和资源打包的方式创建新技能。

  ```
  npx skills@latest add mattpocock/skills/write-a-skill
  ```

- **edit-article** — 通过重组章节、提升清晰度和精简行文来编辑和改进文章。

  ```
  npx skills@latest add mattpocock/skills/edit-article
  ```

- **ubiquitous-language** — 从当前对话中提取 DDD 风格的通用语言词汇表。

  ```
  npx skills@latest add mattpocock/skills/ubiquitous-language
  ```

- **obsidian-vault** — 在 Obsidian 知识库中搜索、创建和管理带有双向链接与索引的笔记。

  ```
  npx skills@latest add mattpocock/skills/obsidian-vault
  ```
