// Application Controller - Modern Clean Studio (Polished & Refined)
// Flag JS availability before first paint so reveal styles never cause a flash
// of hidden content (FOUC).
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const skills = window.SKILLS_DATA || [];
  let activeFilter = 'all';
  let searchQuery = '';
  let activeView = 'grid'; // 'grid' | 'table'

  // DOM Elements
  const gridEl = document.getElementById('skills-grid');
  const tableContainerEl = document.getElementById('skills-table-wrap');
  const countEl = document.getElementById('skills-count');
  const searchInput = document.getElementById('skills-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewSwitchBtns = document.querySelectorAll('.view-switch-btn');
  const modalOverlay = document.getElementById('skill-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const toastContainer = document.getElementById('toast-container');
  const headerEl = document.querySelector('.site-header');
  let lastFocusedEl = null;

  // 0. Theme Toggle (dark / light), persisted to localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      const label = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.title = label;
    }
  }

  applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (systemDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Follow system theme changes while the user has no explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  });

  // 0b. Mobile Navigation
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function setMobileMenu(open) {
    if (!navToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('open')));

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => setMobileMenu(false));
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        setMobileMenu(false);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMobileMenu(false);
        navToggle.focus();
      }
    });
  }

  // 0c. Scroll Reveal (fade-up entrance for .reveal elements)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  function observeReveals(scope) {
    (scope || document).querySelectorAll('.reveal:not(.revealed)').forEach(el => revealObserver.observe(el));
  }

  observeReveals();

  // 1. Header Scroll Shadow & ScrollSpy (throttled with requestAnimationFrame)
  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (scrollY > 20) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }

      // ScrollSpy
      let current = '';
      const scrollPos = scrollY + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      scrollTicking = false;
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. CONTEXT.md Interactive Comparison Scenarios
  const SCENARIOS = {
    'video': {
      title: '案例对比：来自真实项目 course-video-manager 的 CONTEXT.md 落地效果',
      before: '"当课程里某个章节中的一课被\'实体化\'（即被赋予了文件系统中的某个位置）时，会出问题。"',
      after: '"实体化级联（materialization cascade）出问题了。"',
      savings: '80%',
      beforeNote: '⚠️ 痛点：Agent 需要阅读长篇解释，在长会话中极易发生概念漂移和逻辑理解偏差。',
      afterNote: '✅ 收益：变量与架构命名保持一致，Agent 导航代码库更精准，思考消耗更少 Token。'
    },
    'triage': {
      title: '案例对比：来自工单自动分类分派系统 (Issue Triage Engine)',
      before: '"当用户在第三方系统修改了工单优先级，需要把它从待处理队列移出并放入高优重试通道，同时触发状态机重置。"',
      after: '"触发 PriorityEscalation 事件并执行通道重路由。"',
      savings: '85%',
      beforeNote: '⚠️ 痛点：口语化描述容易让 Agent 遗漏幂等性检查和边缘状态回退处理。',
      afterNote: '✅ 收益：统一状态机事件名后，生成的单元测试与状态迁移代码 100% 吻合。'
    },
    'deepening': {
      title: '案例对比：来自计费中台架构重构 (Billing Engine Deepening)',
      before: '"不要在外部自己调用算税助手、优惠券计算器和分账工具，统统通过核心计费接口一次性完成扣款与对账。"',
      after: '"收敛浅模块至深模块 BillingEngine.processSettlement()。"',
      savings: '75%',
      beforeNote: '⚠️ 痛点：碎片化指令会让 Agent 频繁生成浅包装 Wrapper，加剧代码熵增。',
      afterNote: '✅ 收益：Agent 严格遵循高内聚原则，将复杂性藏在深接口后。'
    }
  };

  const diffTabs = document.querySelectorAll('.diff-tab-btn');
  diffTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      diffTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = SCENARIOS[btn.dataset.scenario];
      if (!data) return;

      const titleEl = document.getElementById('diff-scenario-title');
      const beforeEl = document.getElementById('diff-before-text');
      const afterEl = document.getElementById('diff-after-text');
      const beforeNoteEl = document.getElementById('diff-before-note');
      const afterNoteEl = document.getElementById('diff-after-note');
      const savingsBadgeEl = document.getElementById('diff-savings-badge');
      const gaugeFillEl = document.getElementById('diff-gauge-fill');
      const gaugeTextEl = document.getElementById('diff-gauge-text');

      if (titleEl) titleEl.textContent = data.title;
      if (beforeEl) beforeEl.textContent = data.before;
      if (afterEl) afterEl.textContent = data.after;
      if (beforeNoteEl) beforeNoteEl.textContent = data.beforeNote;
      if (afterNoteEl) afterNoteEl.textContent = data.afterNote;
      if (savingsBadgeEl) savingsBadgeEl.textContent = `Token 节省 ${data.savings} · 消除歧义`;
      if (gaugeFillEl) gaugeFillEl.style.width = data.savings;
      if (gaugeTextEl) gaugeTextEl.textContent = `Token 消耗减少 ${data.savings}`;
    });
  });

  // 3. Render Skills Grid & Table
  function getFilteredSkills() {
    return skills.filter(item => {
      if (activeFilter === 'engineering' && item.category !== 'engineering') return false;
      if (activeFilter === 'productivity' && item.category !== 'productivity') return false;
      if (activeFilter === 'user' && item.type !== 'user') return false;
      if (activeFilter === 'model' && item.type !== 'model') return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.desc.toLowerCase().includes(q);
        const inLong = item.longDesc.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!inName && !inDesc && !inLong && !inTags) return false;
      }
      return true;
    });
  }

  function renderSkills() {
    const filtered = getFilteredSkills();

    if (countEl) {
      countEl.textContent = `共展示 ${filtered.length} 个技能 (总计 ${skills.length} 个)`;
    }

    if (activeView === 'grid') {
      if (gridEl) gridEl.style.display = 'grid';
      if (tableContainerEl) tableContainerEl.style.display = 'none';
      renderGridView(filtered);
    } else {
      if (gridEl) gridEl.style.display = 'none';
      if (tableContainerEl) tableContainerEl.style.display = 'block';
      renderTableView(filtered);
    }
  }

  function renderGridView(filtered) {
    if (!gridEl) return;

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="skills-empty-state">
          <p class="skills-empty-text">未找到与「${searchQuery}」相关的技能</p>
          <button class="btn btn-secondary" id="reset-filter-btn">清空搜索与筛选</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetSearch);
      }
      return;
    }

    gridEl.innerHTML = filtered.map(item => {
      const isUser = item.type === 'user';
      const typeBadge = isUser ? 'badge-blue' : 'badge-purple';
      const typeLabel = isUser ? '用户调用 (编排)' : '模型调用 (纪律)';
      const catBadge = item.category === 'engineering' ? 'badge-emerald' : 'badge-amber';
      const catLabel = item.category === 'engineering' ? '工程实践' : '效率工具';

      return `
        <article class="clean-card skill-box-card" data-id="${item.id}" tabindex="0" role="button" aria-label="查看 ${item.name} 技能详情">
          <div class="skill-box-top">
            <span class="skill-box-name">/${item.name}</span>
            <div class="skill-box-badges">
              <span class="badge ${catBadge}">${catLabel}</span>
              <span class="badge ${typeBadge}">${typeLabel}</span>
            </div>
          </div>
          <p class="skill-box-desc">${item.desc}</p>
          <div class="skill-box-tags">
            ${item.tags.map(t => `<span class="kbd">#${t}</span>`).join('')}
          </div>
          <div class="skill-box-foot">
            <button class="btn-skill-action copy-cmd-btn" data-cmd="${item.exampleCmd}" type="button">
              复制指令
            </button>
            <button class="btn-skill-action view-detail-btn" data-id="${item.id}" type="button">
              机制解析 ↗
            </button>
          </div>
        </article>
      `;
    }).join('');

    bindCardActions(gridEl);
  }

  function renderTableView(filtered) {
    if (!tableContainerEl) return;

    if (filtered.length === 0) {
      tableContainerEl.innerHTML = `
        <div class="skills-empty-state">
          <p class="skills-empty-text">未找到与「${searchQuery}」相关的技能</p>
        </div>
      `;
      return;
    }

    tableContainerEl.innerHTML = `
      <table class="skills-dense-table">
        <thead>
          <tr>
            <th>技能名称</th>
            <th>分类</th>
            <th>调用方式</th>
            <th>核心用途</th>
            <th style="text-align: right;">操作</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(item => {
            const isUser = item.type === 'user';
            const typeBadge = isUser ? 'badge-blue' : 'badge-purple';
            const typeLabel = isUser ? '用户调用' : '模型调用';
            const catBadge = item.category === 'engineering' ? 'badge-emerald' : 'badge-amber';
            const catLabel = item.category === 'engineering' ? '工程' : '效率';

            return `
              <tr data-id="${item.id}" style="cursor: pointer;" tabindex="0">
                <td><strong class="skill-table-name">/${item.name}</strong></td>
                <td><span class="badge ${catBadge}">${catLabel}</span></td>
                <td><span class="badge ${typeBadge}">${typeLabel}</span></td>
                <td class="skill-table-desc">${item.desc}</td>
                <td style="text-align: right; white-space: nowrap;">
                  <button class="btn-skill-action copy-cmd-btn" data-cmd="${item.exampleCmd}" type="button" style="margin-right: 0.4rem;">
                    复制
                  </button>
                  <button class="btn-skill-action view-detail-btn" data-id="${item.id}" type="button">
                    详情 ↗
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    bindCardActions(tableContainerEl);
  }

  function bindCardActions(container) {
    container.querySelectorAll('.copy-cmd-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyText(btn.dataset.cmd, `已复制: ${btn.dataset.cmd}`);
      });
    });

    container.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.id);
      });
    });

    container.querySelectorAll('.skill-box-card, tbody tr').forEach(row => {
      row.addEventListener('click', () => {
        openModal(row.dataset.id);
      });
      // Keyboard activation for card / row
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(row.dataset.id);
        }
      });
    });
  }

  function resetSearch() {
    activeFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
    renderSkills();
  }

  // 4. Filter Buttons & View Switcher
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderSkills();
    });
  });

  viewSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      renderSkills();
    });
  });

  // 5. Search input & Keyboard Shortcut [/]
  let searchDebounce = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        searchQuery = e.target.value;
        renderSkills();
      }, 120);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !e.target.matches('input, textarea, [contenteditable]')) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        const matrixEl = document.getElementById('skills-matrix');
        if (matrixEl) matrixEl.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'Escape') {
        if (modalOverlay && modalOverlay.classList.contains('open')) {
          closeModal();
        } else if (document.activeElement === searchInput) {
          searchInput.value = '';
          searchQuery = '';
          searchInput.blur();
          renderSkills();
        }
      }
    });
  }

  // 6. Quick Jump Command Pills
  document.querySelectorAll('.cmd-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const skillName = pill.dataset.skill;
      if (!skillName) return;

      const matrixEl = document.getElementById('skills-matrix');
      if (matrixEl) {
        matrixEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => openModal(skillName), 400);
      }
    });
  });

  document.querySelectorAll('.solution-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const skillName = chip.dataset.skill;
      if (skillName) openModal(skillName);
    });
  });

  // 7. Interactive Setup Steps (click & keyboard)
  document.querySelectorAll('.setup-step-box').forEach(box => {
    function toggleStep() {
      box.classList.toggle('completed');
      const numEl = box.querySelector('.setup-step-number');
      const isDone = box.classList.contains('completed');
      box.setAttribute('aria-pressed', String(isDone));
      if (isDone) {
        if (numEl) numEl.innerHTML = '✓ COMPLETED';
        box.style.borderColor = 'var(--accent-emerald-border)';
        box.style.background = 'var(--accent-emerald-subtle)';
      } else {
        const orig = box.dataset.step || 'STEP';
        if (numEl) numEl.innerHTML = orig;
        box.style.borderColor = '';
        box.style.background = '';
      }
    }
    box.addEventListener('click', toggleStep);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep();
      }
    });
  });

  // 8. Drawer / Modal with focus trap
  const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return modalOverlay.querySelectorAll(FOCUSABLE);
  }

  function openModal(skillId) {
    const item = skills.find(s => s.id === skillId);
    if (!item || !modalOverlay) return;

    const modalBody = document.getElementById('modal-body-container');
    if (!modalBody) return;

    const isUser = item.type === 'user';
    const typeBadge = isUser ? 'badge-blue' : 'badge-purple';
    const typeLabel = isUser ? '用户调用 (Orchestration · 编排)' : '模型调用 (Discipline · 纪律)';
    const catBadge = item.category === 'engineering' ? 'badge-emerald' : 'badge-amber';
    const catLabel = item.category === 'engineering' ? '工程实践' : '效率工具';

    modalBody.innerHTML = `
      <div class="modal-head-row">
        <h2 id="modal-title" class="modal-title">/${item.name}</h2>
        <div class="modal-badges-row">
          <span class="badge ${catBadge}">${catLabel}</span>
          <span class="badge ${typeBadge}">${typeLabel}</span>
        </div>
      </div>
      <p class="modal-desc">${item.desc}</p>

      <div class="modal-section-box">
        <h4 class="modal-section-title">运作机制与设计初衷</h4>
        <p class="modal-section-body">${item.longDesc}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">执行指令格式</h4>
        <div class="install-command-bar modal-cmd-bar">
          <code>${item.exampleCmd}</code>
          <button class="btn btn-secondary modal-copy-btn" id="modal-copy-btn" type="button">
            复制
          </button>
        </div>
      </div>

      <div class="modal-foot-row">
        <div class="modal-tags-row">
          ${item.tags.map(t => `<span class="kbd">#${t}</span>`).join('')}
        </div>
        <a href="${item.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-github-btn">
          查看 SKILL.md 规范 ↗
        </a>
      </div>
    `;

    const copyBtn = document.getElementById('modal-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyText(item.exampleCmd, `已复制: ${item.exampleCmd}`);
      });
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    lastFocusedEl = document.activeElement;
    const dialogEl = modalOverlay.querySelector('.modal-dialog');
    if (dialogEl) dialogEl.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
  }

  // Focus trap inside modal
  if (modalOverlay) {
    modalOverlay.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !modalOverlay.classList.contains('open')) return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === modalOverlay) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // 9. Clipboard Copy & Toast
  function copyText(text, msg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg || '已成功复制到剪贴板！');
      }).catch(() => fallbackCopy(text, msg));
    } else {
      fallbackCopy(text, msg);
    }
  }

  function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(msg || '已成功复制到剪贴板！');
    } catch (e) {
      showToast('复制失败，请手动选择复制');
    }
    document.body.removeChild(ta);
  }

  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<svg width="15" height="15" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${msg}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // 10. Installation Tabs
  const installTabs = document.querySelectorAll('.install-tab-btn');
  const installPanels = document.querySelectorAll('.install-panel-view');

  installTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      installTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      installPanels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = tab.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.style.display = 'block';
    });
  });

  // Install tab keyboard navigation (left/right arrows)
  const installTabList = document.querySelector('.install-tab-header');
  if (installTabList) {
    installTabList.setAttribute('role', 'tablist');
    installTabs.forEach((tab, idx) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const nextIdx = (idx + dir + installTabs.length) % installTabs.length;
          installTabs[nextIdx].focus();
          installTabs[nextIdx].click();
        }
      });
    });
  }

  // Global trigger buttons for code copy
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSelector = btn.dataset.target;
      const el = document.querySelector(targetSelector);
      if (el) copyText(el.innerText.trim(), '已复制代码到剪贴板！');
    });
  });

  // Terminal tab ARIA sync
  const termTabs = document.querySelectorAll('.term-tab-btn');
  termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      termTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  window.openSkillModal = openModal;
  window.copyText = copyText;

  renderSkills();
});
