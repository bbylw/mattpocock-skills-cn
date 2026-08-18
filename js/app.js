/* ================================================================
   Terminal Brutalism × Editorial — App Logic
   ================================================================ */
(function () {
  'use strict';

  const SKILLS = window.SKILLS_DATA || [];

  /* ── Utilities ── */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.copyText = function (text, toastMsg) {
    const msg = toastMsg || '已复制！';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(msg),
        () => fallbackCopy(text, msg)
      );
    } else {
      fallbackCopy(text, msg);
    }
  };

  function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(msg);
    } catch (e) {
      showToast('复制失败，请手动复制');
    }
    document.body.removeChild(ta);
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const pill = document.createElement('div');
    pill.className = 'toast-pill';
    pill.textContent = msg;
    container.appendChild(pill);
    requestAnimationFrame(() => pill.classList.add('show'));
    setTimeout(() => {
      pill.classList.remove('show');
      setTimeout(() => pill.remove(), 400);
    }, 2400);
  }

  /* ── Header: scroll shadow + mobile menu ── */
  function initHeader() {
    const header = document.querySelector('.site-header');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 8) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMap = {};
    navLinks.forEach((l) => {
      const href = l.getAttribute('href');
      if (href && href.startsWith('#')) navMap[href.slice(1)] = l;
    });

    let scrollTicking = false;
    function updateActiveNav() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        let current = '';
        sections.forEach((sec) => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) current = sec.id;
        });
        navLinks.forEach((l) => l.classList.remove('active'));
        if (current && navMap[current]) navMap[current].classList.add('active');
        scrollTicking = false;
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /* ── Theme toggle ── */
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const root = document.documentElement;

    // Load saved theme
    const saved = localStorage.getItem('mp-theme');
    if (saved) root.setAttribute('data-theme', saved);

    function updateLabel() {
      const isDark = root.getAttribute('data-theme') !== 'light';
      toggle.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
    }
    updateLabel();

    toggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') !== 'light';
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('mp-theme', next);
      updateLabel();
    });
  }

  /* ── Copy triggers ── */
  function initCopyTriggers() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.copy-trigger');
      if (!btn) return;
      const sel = btn.getAttribute('data-target');
      if (!sel) return;
      const targetEl = document.querySelector(sel);
      if (!targetEl) return;
      const text = targetEl.textContent.trim();
      window.copyText(text, '已复制：' + text);
    });
  }

  /* ── Diff showcase ── */
  const DIFF_SCENARIOS = {
    video: {
      title: '// course-video-manager 的 CONTEXT.md 落地效果',
      before: '"当课程里某个章节中的一课被\'实体化\'（即被赋予了文件系统中的某个位置）时，会出问题。"',
      after: '"实体化级联（materialization cascade）出问题了。"',
      beforeNote: '⚠️ Agent 需阅读长篇解释，长会话中极易概念漂移。',
      afterNote: '✅ 命名一致，Agent 导航更精准，思考消耗更少 Token。',
      savings: 80,
    },
    triage: {
      title: '// 工单分派流程的术语统一',
      before: '"这个 issue 是 bug 还是 feature request？如果是 bug 优先级是 P0 还是 P1？要不要加 blocked 标签？"',
      after: '"按 triage 状态机角色流转，自动定级为 P1-bug-ready。"',
      beforeNote: '⚠️ Agent 反复追问相同问题，每次工单处理耗 1200+ Token。',
      afterNote: '✅ 状态机角色驱动，工单一次性分类，Token 消耗降至 280。',
      savings: 76,
    },
    deepening: {
      title: '// 计费系统的深模块收敛',
      before: '"UserBillingWrapper 调 FormatUtils 再调 TokenHelper 再调 BillingCalculator，经过 4 层浅封装才到核心逻辑。"',
      after: '"BillingEngine.process(usage) → 返回 Invoice，一个深接口搞定。"',
      beforeNote: '⚠️ 4 个浅模块对外方法数与实现行数比 1:1.1，极度违反深模块原则。',
      afterNote: '✅ 收敛至深模块 BillingEngine，接口比 1:5.2，可维护性飙升。',
      savings: 68,
    },
  };

  function initDiffShowcase() {
    const tabs = document.querySelectorAll('.diff-tab-btn');
    const titleEl = document.getElementById('diff-scenario-title');
    const beforeEl = document.getElementById('diff-before-text');
    const afterEl = document.getElementById('diff-after-text');
    const beforeNote = document.getElementById('diff-before-note');
    const afterNote = document.getElementById('diff-after-note');
    const gaugeFill = document.getElementById('diff-gauge-fill');
    const gaugeText = document.getElementById('diff-gauge-text');
    const savingsBadge = document.getElementById('diff-savings-badge');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.scenario;
        const data = DIFF_SCENARIOS[key];
        if (!data) return;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        if (titleEl) titleEl.textContent = data.title;
        if (beforeEl) beforeEl.textContent = data.before;
        if (afterEl) afterEl.textContent = data.after;
        if (beforeNote) beforeNote.textContent = data.beforeNote;
        if (afterNote) afterNote.textContent = data.afterNote;
        if (gaugeFill) gaugeFill.style.width = data.savings + '%';
        if (gaugeText) gaugeText.textContent = 'Token 消耗减少 ' + data.savings + '%';
        if (savingsBadge) savingsBadge.textContent = 'Token 节省 ' + data.savings + '%';
      });
    });
  }

  /* ── Install tabs ── */
  function initInstallTabs() {
    const tabs = document.querySelectorAll('.install-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.install-panel-view').forEach((p) => {
          p.style.display = 'none';
        });
        const panel = document.getElementById(target);
        if (panel) panel.style.display = 'block';
      });
    });
  }

  /* ── Setup steps ── */
  function initSetupSteps() {
    const steps = document.querySelectorAll('.setup-step-box');
    steps.forEach((step) => {
      const toggle = () => {
        steps.forEach((s) => {
          if (s !== step) s.classList.remove('completed');
        });
        step.classList.toggle('completed');
      };
      step.addEventListener('click', toggle);
      step.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ── Reveal on scroll ── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ── Skills rendering ── */
  let currentFilter = 'all';
  let currentSearch = '';
  let currentView = 'grid';

  function getFiltered() {
    return SKILLS.filter((s) => {
      if (currentFilter !== 'all') {
        if (currentFilter === 'engineering' || currentFilter === 'productivity') {
          if (s.category !== currentFilter) return false;
        } else if (currentFilter === 'user' || currentFilter === 'model') {
          if (s.type !== currentFilter) return false;
        }
      }
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (s.stageZh || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }

  function skillTypeBadge(type) {
    if (type === 'user') return '<span class="badge badge-blue">用户调用</span>';
    return '<span class="badge badge-amber">模型调用</span>';
  }

  function renderSkillsGrid(list) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    if (list.length === 0) {
      grid.innerHTML =
        '<div class="skills-empty-state"><p class="skills-empty-text">// 没有匹配的技能</p><button class="btn btn-secondary" id="reset-filters-btn">重置筛选</button></div>';
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentFilter = 'all';
          currentSearch = '';
          document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
          const search = document.getElementById('skills-search');
          if (search) search.value = '';
          renderSkills();
        });
      }
      return;
    }
    grid.innerHTML = list
      .map((s, i) => {
        const num = String(i + 1).padStart(2, '0');
        const tagsHTML = s.tags
          .slice(0, 4)
          .map((t) => '<span class="badge">' + escapeHTML(t) + '</span>')
          .join('');
        return (
          '<article class="clean-card skill-box-card" data-skill-id="' +
          escapeHTML(s.id) + '" data-num="SKILL ' + num + '" tabindex="0" role="button">' +
          '<div class="skill-box-top">' +
          '<h3 class="skill-box-name">' + escapeHTML(s.name) + '</h3>' +
          '<div class="skill-box-badges">' + skillTypeBadge(s.type) + '</div>' +
          '</div>' +
          '<p class="skill-box-desc">' + escapeHTML(s.desc) + '</p>' +
          '<div class="skill-box-tags">' + tagsHTML + '</div>' +
          '<div class="skill-box-foot">' +
          '<span class="mono-label">' + escapeHTML(s.stageZh) + '</span>' +
          '<button class="btn-skill-action" type="button">查看详情 →</button>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    grid.querySelectorAll('.skill-box-card').forEach((card) => {
      const open = () => openSkillModal(card.dataset.skillId);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function renderSkillsTable(list) {
    const wrap = document.getElementById('skills-table-wrap');
    if (!wrap) return;
    if (list.length === 0) {
      wrap.innerHTML =
        '<div class="skills-empty-state"><p class="skills-empty-text">// 没有匹配的技能</p></div>';
      return;
    }
    wrap.innerHTML =
      '<table class="skills-dense-table"><thead><tr>' +
      '<th>技能</th><th>类型</th><th>描述</th><th>阶段</th>' +
      '</tr></thead><tbody>' +
      list
        .map((s) => {
          return (
            '<tr class="skill-table-row" data-skill-id="' + escapeHTML(s.id) + '" tabindex="0" role="button">' +
            '<td class="skill-table-name">' + escapeHTML(s.name) + '</td>' +
            '<td>' + skillTypeBadge(s.type) + '</td>' +
            '<td class="skill-table-desc">' + escapeHTML(s.desc) + '</td>' +
            '<td>' + escapeHTML(s.stageZh) + '</td>' +
            '</tr>'
          );
        })
        .join('') +
      '</tbody></table>';

    wrap.querySelectorAll('.skill-table-row').forEach((row) => {
      const open = () => openSkillModal(row.dataset.skillId);
      row.addEventListener('click', open);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function renderSkills() {
    const filtered = getFiltered();
    const countEl = document.getElementById('skills-count');
    if (countEl) {
      countEl.textContent = '// 共 ' + filtered.length + ' / ' + SKILLS.length + ' 个技能';
    }
    if (currentView === 'grid') {
      renderSkillsGrid(filtered);
    } else {
      renderSkillsTable(filtered);
    }
  }

  /* ── Skill modal ── */
  let lastFocused = null;

  function openSkillModal(skillId) {
    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) return;
    const modal = document.getElementById('skill-modal');
    const dialog = document.getElementById('modal-dialog-inner');
    if (!modal || !dialog) return;

    lastFocused = document.activeElement;

    const tagsHTML = skill.tags
      .map((t) => '<span class="badge">' + escapeHTML(t) + '</span>')
      .join('');

    dialog.innerHTML =
      '<button class="modal-close-btn" id="modal-close" type="button" aria-label="关闭">×</button>' +
      '<div class="modal-head-row">' +
      '<h3 id="modal-title" class="modal-title">' + escapeHTML(skill.name) + '</h3>' +
      '<div class="modal-badges-row">' + skillTypeBadge(skill.type) +
      '<span class="badge badge-purple">' + escapeHTML(skill.categoryZh) + '</span></div>' +
      '</div>' +
      '<p class="modal-desc">' + escapeHTML(skill.desc) + '</p>' +
      '<div class="modal-section">' +
      '<div class="modal-section-title">// 详细说明</div>' +
      '<div class="modal-section-body">' + escapeHTML(skill.longDesc) + '</div>' +
      '</div>' +
      '<div class="modal-section-box">' +
      '<div class="modal-section-title">// 调用方式</div>' +
      '<div class="modal-section-body">' +
      '<div class="install-command-bar modal-cmd-bar">' +
      '<code>' + escapeHTML(skill.exampleCmd) + '</code>' +
      '<button class="btn btn-secondary modal-copy-btn copy-trigger" data-target=".modal-cmd-bar code" type="button">复制</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="modal-foot-row">' +
      '<div class="modal-tags-row">' + tagsHTML + '</div>' +
      '<a href="' + escapeHTML(skill.githubUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary modal-github-btn">GitHub 文档 ↗</a>' +
      '</div>';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.focus();

    function onKeydown(e) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
        trapFocus(e, dialog);
      }
    }
    document.addEventListener('keydown', onKeydown);

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused) lastFocused.focus();
    }
  }

  function trapFocus(e, container) {
    const focusables = container.querySelectorAll(
      'button, a, input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* ── Skills controls (filter, search, view switch) ── */
  function initSkillsControls() {
    // Filters
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderSkills();
      });
    });

    // Search
    const search = document.getElementById('skills-search');
    if (search) {
      let searchTimer = null;
      search.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          currentSearch = e.target.value.trim();
          renderSkills();
        }, 150);
      });
    }

    // View switch
    document.querySelectorAll('.view-switch-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-switch-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        const grid = document.getElementById('skills-grid');
        const table = document.getElementById('skills-table-wrap');
        if (currentView === 'grid') {
          if (grid) grid.style.display = '';
          if (table) table.style.display = 'none';
        } else {
          if (grid) grid.style.display = 'none';
          if (table) table.style.display = '';
        }
        renderSkills();
      });
    });

    // Keyboard shortcut: "/" to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const s = document.getElementById('skills-search');
        if (s) {
          e.preventDefault();
          s.focus();
        }
      }
    });
  }

  /* ── Skill chips & command pills ── */
  function initSkillChips() {
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-skill]');
      if (!chip) return;
      const skillId = chip.dataset.skill;
      // Scroll to skills section first
      const skillsSection = document.getElementById('skills-matrix');
      if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openSkillModal(skillId), 500);
    });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initTheme();
    initCopyTriggers();
    initDiffShowcase();
    initInstallTabs();
    initSetupSteps();
    initReveal();
    initSkillsControls();
    initSkillChips();
    renderSkills();
  });
})();
