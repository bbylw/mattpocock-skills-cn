// Terminal Simulator - Modern Clean Studio High-Contrast Output
(function() {
  const PRESETS = {
    'grill-with-docs': {
      cmd: 'claude /grill-with-docs "为计费系统增加阶梯用量优惠与退款结算"',
      logs: [
        { tag: 'SCAN', tagClass: 'log-tag-blue', text: '正在审查项目的 CONTEXT.md 与领域模型规范...' },
        { tag: 'DOMAIN', tagClass: 'log-tag-blue', text: '已提取 3 个核心实体: BillingAccount, TierPolicy, UsageBucket' },
        { tag: 'GRILL', tagClass: 'log-tag-amber', text: '边界提问: 当跨阶梯用量在结算日前回退时，是以事件发生时间戳幂等结算还是以账单生成刻为准？' },
        { tag: 'USER', tagClass: 'log-tag-green', text: '> 裁决: 以事件发生时间戳幂等结算，跨阶梯部分单独拆分 Bucket。' },
        { tag: 'ADR', tagClass: 'log-tag-green', text: '写入决策记录: .agents/adr/0004-tier-billing-event-timestamp.md' },
        { tag: 'TERMS', tagClass: 'log-tag-blue', text: '新增通用语言: TierRetrograde (阶梯回退) 与 BucketSlicing (用量分片)' },
        { tag: 'DONE', tagClass: 'log-tag-green', text: '严拷完成！对齐度 100%，已生成实施规格与自动化测试约束。' }
      ]
    },
    'tdd': {
      cmd: 'claude /tdd "实现用量阶梯分片算法 BucketSlicing"',
      logs: [
        { tag: 'RED', tagClass: 'log-tag-red', text: '编写挂掉的单元测试 (Red Phase 先行)...' },
        { tag: 'FAIL', tagClass: 'log-tag-red', text: '✕ test/billing.test.ts > calculateBucketSlices (expected 3 slices, got undefined)' },
        { tag: 'RULE', tagClass: 'log-tag-blue', text: '工程纪律: 坚决不在测试有效失败前提早编写业务实现。' },
        { tag: 'GREEN', tagClass: 'log-tag-green', text: '编写最小可行实现 (Green Phase)...' },
        { tag: 'PASS', tagClass: 'log-tag-green', text: '✓ test/billing.test.ts (4 passed in 14ms)' },
        { tag: 'REFACTOR', tagClass: 'log-tag-amber', text: '在保持全绿灯下消除代码复杂度坏味道 (Refactor Phase)...' },
        { tag: 'SUCCESS', tagClass: 'log-tag-green', text: '重构完成！复杂度从 O(N^2) 降至 O(N)，全部 12 个回归测试持续通过。' }
      ]
    },
    'architecture': {
      cmd: 'claude /improve-codebase-architecture',
      logs: [
        { tag: 'SCAN', tagClass: 'log-tag-blue', text: '扫描代码库中的模块接口边界与依赖拓扑...' },
        { tag: 'WARN', tagClass: 'log-tag-amber', text: '定位 4 个浅模块 (Shallow Modules): UserBillingWrapper, FormatUtils, TokenHelper...' },
        { tag: 'METRIC', tagClass: 'log-tag-blue', text: '指标告警: 浅模块对外方法数与内部实现行数比为 1:1.1 (建议 > 1:5)' },
        { tag: 'DEEPEN', tagClass: 'log-tag-green', text: '加深提议: 将分散的 4 个外露 Helper 收敛至深模块 BillingEngine 核心接口' },
        { tag: 'REPORT', tagClass: 'log-tag-blue', text: '已生成可视化架构加深体检报告: artifacts/deepening-report.html' }
      ]
    },
    'diagnosing': {
      cmd: 'claude /diagnosing-bugs "在并发高负载下 Webhook 重试偶发死锁"',
      logs: [
        { tag: 'LOOP-1', tagClass: 'log-tag-red', text: '构建能够 100% 触发死锁的最小复现测试用例...' },
        { tag: 'HYPO', tagClass: 'log-tag-amber', text: '提出假说: 数据库事务与 Redis 锁释放顺序不一致导致循环等待' },
        { tag: 'PROBE', tagClass: 'log-tag-blue', text: '在 3 个关键接缝插入结构化探针日志 (Structured Probes)...' },
        { tag: 'PROOF', tagClass: 'log-tag-green', text: '探针捕获证据: TxCommit 在 LockRelease 之后执行，验证假说！' },
        { tag: 'FIX', tagClass: 'log-tag-green', text: '调整释放顺序并加入 defer 清理。回归压测 10,000 次: 0 失败。' }
      ]
    }
  };

  let activePreset = 'grill-with-docs';
  let timerId = null;

  function clearTimer() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function runSimulation(key) {
    activePreset = key;
    const data = PRESETS[key];
    if (!data) return;

    clearTimer();

    const screenEl = document.getElementById('terminal-screen');
    if (!screenEl) return;

    screenEl.innerHTML = `
      <div class="term-prompt-line">
        <span class="term-prompt-arrow">❯</span>
        <span id="term-cmd-text" class="term-cmd-text"></span>
        <span class="term-cursor">▍</span>
      </div>
      <div id="term-logs-container"></div>
    `;

    const cmdEl = document.getElementById('term-cmd-text');
    const logsEl = document.getElementById('term-logs-container');

    let idx = 0;
    const fullCmd = data.cmd;

    // Respect reduced motion: skip typewriter effect
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function typeCmd() {
      if (idx < fullCmd.length) {
        cmdEl.textContent += fullCmd[idx++];
        timerId = setTimeout(typeCmd, prefersReducedMotion ? 0 : (18 + Math.random() * 12));
      } else {
        timerId = setTimeout(() => printLogLine(0), prefersReducedMotion ? 0 : 100);
      }
    }

    function printLogLine(logIdx) {
      if (logIdx < data.logs.length) {
        const item = data.logs[logIdx];
        const line = document.createElement('div');
        line.className = 'term-log-row';
        line.innerHTML = `<span class="log-tag ${item.tagClass}">${item.tag}</span> <span class="log-text">${item.text}</span>`;
        logsEl.appendChild(line);

        screenEl.scrollTop = screenEl.scrollHeight;
        timerId = setTimeout(() => printLogLine(logIdx + 1), prefersReducedMotion ? 0 : 200);
      } else {
        // Auto-clear the timer once done
        clearTimer();
      }
    }

    typeCmd();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.term-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        runSimulation(tab.dataset.preset);
      });

      // Keyboard navigation: left / right arrows
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const list = Array.from(tabs);
        const cur = list.indexOf(tab);
        const next = list[(cur + dir + list.length) % list.length];
        if (next) {
          next.focus();
          next.click();
        }
      });
    });

    const replayBtn = document.getElementById('term-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => runSimulation(activePreset));
    }

    const copyLogsBtn = document.getElementById('term-copy-logs-btn');
    if (copyLogsBtn) {
      copyLogsBtn.addEventListener('click', () => {
        const screenEl = document.getElementById('terminal-screen');
        if (screenEl && window.copyText) {
          window.copyText(screenEl.innerText, '已复制终端日志输出！');
        }
      });
    }

    // Clean up timer on pagehide (prevents stray timeouts if user navigates away)
    window.addEventListener('pagehide', clearTimer);

    runSimulation('grill-with-docs');
  });

  window.runTerminalPreset = runSimulation;
})();
