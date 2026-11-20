/* ==========================================================================
   Bustan Nabiel Maulana — Multi-Layer SPA Portfolio Controller (Bilingual ID/EN)
   - Hash-based SPA View Switching (#home, #experience, #projects, #certificates, #contact)
   - Live ID/EN i18n without reload or layer/modal reset (persistent via localStorage)
   - Interactive Master-Detail Experience & Projects + Multi-Photo Lightbox
   - Interactive Certificates Filter & Next/Prev Lightbox Modal
   - Official Contact Actions with Copy-to-Clipboard
   ========================================================================== */

(function () {
  'use strict';

  const I18N = window.PORTFOLIO_I18N;
  const EXPERIENCES = I18N.experiences;
  const PROJECTS = I18N.projects;
  const CERTIFICATES = I18N.certificates;

  /* ------------------------------------------------------------------------
     Icons (Crisp Inline SVGs — Zero Emoji)
     ------------------------------------------------------------------------ */
  const ICONS = {
    prev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    expand: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
    ext: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
  };

  /* ------------------------------------------------------------------------
     Utility & Localization Helpers
     ------------------------------------------------------------------------ */
  const LANG_KEY = 'bustan-lang-preference';
  let currentLang = 'en';

  function getStoredLang() {
    try {
      const v = localStorage.getItem(LANG_KEY);
      if (v === 'id' || v === 'en') return v;
    } catch (_) {}
    return 'en';
  }

  function t(key) {
    const pack = I18N.ui[currentLang] || I18N.ui.en;
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    return I18N.ui.en[key] || key;
  }

  function pick(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return val[currentLang] !== undefined ? val[currentLang] : (val.en !== undefined ? val.en : '');
    }
    return val;
  }

  function safeUrl(path) {
    return encodeURI(path);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeAttrUrl(path) {
    return escapeHtml(encodeURI(path));
  }

  function applyStaticTranslations() {
    document.documentElement.lang = currentLang;
    document.title = t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });

    document.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
      btn.setAttribute('aria-checked', btn.getAttribute('data-lang-opt') === currentLang ? 'true' : 'false');
    });
  }

  function setLanguage(lang, persist) {
    currentLang = lang === 'id' ? 'id' : 'en';
    if (persist) {
      try { localStorage.setItem(LANG_KEY, currentLang); } catch (_) {}
    }

    // Update all static UI text & <html lang> WITHOUT changing active layer or scroll
    applyStaticTranslations();

    // Re-render dynamic datasets while preserving exact selected items, photo indices & filters
    renderExperienceView();
    renderProjectsView();
    renderCertificatesView();

    // If Lightbox modal is currently open, refresh its localized content in-place
    const lbModal = document.getElementById('lightbox-modal');
    if (lbModal && lbModal.classList.contains('open')) {
      renderLightboxFrame();
    }
  }

  function copyToClipboard(text, btnEl) {
    const done = function () {
      if (!btnEl) return;
      btnEl.innerHTML = ICONS.check + ' <span>' + escapeHtml(t('contact.copied')) + '</span>';
      setTimeout(function () {
        btnEl.innerHTML = ICONS.copy + ' <span data-i18n="contact.email.copy">' + escapeHtml(t('contact.email.copy')) + '</span>';
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text, done);
      });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    cb();
  }

  /* ------------------------------------------------------------------------
     Multi-Layer SPA Router (#home, #experience, #projects, #certificates, #contact)
     ------------------------------------------------------------------------ */
  const VALID_VIEWS = ['home', 'experience', 'projects', 'certificates', 'contact'];

  function resolveViewFromHash(rawHash) {
    const cleaned = (rawHash || '').replace(/^#/, '').trim().toLowerCase();
    if (cleaned === 'about') return 'home';
    return VALID_VIEWS.includes(cleaned) ? cleaned : 'home';
  }

  function navigateTo(viewId, updateHash) {
    const target = VALID_VIEWS.includes(viewId) ? viewId : 'home';

    VALID_VIEWS.forEach(function (v) {
      const layer = document.getElementById('view-' + v);
      if (layer) layer.classList.toggle('active', v === target);
    });

    document.querySelectorAll('[data-nav-view]').forEach(function (el) {
      const isCurrent = el.getAttribute('data-nav-view') === target;
      el.classList.toggle('active', isCurrent);
      if (isCurrent) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });

    if (updateHash !== false && window.location.hash !== '#' + target) {
      window.location.hash = target;
    }

    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('mobile-menu-btn');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ------------------------------------------------------------------------
     Theme Management (Light / Dark / System)
     ------------------------------------------------------------------------ */
  const THEME_KEY = 'bustan-theme-preference';
  const colorQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      if (v === 'light' || v === 'dark' || v === 'system') return v;
    } catch (_) {}
    return 'system';
  }

  function applyTheme(pref, persist) {
    const valid = pref === 'light' || pref === 'dark' || pref === 'system' ? pref : 'system';
    if (persist) {
      try { localStorage.setItem(THEME_KEY, valid); } catch (_) {}
    }
    const resolved = valid === 'dark' ? 'dark' : (valid === 'light' ? 'light' : (colorQuery.matches ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme-mode', valid);
    document.documentElement.setAttribute('data-resolved-theme', resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.setAttribute('aria-checked', btn.getAttribute('data-theme-opt') === valid ? 'true' : 'false');
    });
  }

  if (colorQuery.addEventListener) {
    colorQuery.addEventListener('change', function () {
      if (getStoredTheme() === 'system') applyTheme('system', false);
    });
  }

  /* ------------------------------------------------------------------------
     Experience Master-Detail Controller
     ------------------------------------------------------------------------ */
  const expState = {
    filter: 'all',
    selectedId: EXPERIENCES[0].id,
    photoIdx: 0
  };

  function getFilteredExperiences() {
    if (expState.filter === 'all') return EXPERIENCES;
    return EXPERIENCES.filter(function (e) { return e.track === expState.filter; });
  }

  function renderExperienceView() {
    const listEl = document.getElementById('exp-directory');
    const detailEl = document.getElementById('exp-detail');
    if (!listEl || !detailEl) return;

    const filtered = getFilteredExperiences();
    if (!filtered.some(function (e) { return e.id === expState.selectedId; })) {
      expState.selectedId = filtered[0] ? filtered[0].id : EXPERIENCES[0].id;
      expState.photoIdx = 0;
    }

    const active = filtered.find(function (e) { return e.id === expState.selectedId; }) || filtered[0];
    if (!active) return;

    if (expState.photoIdx >= active.photos.length) expState.photoIdx = 0;
    const currentPhoto = active.photos[expState.photoIdx];
    const photosWord = t('common.photos');

    listEl.innerHTML = filtered.map(function (e) {
      const isAct = e.id === active.id;
      return (
        '<button type="button" class="dir-card' + (isAct ? ' active' : '') + '" data-select-exp="' + e.id + '">' +
          '<div class="dir-thumb"><img src="' + safeAttrUrl(e.photos[0].src) + '" alt="' + escapeHtml(pick(e.role)) + '" loading="lazy" /></div>' +
          '<div class="dir-meta">' +
            '<div class="dir-top"><span class="dir-code">' + e.code + '</span><span>' + escapeHtml(pick(e.period)) + '</span></div>' +
            '<div class="dir-title">' + escapeHtml(pick(e.role)) + '</div>' +
            '<div class="dir-sub">' + escapeHtml(e.org) + ' · ' + e.photos.length + ' ' + escapeHtml(photosWord) + '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    const linksHtml = active.links.map(function (lk) {
      return '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(lk.url) + '" target="_blank" rel="noopener noreferrer"><span>' + escapeHtml(lk.label) + '</span>' + ICONS.ext + '</a>';
    }).join('');

    const bullets = pick(active.bullets);

    detailEl.innerHTML =
      '<div class="detail-sheet">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-exp-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-exp-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" data-open-exp-lb="true" />' +
            '<span class="stage-counter">' + (expState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-exp-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span>' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === expState.photoIdx ? ' active' : '') + '" data-exp-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(pick(p.caption)) + '" loading="lazy" />' +
                '</button>'
              );
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<div class="detail-top-bar">' +
            '<div class="tag-list"><span class="tag tag-accent">' + escapeHtml(pick(active.trackLabel)) + '</span><span class="tag">' + active.code + '</span></div>' +
            '<span class="mono" style="font-size:12px; color:var(--ink-muted); font-weight:600;">' + escapeHtml(pick(active.period)) + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="detail-title">' + escapeHtml(pick(active.role)) + '</h3>' +
            '<p class="detail-org">' + escapeHtml(active.org) + ' <span>· ' + escapeHtml(pick(active.institution)) + '</span></p>' +
          '</div>' +
          '<p class="detail-summary">' + escapeHtml(pick(active.summary)) + '</p>' +
          '<div>' +
            '<span class="datasheet-label">' + escapeHtml(t('exp.scopeHeading')) + '</span>' +
            '<ul class="scope-list">' + bullets.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') + '</ul>' +
          '</div>' +
          '<div class="tag-list">' + active.tags.map(function (tg) { return '<span class="tag">' + escapeHtml(tg) + '</span>'; }).join('') + '</div>' +
          '<div class="detail-footer">' +
            '<button type="button" class="btn btn-primary btn-sm" data-open-exp-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.openGallery')) + ' (' + active.photos.length + ' ' + escapeHtml(photosWord) + ')</span></button>' +
            '<div class="tag-list">' + linksHtml + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     Projects Master-Detail Controller
     ------------------------------------------------------------------------ */
  const prjState = {
    filter: 'all',
    selectedId: PROJECTS[0].id,
    photoIdx: 0
  };

  function getFilteredProjects() {
    if (prjState.filter === 'all') return PROJECTS;
    return PROJECTS.filter(function (p) { return p.category === prjState.filter; });
  }

  function renderProjectsView() {
    const listEl = document.getElementById('prj-directory');
    const detailEl = document.getElementById('prj-detail');
    if (!listEl || !detailEl) return;

    const filtered = getFilteredProjects();
    if (!filtered.some(function (p) { return p.id === prjState.selectedId; })) {
      prjState.selectedId = filtered[0] ? filtered[0].id : PROJECTS[0].id;
      prjState.photoIdx = 0;
    }

    const active = filtered.find(function (p) { return p.id === prjState.selectedId; }) || filtered[0];
    if (!active) return;

    if (prjState.photoIdx >= active.photos.length) prjState.photoIdx = 0;
    const currentPhoto = active.photos[prjState.photoIdx];
    const photosWord = t('common.photos');

    listEl.innerHTML = filtered.map(function (p) {
      const isAct = p.id === active.id;
      return (
        '<button type="button" class="dir-card' + (isAct ? ' active' : '') + '" data-select-prj="' + p.id + '">' +
          '<div class="dir-thumb"><img src="' + safeAttrUrl(p.photos[0].src) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" /></div>' +
          '<div class="dir-meta">' +
            '<div class="dir-top"><span class="dir-code">' + p.code + '</span><span>' + escapeHtml(pick(p.period)) + '</span></div>' +
            '<div class="dir-title">' + escapeHtml(p.title) + '</div>' +
            '<div class="dir-sub">' + escapeHtml(pick(p.categoryLabel)) + ' · ' + p.photos.length + ' ' + escapeHtml(photosWord) + '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    detailEl.innerHTML =
      '<div class="detail-sheet">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-prj-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-prj-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" data-open-prj-lb="true" />' +
            '<span class="stage-counter">' + (prjState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-prj-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span>' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === prjState.photoIdx ? ' active' : '') + '" data-prj-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(pick(p.caption)) + '" loading="lazy" />' +
                '</button>'
              );
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<div class="detail-top-bar">' +
            '<div class="tag-list"><span class="tag tag-accent">' + escapeHtml(pick(active.categoryLabel)) + '</span><span class="tag">' + active.code + '</span></div>' +
            '<span class="mono" style="font-size:12px; color:var(--ink-muted); font-weight:600;">' + escapeHtml(pick(active.period)) + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="detail-title">' + escapeHtml(active.title) + '</h3>' +
            '<p class="detail-summary" style="margin-top:0.5rem;">' + escapeHtml(pick(active.shortDesc)) + '</p>' +
          '</div>' +
          '<div class="metrics-grid">' +
            active.metrics.map(function (m) {
              return '<div class="metric-box"><span class="metric-k">' + escapeHtml(pick(m.label)) + '</span><span class="metric-v">' + escapeHtml(pick(m.value)) + '</span></div>';
            }).join('') +
          '</div>' +
          '<div class="datasheet-grid">' +
            '<div class="datasheet-box"><span class="datasheet-label">' + escapeHtml(t('prj.problemHeading')) + '</span><p>' + escapeHtml(pick(active.problem)) + '</p></div>' +
            '<div class="datasheet-box accent-box"><span class="datasheet-label">' + escapeHtml(t('prj.solutionHeading')) + '</span><p>' + escapeHtml(pick(active.solution)) + '</p></div>' +
          '</div>' +
          '<div>' +
            '<span class="datasheet-label">' + escapeHtml(t('prj.stackHeading')) + '</span>' +
            '<div class="tag-list">' + active.stack.map(function (s) { return '<span class="tag">' + escapeHtml(s) + '</span>'; }).join('') + '</div>' +
          '</div>' +
          '<div class="detail-footer">' +
            '<button type="button" class="btn btn-primary btn-sm" data-open-prj-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.openGallery')) + ' (' + active.photos.length + ' ' + escapeHtml(photosWord) + ')</span></button>' +
            '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(active.repoUrl) + '" target="_blank" rel="noopener noreferrer"><span>' + escapeHtml(t('prj.repo')) + '</span>' + ICONS.ext + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     Interactive Certificates Registry Controller
     ------------------------------------------------------------------------ */
  let certFilter = 'all';

  function getFilteredCertificates() {
    if (certFilter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter(function (c) { return c.category === certFilter; });
  }

  function renderCertificatesView() {
    const gridEl = document.getElementById('certificates-grid');
    if (!gridEl) return;

    const list = getFilteredCertificates();
    const hoverLabel = t('cert.hover');
    const viewLabel = t('cert.view');

    gridEl.innerHTML = list.map(function (c, idx) {
      const title = pick(c.title);
      const issuer = pick(c.issuer);
      const date = pick(c.date);
      const tag = pick(c.tag);
      const desc = pick(c.desc);

      return (
        '<button type="button" class="cert-card" data-open-cert-idx="' + idx + '" aria-label="' + escapeHtml(hoverLabel + ': ' + title) + '">' +
          '<div class="cert-frame">' +
            '<img src="' + safeAttrUrl(c.image) + '" alt="' + escapeHtml(title) + '" loading="lazy" />' +
            '<span class="cert-hover-pill">' + escapeHtml(hoverLabel) + '</span>' +
          '</div>' +
          '<div class="cert-body">' +
            '<div class="cert-meta-row">' +
              '<span class="tag">' + escapeHtml(tag) + '</span>' +
              '<span>' + escapeHtml(date) + '</span>' +
            '</div>' +
            '<h3 class="cert-title">' + escapeHtml(title) + '</h3>' +
            '<p class="cert-issuer">' + escapeHtml(issuer) + '</p>' +
            '<p class="cert-desc">' + escapeHtml(desc) + '</p>' +
            '<div class="cert-foot">' +
              '<span class="cert-id">ID: ' + escapeHtml(c.credId) + '</span>' +
              '<span style="display:inline-flex; align-items:center; gap:4px; color:var(--accent); font-weight:600;">' + escapeHtml(viewLabel) + ' ' + ICONS.expand + '</span>' +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------------
     Unified Interactive Lightbox Modal (Bilingual live refresh supported)
     ------------------------------------------------------------------------ */
  let lbState = {
    mode: 'photo', // 'exp' | 'prj' | 'certificate'
    recordId: null,
    items: [],
    index: 0
  };

  function openLightbox(config) {
    lbState = {
      mode: config.mode || 'exp',
      recordId: config.recordId || null,
      items: config.items || [],
      index: Math.max(0, Math.min(config.index || 0, (config.items || []).length - 1))
    };
    renderLightboxFrame();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function stepLightbox(delta) {
    if (!lbState.items.length) return;
    lbState.index = (lbState.index + delta + lbState.items.length) % lbState.items.length;
    renderLightboxFrame();
  }

  function renderLightboxFrame() {
    const item = lbState.items[lbState.index];
    if (!item) return;

    const kickerEl = document.getElementById('lb-kicker');
    const titleEl = document.getElementById('lb-title');
    const imgEl = document.getElementById('lb-img');
    const capEl = document.getElementById('lb-caption');
    const countEl = document.getElementById('lb-counter');
    const openRawEl = document.getElementById('lb-open-raw');
    const detailsBox = document.getElementById('lb-details-box');
    const detailsMeta = document.getElementById('lb-details-meta');
    const descEl = document.getElementById('lb-desc');
    const thumbsEl = document.getElementById('lb-thumbs');

    if (lbState.mode === 'certificate') {
      const title = pick(item.title);
      const issuer = pick(item.issuer);
      const date = pick(item.date);
      const tag = pick(item.tag);

      kickerEl.textContent = tag + ' · ' + date;
      titleEl.textContent = title;
      imgEl.src = safeUrl(item.image);
      imgEl.alt = title;
      capEl.textContent = issuer;
      openRawEl.href = safeUrl(item.image);

      detailsBox.style.display = 'flex';
      detailsMeta.innerHTML =
        '<span class="tag tag-accent">' + escapeHtml(issuer) + '</span>' +
        '<span class="tag">' + escapeHtml(date) + '</span>' +
        '<span class="tag">ID: ' + escapeHtml(item.credId) + '</span>';
      descEl.textContent = pick(item.desc);
    } else {
      const rec = lbState.mode === 'exp'
        ? EXPERIENCES.find(function (e) { return e.id === lbState.recordId; })
        : PROJECTS.find(function (p) { return p.id === lbState.recordId; });
      const recKicker = rec ? (rec.code + ' · ' + pick(rec.trackLabel || rec.categoryLabel)) : '';
      const recTitle = rec ? pick(rec.role || rec.title) : '';
      const caption = pick(item.caption);

      kickerEl.textContent = recKicker;
      titleEl.textContent = recTitle;
      imgEl.src = safeUrl(item.src);
      imgEl.alt = caption || recTitle;
      capEl.textContent = caption || '';
      openRawEl.href = safeUrl(item.src);
      detailsBox.style.display = 'none';
    }

    countEl.textContent = (lbState.index + 1) + ' / ' + lbState.items.length;

    const multi = lbState.items.length > 1;
    document.getElementById('lb-prev').style.display = multi ? 'grid' : 'none';
    document.getElementById('lb-next').style.display = multi ? 'grid' : 'none';

    if (multi) {
      thumbsEl.style.display = 'flex';
      thumbsEl.innerHTML = lbState.items.map(function (entry, i) {
        const src = lbState.mode === 'certificate' ? entry.image : entry.src;
        const alt = lbState.mode === 'certificate' ? pick(entry.title) : pick(entry.caption);
        return (
          '<button type="button" class="thumb-btn' + (i === lbState.index ? ' active' : '') + '" data-lb-jump="' + i + '" aria-label="Jump to item ' + (i + 1) + '">' +
            '<img src="' + safeAttrUrl(src) + '" alt="' + escapeHtml(alt || '') + '" />' +
          '</button>'
        );
      }).join('');
    } else {
      thumbsEl.style.display = 'none';
      thumbsEl.innerHTML = '';
    }
  }

  /* ------------------------------------------------------------------------
     CV Summary Modal & Profile JSON Export
     ------------------------------------------------------------------------ */
  function openCvModal() {
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function downloadProfileJson() {
    const payload = {
      language: currentLang,
      name: 'Bustan Nabiel Maulana',
      headline: t('meta.title'),
      education: t('contact.avail.instVal'),
      location: 'Bandung & Tuban, Indonesia',
      contact: {
        email: 'bustanmaulana50@gmail.com',
        whatsapp: '+6281216919968',
        linkedin: 'https://linkedin.com/in/bustannabiel',
        github: 'https://github.com/bustanmln',
        instagram: 'https://instagram.com/bustanmln'
      },
      experiences: EXPERIENCES.map(function (e) {
        return { role: pick(e.role), organization: e.org, institution: pick(e.institution), period: pick(e.period), scope: pick(e.bullets) };
      }),
      projects: PROJECTS.map(function (p) {
        return { title: p.title, category: pick(p.categoryLabel), period: pick(p.period), stack: p.stack, summary: pick(p.shortDesc) };
      }),
      certificates: CERTIFICATES.map(function (c) {
        return { title: pick(c.title), issuer: pick(c.issuer), date: pick(c.date), credentialId: c.credId };
      })
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bustan_Nabiel_Maulana_Profile_' + currentLang.toUpperCase() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ------------------------------------------------------------------------
     Live WIB Clock
     ------------------------------------------------------------------------ */
  function updateWibClocks() {
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date()) + ' WIB';
    document.querySelectorAll('[data-wib-clock]').forEach(function (el) {
      el.textContent = formatted;
    });
  }

  /* ------------------------------------------------------------------------
     Bootstrap & Event Delegation
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme(), false);
    setLanguage(getStoredLang(), false);
    updateWibClocks();
    setInterval(updateWibClocks, 1000);

    navigateTo(resolveViewFromHash(window.location.hash), false);

    window.addEventListener('hashchange', function () {
      navigateTo(resolveViewFromHash(window.location.hash), false);
    });

    // Language switcher controls (Desktop & Mobile)
    document.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang-opt'), true);
      });
    });

    // Theme controls
    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme-opt'), true);
      });
    });

    // Mobile drawer toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', function () {
        const open = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Filter buttons — Experience
    document.querySelectorAll('[data-exp-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        expState.filter = btn.getAttribute('data-exp-filter');
        expState.photoIdx = 0;
        document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderExperienceView();
      });
    });

    // Filter buttons — Projects
    document.querySelectorAll('[data-prj-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        prjState.filter = btn.getAttribute('data-prj-filter');
        prjState.photoIdx = 0;
        document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderProjectsView();
      });
    });

    // Filter buttons — Certificates
    document.querySelectorAll('[data-cert-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        certFilter = btn.getAttribute('data-cert-filter');
        document.querySelectorAll('[data-cert-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderCertificatesView();
      });
    });

    // Global delegated clicks
    document.addEventListener('click', function (e) {
      const navLink = e.target.closest('[data-nav-view], [data-jump-view]');
      if (navLink) {
        const view = navLink.getAttribute('data-nav-view') || navLink.getAttribute('data-jump-view');
        const jumpId = navLink.getAttribute('data-jump-id');
        e.preventDefault();
        if (view === 'experience' && jumpId) {
          expState.filter = 'all';
          expState.selectedId = jumpId;
          expState.photoIdx = 0;
          document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-exp-filter') === 'all');
          });
          renderExperienceView();
        } else if (view === 'projects' && jumpId) {
          prjState.filter = 'all';
          prjState.selectedId = jumpId;
          prjState.photoIdx = 0;
          document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-prj-filter') === 'all');
          });
          renderProjectsView();
        }
        navigateTo(view, true);
        return;
      }

      const expBtn = e.target.closest('[data-select-exp]');
      if (expBtn) {
        expState.selectedId = expBtn.getAttribute('data-select-exp');
        expState.photoIdx = 0;
        renderExperienceView();
        return;
      }

      const expPhotoBtn = e.target.closest('[data-exp-photo]');
      if (expPhotoBtn) {
        expState.photoIdx = Number(expPhotoBtn.getAttribute('data-exp-photo'));
        renderExperienceView();
        return;
      }

      const expStepBtn = e.target.closest('[data-exp-step]');
      if (expStepBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active) {
          const delta = Number(expStepBtn.getAttribute('data-exp-step'));
          expState.photoIdx = (expState.photoIdx + delta + active.photos.length) % active.photos.length;
          renderExperienceView();
        }
        return;
      }

      const expLbBtn = e.target.closest('[data-open-exp-lb]');
      if (expLbBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active) {
          openLightbox({
            mode: 'exp',
            recordId: active.id,
            items: active.photos,
            index: expState.photoIdx
          });
        }
        return;
      }

      const prjBtn = e.target.closest('[data-select-prj]');
      if (prjBtn) {
        prjState.selectedId = prjBtn.getAttribute('data-select-prj');
        prjState.photoIdx = 0;
        renderProjectsView();
        return;
      }

      const prjPhotoBtn = e.target.closest('[data-prj-photo]');
      if (prjPhotoBtn) {
        prjState.photoIdx = Number(prjPhotoBtn.getAttribute('data-prj-photo'));
        renderProjectsView();
        return;
      }

      const prjStepBtn = e.target.closest('[data-prj-step]');
      if (prjStepBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active) {
          const delta = Number(prjStepBtn.getAttribute('data-prj-step'));
          prjState.photoIdx = (prjState.photoIdx + delta + active.photos.length) % active.photos.length;
          renderProjectsView();
        }
        return;
      }

      const prjLbBtn = e.target.closest('[data-open-prj-lb]');
      if (prjLbBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active) {
          openLightbox({
            mode: 'prj',
            recordId: active.id,
            items: active.photos,
            index: prjState.photoIdx
          });
        }
        return;
      }

      const certCard = e.target.closest('[data-open-cert-idx]');
      if (certCard) {
        const filtered = getFilteredCertificates();
        openLightbox({
          mode: 'certificate',
          items: filtered,
          index: Number(certCard.getAttribute('data-open-cert-idx'))
        });
        return;
      }

      const lbJump = e.target.closest('[data-lb-jump]');
      if (lbJump) {
        lbState.index = Number(lbJump.getAttribute('data-lb-jump'));
        renderLightboxFrame();
        return;
      }

      const copyBtn = e.target.closest('[data-copy-text]');
      if (copyBtn) {
        copyToClipboard(copyBtn.getAttribute('data-copy-text'), copyBtn);
        return;
      }

      if (e.target.closest('[data-open-cv]')) {
        openCvModal();
      }
    });

    // Lightbox controls & backdrop close
    document.getElementById('lb-prev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lb-next').addEventListener('click', function () { stepLightbox(1); });
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-modal').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

    // Swipe in Lightbox
    let swipeX = 0;
    const lbStage = document.querySelector('.lb-stage');
    if (lbStage) {
      lbStage.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) swipeX = e.touches[0].clientX;
      }, { passive: true });
      lbStage.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1) {
          const diff = swipeX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 45) stepLightbox(diff > 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    // CV Modal controls
    document.getElementById('cv-close').addEventListener('click', closeCvModal);
    document.getElementById('cv-close-foot').addEventListener('click', closeCvModal);
    document.getElementById('cv-download-json').addEventListener('click', downloadProfileJson);
    document.getElementById('cv-modal').addEventListener('click', function (e) {
      if (e.target === this) closeCvModal();
    });

    // Keyboard shortcuts (Esc / Left / Right)
    document.addEventListener('keydown', function (e) {
      const lbOpen = document.getElementById('lightbox-modal').classList.contains('open');
      const cvOpen = document.getElementById('cv-modal').classList.contains('open');
      if (e.key === 'Escape') {
        if (lbOpen) closeLightbox();
        if (cvOpen) closeCvModal();
      } else if (lbOpen) {
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
      }
    });
  });
})();
