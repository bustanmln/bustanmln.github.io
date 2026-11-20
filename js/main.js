/* ==========================================================================
   Bustan Nabiel Maulana — Full-Width Multi-Layer Portfolio Controller (ID/EN)
   - Hash-based Multi-Layer SPA (#home, #experience, #projects, #certificates, #contact)
   - Pixel-Exact Sliding Nav Indicator + Snappy Staggered Reveal + Cursor Spotlight
   - Live ID/EN i18n without reload or layer/modal reset (localStorage persisted)
   - Zero-Flicker In-Place Photo Switching + Fullscreen Lightbox Sync
   - Defensive DOM null guards & full mobile drawer/keyboard/Back-Forward support
   ========================================================================== */

(function () {
  'use strict';

  const I18N = window.PORTFOLIO_I18N;
  if (!I18N || !I18N.ui) return;

  const EXPERIENCES = I18N.experiences || [];
  const PROJECTS = I18N.projects || [];
  const CERTIFICATES = I18N.certificates || [];

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
     Safe DOM & Localization Helpers
     ------------------------------------------------------------------------ */
  const LANG_KEY = 'bustan-lang-preference';
  let currentLang = 'en';

  function onId(id, evt, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(evt, handler);
    return el;
  }

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
    return Object.prototype.hasOwnProperty.call(I18N.ui.en, key) ? I18N.ui.en[key] : key;
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

    // Translate static & dynamic UI in-place WITHOUT changing active layer, scroll, or open modals
    applyStaticTranslations();
    renderExperienceView(false);
    renderProjectsView(false);
    renderCertificatesView();

    const lbModal = document.getElementById('lightbox-modal');
    if (lbModal && lbModal.classList.contains('open')) {
      renderLightboxFrame();
    }

    requestAnimationFrame(updateNavSlider);
  }

  function copyToClipboard(text, btnEl) {
    const done = function () {
      if (!btnEl) return;
      if (btnEl._copyTimer) clearTimeout(btnEl._copyTimer);
      btnEl.innerHTML = ICONS.check + ' <span data-i18n="contact.copied">' + escapeHtml(t('contact.copied')) + '</span>';
      btnEl._copyTimer = setTimeout(function () {
        btnEl.innerHTML = ICONS.copy + ' <span data-i18n="contact.email.copy">' + escapeHtml(t('contact.email.copy')) + '</span>';
        btnEl._copyTimer = null;
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
     Pixel-Exact Sliding Desktop Nav Indicator
     ------------------------------------------------------------------------ */
  function updateNavSlider() {
    const shell = document.getElementById('desktop-nav-shell');
    const slider = document.getElementById('nav-slider');
    if (!shell || !slider) return;
    const activeLink = shell.querySelector('.nav-item.active');
    if (!activeLink || shell.offsetParent === null) {
      slider.style.opacity = '0';
      return;
    }
    const shellRect = shell.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const x = linkRect.left - shellRect.left - shell.clientLeft;
    slider.style.width = linkRect.width + 'px';
    slider.style.transform = 'translate3d(' + x.toFixed(1) + 'px, 0, 0)';
    slider.style.opacity = '1';
  }

  /* ------------------------------------------------------------------------
     Mobile Drawer Helper
     ------------------------------------------------------------------------ */
  function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('mobile-menu-btn');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
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

    // Close any open overlays when navigating between layers
    closeMobileDrawer();
    closeLightbox(false);
    closeCvModal();

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

    window.scrollTo(0, 0);
    requestAnimationFrame(updateNavSlider);
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
     Experience Master-Detail Controller (Zero-Flicker Stage Updates)
     ------------------------------------------------------------------------ */
  const expState = {
    filter: 'all',
    selectedId: EXPERIENCES[0] ? EXPERIENCES[0].id : '',
    photoIdx: 0
  };

  function getFilteredExperiences() {
    if (expState.filter === 'all') return EXPERIENCES;
    return EXPERIENCES.filter(function (e) { return e.track === expState.filter; });
  }

  function updateExpPhotoStage() {
    const active = EXPERIENCES.find(function (e) { return e.id === expState.selectedId; });
    if (!active || !active.photos.length) return;
    const photo = active.photos[expState.photoIdx] || active.photos[0];
    const imgEl = document.getElementById('exp-stage-img');
    const counterEl = document.getElementById('exp-stage-counter');
    const capEl = document.getElementById('exp-stage-cap');
    if (imgEl) {
      imgEl.src = safeUrl(photo.src);
      imgEl.alt = pick(photo.caption);
    }
    if (counterEl) counterEl.textContent = (expState.photoIdx + 1) + ' / ' + active.photos.length;
    if (capEl) capEl.textContent = pick(photo.caption);
    document.querySelectorAll('#exp-detail .thumb-btn').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.getAttribute('data-exp-photo')) === expState.photoIdx);
    });
  }

  function renderExperienceView(animateEnter) {
    const listEl = document.getElementById('exp-directory');
    const detailEl = document.getElementById('exp-detail');
    if (!listEl || !detailEl || !EXPERIENCES.length) return;

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
        '<button type="button" class="dir-card interactive-card' + (isAct ? ' active' : '') + '" data-select-exp="' + e.id + '">' +
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
      '<div class="detail-sheet detail-sheet-wide' + (animateEnter ? ' detail-enter' : '') + '">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-exp-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-exp-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img id="exp-stage-img" src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" data-open-exp-lb="true" />' +
            '<span id="exp-stage-counter" class="stage-counter">' + (expState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-exp-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span id="exp-stage-cap">' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
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
     Projects Bento Overview + Full-Width Blueprint Controller (Zero-Flicker)
     ------------------------------------------------------------------------ */
  const prjState = {
    filter: 'all',
    selectedId: PROJECTS[0] ? PROJECTS[0].id : '',
    photoIdx: 0
  };

  function getFilteredProjects() {
    if (prjState.filter === 'all') return PROJECTS;
    return PROJECTS.filter(function (p) { return p.category === prjState.filter; });
  }

  function updatePrjPhotoStage() {
    const active = PROJECTS.find(function (p) { return p.id === prjState.selectedId; });
    if (!active || !active.photos.length) return;
    const photo = active.photos[prjState.photoIdx] || active.photos[0];
    const imgEl = document.getElementById('prj-stage-img');
    const counterEl = document.getElementById('prj-stage-counter');
    const capEl = document.getElementById('prj-stage-cap');
    if (imgEl) {
      imgEl.src = safeUrl(photo.src);
      imgEl.alt = pick(photo.caption);
    }
    if (counterEl) counterEl.textContent = (prjState.photoIdx + 1) + ' / ' + active.photos.length;
    if (capEl) capEl.textContent = pick(photo.caption);
    document.querySelectorAll('#prj-detail .thumb-btn').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.getAttribute('data-prj-photo')) === prjState.photoIdx);
    });
  }

  function renderProjectsView(animateEnter) {
    const bentoEl = document.getElementById('prj-bento');
    const detailEl = document.getElementById('prj-detail');
    if (!bentoEl || !detailEl || !PROJECTS.length) return;

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

    bentoEl.innerHTML = filtered.map(function (p) {
      const isAct = p.id === active.id;
      return (
        '<button type="button" class="bento-prj-card interactive-card' + (isAct ? ' active' : '') + '" data-select-prj="' + p.id + '">' +
          '<div class="bento-prj-thumb">' +
            '<img src="' + safeAttrUrl(p.photos[0].src) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" />' +
            '<span class="bento-prj-badge">' + p.code + '</span>' +
            '<span class="bento-prj-count">' + p.photos.length + ' ' + escapeHtml(photosWord) + '</span>' +
          '</div>' +
          '<div class="bento-prj-body">' +
            '<span class="bento-prj-cat">' + escapeHtml(pick(p.categoryLabel)) + '</span>' +
            '<h3 class="bento-prj-title">' + escapeHtml(p.title) + '</h3>' +
            '<div class="tag-list" style="margin-top:auto; padding-top:0.35rem;">' +
              p.stack.slice(0, 3).map(function (s) { return '<span class="tag">' + escapeHtml(s) + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    detailEl.innerHTML =
      '<div class="detail-sheet detail-sheet-wide' + (animateEnter ? ' detail-enter' : '') + '">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-prj-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-prj-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img id="prj-stage-img" src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" data-open-prj-lb="true" />' +
            '<span id="prj-stage-counter" class="stage-counter">' + (prjState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-prj-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span id="prj-stage-cap">' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
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
     Interactive Certificates Bento Registry (Featured Banner + 4-Col Grid)
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
    const featuredLabel = t('cert.featured');

    gridEl.innerHTML = list.map(function (c, idx) {
      const title = pick(c.title);
      const issuer = pick(c.issuer);
      const date = pick(c.date);
      const tag = pick(c.tag);
      const desc = pick(c.desc);
      const isFeatured = certFilter === 'all' && idx === 0;

      return (
        '<button type="button" class="cert-card interactive-card' + (isFeatured ? ' featured-cert' : '') + '" data-open-cert-idx="' + idx + '" aria-label="' + escapeHtml(hoverLabel + ': ' + title) + '">' +
          '<div class="cert-frame">' +
            '<img src="' + safeAttrUrl(c.image) + '" alt="' + escapeHtml(title) + '" loading="lazy" />' +
            '<span class="cert-hover-pill">' + escapeHtml(hoverLabel) + '</span>' +
          '</div>' +
          '<div class="cert-body">' +
            '<div class="cert-meta-row">' +
              '<div class="tag-list">' +
                (isFeatured ? '<span class="tag tag-accent">' + escapeHtml(featuredLabel) + '</span>' : '') +
                '<span class="tag">' + escapeHtml(tag) + '</span>' +
              '</div>' +
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
     Unified Interactive Lightbox Modal (Bilingual live refresh & photo sync)
     ------------------------------------------------------------------------ */
  let lbState = {
    mode: 'exp',
    recordId: null,
    items: [],
    index: 0
  };

  function openLightbox(config) {
    const items = config.items || [];
    if (!items.length) return;
    lbState = {
      mode: config.mode || 'exp',
      recordId: config.recordId || null,
      items: items,
      index: Math.max(0, Math.min(config.index || 0, items.length - 1))
    };
    renderLightboxFrame();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox(syncBack) {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Sync active photo index back to Experience/Project stage without flicker
    if (syncBack !== false) {
      if (lbState.mode === 'exp' && lbState.recordId === expState.selectedId) {
        expState.photoIdx = lbState.index;
        updateExpPhotoStage();
      } else if (lbState.mode === 'prj' && lbState.recordId === prjState.selectedId) {
        prjState.photoIdx = lbState.index;
        updatePrjPhotoStage();
      }
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
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    if (lbState.mode === 'certificate') {
      const title = pick(item.title);
      const issuer = pick(item.issuer);
      const date = pick(item.date);
      const tag = pick(item.tag);

      if (kickerEl) kickerEl.textContent = tag + ' · ' + date;
      if (titleEl) titleEl.textContent = title;
      if (imgEl) { imgEl.src = safeUrl(item.image); imgEl.alt = title; }
      if (capEl) capEl.textContent = issuer;
      if (openRawEl) openRawEl.href = safeUrl(item.image);

      if (detailsBox) detailsBox.style.display = 'flex';
      if (detailsMeta) {
        detailsMeta.innerHTML =
          '<span class="tag tag-accent">' + escapeHtml(issuer) + '</span>' +
          '<span class="tag">' + escapeHtml(date) + '</span>' +
          '<span class="tag">ID: ' + escapeHtml(item.credId) + '</span>';
      }
      if (descEl) descEl.textContent = pick(item.desc);
    } else {
      const rec = lbState.mode === 'exp'
        ? EXPERIENCES.find(function (e) { return e.id === lbState.recordId; })
        : PROJECTS.find(function (p) { return p.id === lbState.recordId; });
      const recKicker = rec ? (rec.code + ' · ' + pick(rec.trackLabel || rec.categoryLabel)) : '';
      const recTitle = rec ? pick(rec.role || rec.title) : '';
      const caption = pick(item.caption);

      if (kickerEl) kickerEl.textContent = recKicker;
      if (titleEl) titleEl.textContent = recTitle;
      if (imgEl) { imgEl.src = safeUrl(item.src); imgEl.alt = caption || recTitle; }
      if (capEl) capEl.textContent = caption || '';
      if (openRawEl) openRawEl.href = safeUrl(item.src);
      if (detailsBox) detailsBox.style.display = 'none';
    }

    if (countEl) countEl.textContent = (lbState.index + 1) + ' / ' + lbState.items.length;

    const multi = lbState.items.length > 1;
    if (prevBtn) prevBtn.style.display = multi ? 'grid' : 'none';
    if (nextBtn) nextBtn.style.display = multi ? 'grid' : 'none';

    if (thumbsEl) {
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
  }

  /* ------------------------------------------------------------------------
     CV Summary Modal & Profile JSON Export
     ------------------------------------------------------------------------ */
  function openCvModal() {
    closeMobileDrawer();
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    const m = document.getElementById('cv-modal');
    if (m && m.classList.contains('open')) {
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
     Tactile Desktop Pointer Spotlight & Subtle Grid Parallax (60fps RAF)
     ------------------------------------------------------------------------ */
  function initDesktopMotion() {
    if (prefersReducedMotion || !hasFinePointer) return;

    const gridBg = document.getElementById('tech-grid-bg');
    let rafPending = false;
    let lastEvent = null;

    document.addEventListener('pointermove', function (e) {
      lastEvent = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        rafPending = false;
        if (!lastEvent) return;

        if (gridBg && window.innerWidth >= 1024) {
          const nx = (lastEvent.clientX / window.innerWidth - 0.5) * -14;
          const ny = (lastEvent.clientY / window.innerHeight - 0.5) * -14;
          gridBg.style.setProperty('--grid-x', nx.toFixed(1) + 'px');
          gridBg.style.setProperty('--grid-y', ny.toFixed(1) + 'px');
        }

        const card = lastEvent.target && lastEvent.target.closest ? lastEvent.target.closest('.interactive-card') : null;
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', (lastEvent.clientX - rect.left).toFixed(1) + 'px');
          card.style.setProperty('--my', (lastEvent.clientY - rect.top).toFixed(1) + 'px');
        }
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Bootstrap & Single Delegated Event Architecture (Zero Duplicate Listeners)
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme(), false);
    setLanguage(getStoredLang(), false);
    updateWibClocks();
    setInterval(updateWibClocks, 1000);
    initDesktopMotion();

    navigateTo(resolveViewFromHash(window.location.hash), false);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateNavSlider);
    }
    window.addEventListener('resize', function () {
      requestAnimationFrame(updateNavSlider);
    }, { passive: true });

    window.addEventListener('hashchange', function () {
      navigateTo(resolveViewFromHash(window.location.hash), false);
    });

    // Mobile drawer toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const open = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Single delegated click handler (immune to re-renders & language switches)
    document.addEventListener('click', function (e) {
      // Close mobile drawer when clicking outside it
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        if (!e.target.closest('#mobile-drawer') && !e.target.closest('#mobile-menu-btn')) {
          closeMobileDrawer();
        }
      }

      // Language switcher (Desktop & Mobile)
      const langBtn = e.target.closest('[data-lang-opt]');
      if (langBtn) {
        setLanguage(langBtn.getAttribute('data-lang-opt'), true);
        return;
      }

      // Theme switcher (Desktop & Mobile)
      const themeBtn = e.target.closest('[data-theme-opt]');
      if (themeBtn) {
        applyTheme(themeBtn.getAttribute('data-theme-opt'), true);
        return;
      }

      // Experience filter buttons
      const expFilterBtn = e.target.closest('[data-exp-filter]');
      if (expFilterBtn) {
        expState.filter = expFilterBtn.getAttribute('data-exp-filter');
        expState.photoIdx = 0;
        document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
          b.classList.toggle('active', b === expFilterBtn);
        });
        renderExperienceView(true);
        return;
      }

      // Project filter buttons
      const prjFilterBtn = e.target.closest('[data-prj-filter]');
      if (prjFilterBtn) {
        prjState.filter = prjFilterBtn.getAttribute('data-prj-filter');
        prjState.photoIdx = 0;
        document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
          b.classList.toggle('active', b === prjFilterBtn);
        });
        renderProjectsView(true);
        return;
      }

      // Certificate filter buttons
      const certFilterBtn = e.target.closest('[data-cert-filter]');
      if (certFilterBtn) {
        certFilter = certFilterBtn.getAttribute('data-cert-filter');
        document.querySelectorAll('[data-cert-filter]').forEach(function (b) {
          b.classList.toggle('active', b === certFilterBtn);
        });
        renderCertificatesView();
        return;
      }

      // Multi-layer navigation & highlight jumps
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
          renderExperienceView(false);
        } else if (view === 'projects' && jumpId) {
          prjState.filter = 'all';
          prjState.selectedId = jumpId;
          prjState.photoIdx = 0;
          document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-prj-filter') === 'all');
          });
          renderProjectsView(false);
        }
        navigateTo(view, true);
        return;
      }

      // Experience item select
      const expBtn = e.target.closest('[data-select-exp]');
      if (expBtn) {
        const nextId = expBtn.getAttribute('data-select-exp');
        if (nextId !== expState.selectedId) {
          expState.selectedId = nextId;
          expState.photoIdx = 0;
          renderExperienceView(true);
        }
        return;
      }

      // Experience photo select (in-place, zero flicker)
      const expPhotoBtn = e.target.closest('[data-exp-photo]');
      if (expPhotoBtn) {
        expState.photoIdx = Number(expPhotoBtn.getAttribute('data-exp-photo'));
        updateExpPhotoStage();
        return;
      }

      // Experience photo prev/next (in-place, zero flicker)
      const expStepBtn = e.target.closest('[data-exp-step]');
      if (expStepBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active && active.photos.length) {
          const delta = Number(expStepBtn.getAttribute('data-exp-step'));
          expState.photoIdx = (expState.photoIdx + delta + active.photos.length) % active.photos.length;
          updateExpPhotoStage();
        }
        return;
      }

      // Experience Lightbox open
      const expLbBtn = e.target.closest('[data-open-exp-lb]');
      if (expLbBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active) {
          openLightbox({ mode: 'exp', recordId: active.id, items: active.photos, index: expState.photoIdx });
        }
        return;
      }

      // Project item select
      const prjBtn = e.target.closest('[data-select-prj]');
      if (prjBtn) {
        const nextId = prjBtn.getAttribute('data-select-prj');
        if (nextId !== prjState.selectedId) {
          prjState.selectedId = nextId;
          prjState.photoIdx = 0;
          renderProjectsView(true);
        }
        return;
      }

      // Project photo select (in-place, zero flicker)
      const prjPhotoBtn = e.target.closest('[data-prj-photo]');
      if (prjPhotoBtn) {
        prjState.photoIdx = Number(prjPhotoBtn.getAttribute('data-prj-photo'));
        updatePrjPhotoStage();
        return;
      }

      // Project photo prev/next (in-place, zero flicker)
      const prjStepBtn = e.target.closest('[data-prj-step]');
      if (prjStepBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active && active.photos.length) {
          const delta = Number(prjStepBtn.getAttribute('data-prj-step'));
          prjState.photoIdx = (prjState.photoIdx + delta + active.photos.length) % active.photos.length;
          updatePrjPhotoStage();
        }
        return;
      }

      // Project Lightbox open
      const prjLbBtn = e.target.closest('[data-open-prj-lb]');
      if (prjLbBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active) {
          openLightbox({ mode: 'prj', recordId: active.id, items: active.photos, index: prjState.photoIdx });
        }
        return;
      }

      // Certificate Lightbox open (Next/Prev across active filtered list)
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

      // Lightbox thumbnail jump
      const lbJump = e.target.closest('[data-lb-jump]');
      if (lbJump) {
        lbState.index = Number(lbJump.getAttribute('data-lb-jump'));
        renderLightboxFrame();
        return;
      }

      // Copy email
      const copyBtn = e.target.closest('[data-copy-text]');
      if (copyBtn) {
        copyToClipboard(copyBtn.getAttribute('data-copy-text'), copyBtn);
        return;
      }

      // CV modal open
      if (e.target.closest('[data-open-cv]')) {
        openCvModal();
      }
    });

    // Modal controls (null-safe)
    onId('lb-prev', 'click', function () { stepLightbox(-1); });
    onId('lb-next', 'click', function () { stepLightbox(1); });
    onId('lb-close', 'click', function () { closeLightbox(true); });
    onId('lightbox-modal', 'click', function (e) {
      if (e.target === this) closeLightbox(true);
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

    onId('cv-close', 'click', closeCvModal);
    onId('cv-close-foot', 'click', closeCvModal);
    onId('cv-download-json', 'click', downloadProfileJson);
    onId('cv-modal', 'click', function (e) {
      if (e.target === this) closeCvModal();
    });

    // Global keyboard shortcuts (Escape / ArrowLeft / ArrowRight)
    document.addEventListener('keydown', function (e) {
      const lbModal = document.getElementById('lightbox-modal');
      const cvModal = document.getElementById('cv-modal');
      const lbOpen = lbModal && lbModal.classList.contains('open');
      const cvOpen = cvModal && cvModal.classList.contains('open');
      if (e.key === 'Escape') {
        if (lbOpen) closeLightbox(true);
        if (cvOpen) closeCvModal();
        closeMobileDrawer();
      } else if (lbOpen) {
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
      }
    });
  });
})();
