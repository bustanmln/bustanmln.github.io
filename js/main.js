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

  const hydratedViews = {
    home: true,
    experience: false,
    projects: false,
    certificates: false,
    contact: true
  };

  function expTone(track) {
    if (track === 'industrial') return 'amber';
    if (track === 'community') return 'teal';
    return 'cobalt';
  }

  function prjTone(id, category) {
    if (id === 'prj-sipesat') return 'teal';
    if (id === 'prj-iot-power') return 'sky';
    if (id === 'prj-agv') return 'amber';
    return category === 'iot' ? 'teal' : 'cobalt';
  }

  function certTone(category) {
    if (category === 'ai') return 'sky';
    if (category === 'iot') return 'teal';
    return 'amber';
  }

  function ensureViewHydrated(viewId) {
    if (viewId === 'experience' && !hydratedViews.experience) {
      hydratedViews.experience = true;
      renderExperienceView(false);
    } else if (viewId === 'projects' && !hydratedViews.projects) {
      hydratedViews.projects = true;
      renderProjectsView(false);
    } else if (viewId === 'certificates' && !hydratedViews.certificates) {
      hydratedViews.certificates = true;
      renderCertificatesView(false);
    }
  }

  function setLanguage(lang, persist) {
    currentLang = lang === 'id' ? 'id' : 'en';
    if (persist) {
      try { localStorage.setItem(LANG_KEY, currentLang); } catch (_) {}
    }

    // Translate static & already-hydrated dynamic UI in-place WITHOUT decoding hidden galleries
    applyStaticTranslations();
    if (hydratedViews.experience) renderExperienceView(false);
    if (hydratedViews.projects) renderProjectsView(false);
    if (hydratedViews.certificates) renderCertificatesView(false);

    const lbModal = document.getElementById('lightbox-modal');
    if (lbModal && lbModal.classList.contains('open')) {
      renderLightboxFrame();
    }

    requestAnimationFrame(function () {
      updateNavSlider(true);
      updateSwitchGliders(!persist);
      updateActiveFilterGlider(true);
    });
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
     Universal GPU-Only FLIP Gliding Pill Engine (Nav, Filters, Lang & Theme)
     ------------------------------------------------------------------------ */
  const gliderCache = new WeakMap();

  function glidePill(container, glider, activeEl, immediate, setHeight) {
    if (!container || !glider) return;
    if (!activeEl || container.offsetParent === null) {
      glider.style.opacity = '0';
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    const nextX = aRect.left - cRect.left - container.clientLeft;
    const nextY = setHeight ? (aRect.top - cRect.top - container.clientTop) : 0;
    const nextW = Math.max(aRect.width, 1);
    const nextH = Math.max(aRect.height, 1);
    const prev = gliderCache.get(glider);

    container.setAttribute('data-glider-ready', 'true');

    if (prev && !immediate && !prefersReducedMotion && (Math.abs(prev.x - nextX) > 0.5 || Math.abs(prev.y - nextY) > 0.5 || Math.abs(prev.w - nextW) > 0.5)) {
      const ratioX = prev.w / nextW;
      glider.style.transition = 'none';
      glider.style.width = nextW.toFixed(1) + 'px';
      if (setHeight) glider.style.height = nextH.toFixed(1) + 'px';
      glider.style.transform = 'translate3d(' + prev.x.toFixed(1) + 'px, ' + (setHeight ? (prev.y - 4).toFixed(1) : '0') + 'px, 0) scaleX(' + ratioX.toFixed(4) + ')';
      glider.style.opacity = '1';
      void glider.offsetWidth;
      glider.style.transition = '';
      glider.style.transform = 'translate3d(' + nextX.toFixed(1) + 'px, ' + (setHeight ? (nextY - 4).toFixed(1) : '0') + 'px, 0) scaleX(1)';
    } else {
      glider.style.transition = 'none';
      glider.style.width = nextW.toFixed(1) + 'px';
      if (setHeight) glider.style.height = nextH.toFixed(1) + 'px';
      glider.style.transform = 'translate3d(' + nextX.toFixed(1) + 'px, ' + (setHeight ? (nextY - 4).toFixed(1) : '0') + 'px, 0) scaleX(1)';
      glider.style.opacity = '1';
      void glider.offsetWidth;
      glider.style.transition = '';
    }

    gliderCache.set(glider, { x: nextX, y: nextY, w: nextW, h: nextH });
  }

  function updateNavSlider(immediate) {
    const shell = document.getElementById('desktop-nav-shell');
    const slider = document.getElementById('nav-slider');
    if (!shell || !slider) return;
    glidePill(shell, slider, shell.querySelector('.nav-item.active'), immediate, false);
  }

  function updateSwitchGliders(immediate) {
    document.querySelectorAll('.lang-switch, .theme-switch').forEach(function (sw) {
      const glider = sw.querySelector('.pill-glider');
      const active = sw.querySelector('[aria-checked="true"]');
      glidePill(sw, glider, active, immediate, false);
    });
  }

  function updateFilterGliderIn(bar, immediate) {
    if (!bar) return;
    const glider = bar.querySelector('.filter-glider');
    const active = bar.querySelector('.filter-btn.active');
    glidePill(bar, glider, active, immediate, true);
  }

  function updateActiveFilterGlider(immediate) {
    const activeLayer = document.querySelector('.view-layer.active');
    if (!activeLayer) return;
    activeLayer.querySelectorAll('.filter-bar').forEach(function (bar) {
      updateFilterGliderIn(bar, immediate);
    });
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
     Multi-Layer SPA Router with Exit/Enter Choreography & Kinetic Impulse
     ------------------------------------------------------------------------ */
  const VALID_VIEWS = ['home', 'experience', 'projects', 'certificates', 'contact'];
  let activeView = null;
  let navTransitionTimer = null;
  let navToken = 0;

  function resolveViewFromHash(rawHash) {
    const cleaned = (rawHash || '').replace(/^#/, '').trim().toLowerCase();
    if (cleaned === 'about') return 'home';
    return VALID_VIEWS.includes(cleaned) ? cleaned : 'home';
  }

  function applyActiveLayer(target) {
    ensureViewHydrated(target);
    VALID_VIEWS.forEach(function (v) {
      const layer = document.getElementById('view-' + v);
      if (!layer) return;
      layer.classList.remove('leaving');
      layer.classList.toggle('active', v === target);
    });
    activeView = target;
    window.scrollTo(0, 0);
    const targetLayer = document.getElementById('view-' + target);
    if (targetLayer) refreshScrollReveals(targetLayer);
    if (typeof cacheParallaxMetrics === 'function') cacheParallaxMetrics();
    if (typeof scheduleScrollParallaxUpdate === 'function') scheduleScrollParallaxUpdate();
    requestAnimationFrame(function () {
      updateNavSlider(false);
      updateActiveFilterGlider(true);
    });
  }

  function navigateTo(viewId, updateHash) {
    const target = VALID_VIEWS.includes(viewId) ? viewId : 'home';

    // Close any open overlays when navigating between layers
    closeMobileDrawer();
    closeLightbox(false);
    closeCvModal();

    // Update nav indicators & URL hash immediately for crisp 0ms tactile feedback
    document.querySelectorAll('[data-nav-view]').forEach(function (el) {
      const isCurrent = el.getAttribute('data-nav-view') === target;
      el.classList.toggle('active', isCurrent);
      if (isCurrent) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });

    if (updateHash !== false && window.location.hash !== '#' + target) {
      window.location.hash = target;
    }
    requestAnimationFrame(function () { updateNavSlider(false); });

    // Cancel any in-flight exit transition so rapid clicks never desync or hide layers
    if (navTransitionTimer) {
      clearTimeout(navTransitionTimer);
      navTransitionTimer = null;
    }
    const token = ++navToken;

    const prevView = activeView;
    const prevLayer = prevView ? document.getElementById('view-' + prevView) : null;

    // Initial load, same view, or reduced motion -> instant switch
    if (!prevView || prevView === target || !prevLayer || prefersReducedMotion) {
      applyActiveLayer(target);
      return;
    }

    // Send directional phase impulse to the kinetic background canvas
    const prevIdx = VALID_VIEWS.indexOf(prevView);
    const nextIdx = VALID_VIEWS.indexOf(target);
    triggerKineticImpulse(nextIdx >= prevIdx ? 1 : -1);

    // Clean exit animation (155ms), then enter choreography on target layer
    prevLayer.classList.remove('active');
    prevLayer.classList.add('leaving');

    navTransitionTimer = setTimeout(function () {
      navTransitionTimer = null;
      if (token !== navToken) return;
      applyActiveLayer(target);
    }, 155);
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
    return 'light';
  }

  function applyTheme(pref, persist) {
    const valid = pref === 'light' || pref === 'dark' || pref === 'system' ? pref : 'system';
    if (persist) {
      try { localStorage.setItem(THEME_KEY, valid); } catch (_) {}
    }
    const resolved = valid === 'dark' ? 'dark' : (valid === 'light' ? 'light' : (colorQuery.matches ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme-mode', valid);
    document.documentElement.setAttribute('data-resolved-theme', resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.setAttribute('aria-checked', btn.getAttribute('data-theme-opt') === valid ? 'true' : 'false');
    });

    requestAnimationFrame(function () { updateSwitchGliders(!persist); });
    if (typeof syncKineticTheme === 'function') syncKineticTheme();
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

  function swapStageImage(imgEl, nextSrc, nextAlt) {
    if (!imgEl) return;
    if (prefersReducedMotion) {
      imgEl.src = nextSrc;
      imgEl.alt = nextAlt;
      return;
    }
    imgEl.classList.add('stage-img-switching');
    const clear = function () {
      imgEl.classList.remove('stage-img-switching');
    };
    imgEl.onload = clear;
    imgEl.src = nextSrc;
    imgEl.alt = nextAlt;
    if (imgEl.complete) requestAnimationFrame(clear);
    setTimeout(clear, 180);
  }

  function updateExpPhotoStage() {
    const active = EXPERIENCES.find(function (e) { return e.id === expState.selectedId; });
    if (!active || !active.photos.length) return;
    const photo = active.photos[expState.photoIdx] || active.photos[0];
    const imgEl = document.getElementById('exp-stage-img');
    const counterEl = document.getElementById('exp-stage-counter');
    const capEl = document.getElementById('exp-stage-cap');
    swapStageImage(imgEl, safeUrl(photo.src), pick(photo.caption));
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

    listEl.innerHTML = filtered.map(function (e, idx) {
      const isAct = e.id === active.id;
      const cascadeCls = animateEnter ? ' cascade-card' : '';
      const tone = expTone(e.track);
      return (
        '<button type="button" class="dir-card interactive-card' + cascadeCls + (isAct ? ' active' : '') + '" data-tone="' + tone + '" style="--card-i:' + Math.min(idx, 6) + '" data-select-exp="' + e.id + '">' +
          '<div class="dir-thumb"><img src="' + safeAttrUrl(e.photos[0].src) + '" alt="' + escapeHtml(pick(e.role)) + '" loading="lazy" decoding="async" /></div>' +
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
    const activeTone = expTone(active.track);

    detailEl.innerHTML =
      '<div class="detail-sheet detail-sheet-wide' + (animateEnter ? ' detail-enter' : '') + '" data-tone="' + activeTone + '">' +
        '<div class="media-showcase">' +
          '<div class="media-stage parallax-frame" data-scroll-parallax="0.14">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-exp-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-exp-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img id="exp-stage-img" src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" decoding="async" data-open-exp-lb="true" />' +
            '<span id="exp-stage-counter" class="stage-counter">' + (expState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-exp-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span id="exp-stage-cap">' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === expState.photoIdx ? ' active' : '') + '" data-exp-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(pick(p.caption)) + '" loading="lazy" decoding="async" />' +
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

    if (activeView === 'experience' && typeof cacheParallaxMetrics === 'function') {
      cacheParallaxMetrics();
      scheduleScrollParallaxUpdate();
    }
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
    swapStageImage(imgEl, safeUrl(photo.src), pick(photo.caption));
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

    bentoEl.innerHTML = filtered.map(function (p, idx) {
      const isAct = p.id === active.id;
      const cascadeCls = animateEnter ? ' cascade-card' : '';
      const tone = prjTone(p.id, p.category);
      return (
        '<button type="button" class="bento-prj-card black-showcase-card interactive-card' + cascadeCls + (isAct ? ' active' : '') + '" data-tone="' + tone + '" style="--card-i:' + Math.min(idx, 6) + '" data-select-prj="' + p.id + '">' +
          '<div class="bento-prj-thumb parallax-frame" data-scroll-parallax="0.16">' +
            '<img src="' + safeAttrUrl(p.photos[0].src) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" decoding="async" />' +
            '<span class="bento-prj-badge">' + p.code + '</span>' +
            '<span class="bento-prj-count">' + p.photos.length + ' ' + escapeHtml(photosWord) + '</span>' +
          '</div>' +
          '<div class="bento-prj-body">' +
            '<span class="bento-prj-cat">' + escapeHtml(pick(p.categoryLabel)) + '</span>' +
            '<h3 class="bento-prj-title">' + escapeHtml(p.title) + '</h3>' +
            '<div class="tag-list" style="margin-top:auto; padding-top:0.35rem;">' +
              p.stack.slice(0, 3).map(function (s) { return '<span class="tag tag-showcase">' + escapeHtml(s) + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    const activePrjTone = prjTone(active.id, active.category);

    detailEl.innerHTML =
      '<div class="detail-sheet detail-sheet-wide scroll-reveal' + (animateEnter ? ' detail-enter' : '') + '" data-tone="' + activePrjTone + '" style="--reveal-i:0">' +
        '<div class="media-showcase">' +
          '<div class="media-stage parallax-frame" data-scroll-parallax="0.14">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-prj-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-prj-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img id="prj-stage-img" src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(pick(currentPhoto.caption)) + '" decoding="async" data-open-prj-lb="true" />' +
            '<span id="prj-stage-counter" class="stage-counter">' + (prjState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-prj-lb="true">' + ICONS.expand + '<span>' + escapeHtml(t('common.fullscreen')) + '</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span id="prj-stage-cap">' + escapeHtml(pick(currentPhoto.caption)) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === prjState.photoIdx ? ' active' : '') + '" data-prj-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(pick(p.caption)) + '" loading="lazy" decoding="async" />' +
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

    if (activeView === 'projects') {
      refreshScrollReveals(detailEl);
      if (typeof cacheParallaxMetrics === 'function') {
        cacheParallaxMetrics();
        scheduleScrollParallaxUpdate();
      }
    }
  }

  /* ------------------------------------------------------------------------
     Interactive Certificates Bento Registry (Featured Banner + 4-Col Grid)
     ------------------------------------------------------------------------ */
  let certFilter = 'all';

  function getFilteredCertificates() {
    if (certFilter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter(function (c) { return c.category === certFilter; });
  }

  function renderCertificatesView(animateCards) {
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
      const cascadeCls = animateCards ? ' cascade-card' : '';

      const tone = certTone(c.category);

      return (
        '<button type="button" class="cert-card interactive-card scroll-reveal' + cascadeCls + (isFeatured ? ' featured-cert' : '') + '" data-tone="' + tone + '" style="--card-i:' + Math.min(idx, 7) + '; --reveal-i:' + (idx % 4) + '" data-open-cert-idx="' + idx + '" aria-label="' + escapeHtml(hoverLabel + ': ' + title) + '">' +
          '<div class="cert-frame">' +
            '<img src="' + safeAttrUrl(c.image) + '" alt="' + escapeHtml(title) + '" loading="lazy" decoding="async" />' +
            '<span class="cert-hover-pill">' + escapeHtml(hoverLabel) + '</span>' +
          '</div>' +
          '<div class="cert-body">' +
            '<div class="cert-meta-row">' +
              '<div class="tag-list">' +
                (isFeatured ? '<span class="tag tag-accent">' + escapeHtml(featuredLabel) + '</span>' : '') +
                '<span class="tag tag-accent">' + escapeHtml(tag) + '</span>' +
              '</div>' +
              '<span>' + escapeHtml(date) + '</span>' +
            '</div>' +
            '<h3 class="cert-title">' + escapeHtml(title) + '</h3>' +
            '<p class="cert-issuer">' + escapeHtml(issuer) + '</p>' +
            '<p class="cert-desc">' + escapeHtml(desc) + '</p>' +
            '<div class="cert-foot">' +
              '<span class="cert-id">ID: ' + escapeHtml(c.credId) + '</span>' +
              '<span class="cert-view-cta">' + escapeHtml(viewLabel) + ' ' + ICONS.expand + '</span>' +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    if (activeView === 'certificates') refreshScrollReveals(gridEl);
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

  let lbOpener = null;
  let cvOpener = null;

  function openLightbox(config) {
    const items = config.items || [];
    if (!items.length) return;
    lbOpener = document.activeElement;
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
      const closeBtn = document.getElementById('lb-close');
      if (closeBtn) closeBtn.focus();
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
    if (lbOpener && typeof lbOpener.focus === 'function') {
      try { lbOpener.focus(); } catch (_) {}
      lbOpener = null;
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
    cvOpener = document.activeElement;
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const closeBtn = document.getElementById('cv-close');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeCvModal() {
    const m = document.getElementById('cv-modal');
    if (m && m.classList.contains('open')) {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (cvOpener && typeof cvOpener.focus === 'function') {
        try { cvOpener.focus(); } catch (_) {}
        cvOpener = null;
      }
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
     Zero-Idle-CPU Technical Workspace Blueprint Canvas (Chrome 60fps Optimized)
     - Replaces continuous 80,000-arc/sec Canvas2D loop with on-demand static
       high-precision coordinate crosshairs + 3 harmonic signal curves
     - Redraws ONLY on resize, theme switch, or brief damped layer-switch pulse
     - Scrolls purely on GPU compositor via CSS transform (--canvas-scroll-y)
     ------------------------------------------------------------------------ */
  const kineticState = {
    canvas: null,
    ctx: null,
    w: 0,
    h: 0,
    dpr: 1,
    rafId: null,
    pulseProgress: 0,
    pulseDir: 1,
    pulseStartTs: 0,
    isDark: false
  };

  function drawTechnicalBlueprint(pulseT) {
    const ctx = kineticState.ctx;
    const w = kineticState.w;
    const h = kineticState.h;
    if (!ctx || !w || !h) return;

    ctx.clearRect(0, 0, w, h);

    const dark = kineticState.isDark;
    const isMobile = w < 768;
    const cobaltRgb = dark ? '79, 143, 247' : '29, 78, 216';
    const tealRgb = dark ? '45, 212, 191' : '15, 118, 110';
    const amberRgb = dark ? '251, 191, 36' : '180, 83, 9';

    // 1. Three lightweight harmonic signal contours (Cobalt, Teal, Amber)
    const palettes = [cobaltRgb, tealRgb, amberRgb];
    const lineCount = isMobile ? 2 : 3;
    const stepX = isMobile ? 36 : 24;
    const phaseShift = pulseT * kineticState.pulseDir * 1.35;
    ctx.lineWidth = 1;

    for (let li = 0; li < lineCount; li++) {
      const baseY = h * (0.22 + li * 0.28);
      const amp = (isMobile ? 14 : 22) + li * 5;
      const freq = 0.0022 + li * 0.0006;
      ctx.beginPath();
      for (let x = 0; x <= w + stepX; x += stepX) {
        const y = baseY
          + Math.sin(x * freq + li * 1.6 + phaseShift) * amp
          + Math.cos(x * freq * 0.55 - li + phaseShift * 0.6) * (amp * 0.42);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(' + palettes[li] + ', ' + (dark ? 0.13 : 0.095) + ')';
      ctx.stroke();
    }

    // 2. Sparse architectural registration crosshairs at major 192px intersections
    if (!isMobile) {
      const gridStep = 192;
      const arm = 4;
      ctx.strokeStyle = 'rgba(' + cobaltRgb + ', ' + (dark ? 0.2 : 0.14) + ')';
      ctx.beginPath();
      for (let gx = gridStep * 0.5; gx < w; gx += gridStep) {
        for (let gy = gridStep * 0.5; gy < h; gy += gridStep) {
          ctx.moveTo(gx - arm, gy);
          ctx.lineTo(gx + arm, gy);
          ctx.moveTo(gx, gy - arm);
          ctx.lineTo(gx, gy + arm);
        }
      }
      ctx.stroke();
    }

    // 3. Optional brief layer-switch expanding pulse ring (auto-stops in 420ms -> 0% idle CPU)
    if (pulseT > 0.001 && pulseT < 1) {
      const ease = 1 - Math.pow(1 - pulseT, 3);
      const r = 40 + ease * Math.max(w, h) * 0.52;
      const alpha = (1 - ease) * (dark ? 0.22 : 0.16);
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.42, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + cobaltRgb + ', ' + alpha.toFixed(3) + ')';
      ctx.lineWidth = 1.25;
      ctx.stroke();
    }
  }

  function syncKineticTheme() {
    kineticState.isDark = document.documentElement.classList.contains('dark');
    drawTechnicalBlueprint(0);
  }

  function triggerKineticImpulse(direction) {
    if (prefersReducedMotion || !kineticState.ctx) return;
    if (kineticState.rafId) cancelAnimationFrame(kineticState.rafId);
    kineticState.pulseDir = direction >= 0 ? 1 : -1;
    kineticState.pulseStartTs = 0;

    const stepPulse = function (ts) {
      if (!kineticState.pulseStartTs) kineticState.pulseStartTs = ts;
      const p = Math.min((ts - kineticState.pulseStartTs) / 420, 1);
      drawTechnicalBlueprint(p);
      if (p < 1) {
        kineticState.rafId = requestAnimationFrame(stepPulse);
      } else {
        kineticState.rafId = null;
        drawTechnicalBlueprint(0);
      }
    };
    kineticState.rafId = requestAnimationFrame(stepPulse);
  }

  function resizeKineticCanvas() {
    const canvas = kineticState.canvas;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    kineticState.w = w;
    kineticState.h = h;
    kineticState.dpr = dpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    if (kineticState.ctx) {
      kineticState.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawTechnicalBlueprint(0);
    }
  }

  function initKineticBackground() {
    const canvas = document.getElementById('kinetic-bg-canvas');
    if (!canvas || !canvas.getContext) return;
    kineticState.canvas = canvas;
    kineticState.ctx = canvas.getContext('2d');
    kineticState.isDark = document.documentElement.classList.contains('dark');
    resizeKineticCanvas();

    let resizeTimer = null;
    window.addEventListener('resize', function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeKineticCanvas, 100);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Observer-Only Scroll Choreography (Zero Per-Scroll Layout Reads)
     ------------------------------------------------------------------------ */
  let scrollObserver = null;

  function revealElementNow(el) {
    if (!el) return;
    el.classList.remove('reveal-pending');
    el.classList.add('is-revealed');
    if (scrollObserver) scrollObserver.unobserve(el);
  }

  function initScrollReveal() {
    if (prefersReducedMotion || typeof IntersectionObserver !== 'function') return;
    scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) revealElementNow(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  }

  function refreshScrollReveals(container) {
    const scope = container || document;
    const nodes = scope.querySelectorAll('.scroll-reveal');
    if (!nodes.length) return;

    if (prefersReducedMotion || !scrollObserver) {
      nodes.forEach(revealElementNow);
      return;
    }

    const vh = window.innerHeight || 900;
    nodes.forEach(function (el) {
      el.classList.remove('reveal-pending', 'is-revealed');
      const rect = el.getBoundingClientRect();
      if (rect.top > vh * 0.94) {
        el.classList.add('reveal-pending');
        scrollObserver.observe(el);
      } else {
        el.classList.add('is-revealed');
      }
    });
  }

  /* ------------------------------------------------------------------------
     Cached Zero-Layout-Thrash 60fps Scroll Parallax & Unified Pointer Engine
     ------------------------------------------------------------------------ */
  let scrollParallaxRaf = false;
  let cachedDocScrollMax = 0;
  let cachedMosaicItems = [];
  let cachedMediaFrames = [];

  function cacheParallaxMetrics() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    cachedDocScrollMax = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    cachedMosaicItems = [];
    cachedMediaFrames = [];

    const activeLayer = document.querySelector('.view-layer.active');
    if (!activeLayer) return;

    if (activeLayer.id === 'view-home') {
      activeLayer.querySelectorAll('.mosaic-tile[data-parallax-depth]').forEach(function (tile) {
        const inner = tile.querySelector('.mosaic-parallax');
        if (inner) {
          cachedMosaicItems.push({
            inner: inner,
            depth: parseFloat(tile.getAttribute('data-parallax-depth')) || 0
          });
        }
      });
    }

    activeLayer.querySelectorAll('.parallax-frame[data-scroll-parallax]').forEach(function (frame) {
      const img = frame.querySelector('img');
      if (!img) return;
      const rect = frame.getBoundingClientRect();
      cachedMediaFrames.push({
        img: img,
        docTop: rect.top + scrollY,
        height: rect.height || 240,
        factor: parseFloat(frame.getAttribute('data-scroll-parallax')) || 0.14
      });
    });
  }

  function resetAllScrollParallax() {
    const ambientBg = document.getElementById('ambient-canvas-bg');
    const depthGrid = document.getElementById('ambient-depth-grid');
    const bgCanvas = document.getElementById('kinetic-bg-canvas');
    if (ambientBg) ambientBg.style.setProperty('--bg-scroll-y', '0px');
    if (depthGrid) depthGrid.style.setProperty('--grid-scroll-y', '0px');
    if (bgCanvas) bgCanvas.style.setProperty('--canvas-scroll-y', '0px');
    cachedMosaicItems.forEach(function (m) { m.inner.style.setProperty('--sy', '0px'); });
    cachedMediaFrames.forEach(function (f) { f.img.style.setProperty('--media-py', '0px'); });
  }

  function applyScrollParallaxFrame() {
    scrollParallaxRaf = false;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const header = document.querySelector('.site-header');
    if (header) header.classList.toggle('is-scrolled', scrollY > 12);

    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
      const ratio = cachedDocScrollMax > 24 ? Math.max(0, Math.min(1, scrollY / cachedDocScrollMax)) : 0;
      progressBar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }

    const canParallax = !prefersReducedMotion && hasFinePointer && window.innerWidth >= 768;
    if (!canParallax) {
      resetAllScrollParallax();
      return;
    }

    // Multi-layer workspace depth parallax (3 distinct GPU speeds, 0 layout reads)
    const ambientBg = document.getElementById('ambient-canvas-bg');
    if (ambientBg) {
      ambientBg.style.setProperty('--bg-scroll-y', Math.max(-96, Math.min(96, -scrollY * 0.06)).toFixed(1) + 'px');
    }

    const depthGrid = document.getElementById('ambient-depth-grid');
    if (depthGrid) {
      depthGrid.style.setProperty('--grid-scroll-y', (-((scrollY * 0.18) % 96)).toFixed(1) + 'px');
    }

    const bgCanvas = document.getElementById('kinetic-bg-canvas');
    if (bgCanvas) {
      bgCanvas.style.setProperty('--canvas-scroll-y', Math.max(-72, Math.min(72, -scrollY * 0.095)).toFixed(1) + 'px');
    }

    const vh = window.innerHeight || 900;

    if (cachedMosaicItems.length && window.innerWidth >= 1024) {
      const heroProgress = Math.min(scrollY, 720);
      for (let i = 0; i < cachedMosaicItems.length; i++) {
        const m = cachedMosaicItems[i];
        const sy = Math.max(-38, Math.min(38, -heroProgress * 0.062 * m.depth));
        m.inner.style.setProperty('--sy', sy.toFixed(1) + 'px');
      }
    }

    for (let i = 0; i < cachedMediaFrames.length; i++) {
      const f = cachedMediaFrames[i];
      const viewTop = f.docTop - scrollY;
      if (viewTop + f.height < -80 || viewTop > vh + 80) continue;
      const center = viewTop + f.height * 0.5;
      const norm = Math.max(-1, Math.min(1, (center - vh * 0.5) / (vh * 0.65)));
      const shiftY = Math.max(-13, Math.min(13, norm * 26 * f.factor));
      f.img.style.setProperty('--media-py', shiftY.toFixed(1) + 'px');
    }
  }

  function scheduleScrollParallaxUpdate() {
    if (scrollParallaxRaf) return;
    scrollParallaxRaf = true;
    requestAnimationFrame(applyScrollParallaxFrame);
  }

  function initScrollParallax() {
    cacheParallaxMetrics();
    window.addEventListener('scroll', scheduleScrollParallaxUpdate, { passive: true });
    let resizeDebounce = null;
    window.addEventListener('resize', function () {
      if (resizeDebounce) clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(function () {
        cacheParallaxMetrics();
        scheduleScrollParallaxUpdate();
      }, 90);
    }, { passive: true });
    scheduleScrollParallaxUpdate();
  }

  /* ------------------------------------------------------------------------
     Unified Desktop Pointer Loop (Mosaic Depth + Lightweight Card Spotlight)
     - Runs ONLY on pointermove (0% idle CPU), disabled on touch/mobile
     ------------------------------------------------------------------------ */
  function initDesktopMotion() {
    if (prefersReducedMotion || !hasFinePointer) return;

    const homeLayer = document.getElementById('view-home');
    let rafPending = false;
    let pointerX = 0;
    let pointerY = 0;
    let hoveredCard = null;
    let hoveredRect = null;

    function resetMosaicParallax() {
      cachedMosaicItems.forEach(function (m) {
        m.inner.style.setProperty('--px', '0px');
        m.inner.style.setProperty('--py', '0px');
      });
    }

    document.addEventListener('pointerover', function (e) {
      const card = e.target && e.target.closest ? e.target.closest('.interactive-card') : null;
      if (card !== hoveredCard) {
        hoveredCard = card;
        hoveredRect = card ? card.getBoundingClientRect() : null;
      }
    }, { passive: true });

    window.addEventListener('scroll', function () {
      if (hoveredCard) hoveredRect = null;
    }, { passive: true });

    document.addEventListener('pointermove', function (e) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        rafPending = false;

        if (window.innerWidth >= 1024 && homeLayer && homeLayer.classList.contains('active') && cachedMosaicItems.length) {
          const normX = pointerX / window.innerWidth - 0.5;
          const normY = pointerY / window.innerHeight - 0.5;
          for (let i = 0; i < cachedMosaicItems.length; i++) {
            const m = cachedMosaicItems[i];
            m.inner.style.setProperty('--px', (normX * 18 * m.depth).toFixed(1) + 'px');
            m.inner.style.setProperty('--py', (normY * 14 * m.depth).toFixed(1) + 'px');
          }
        }

        if (hoveredCard) {
          if (!hoveredRect) hoveredRect = hoveredCard.getBoundingClientRect();
          hoveredCard.style.setProperty('--mx', (pointerX - hoveredRect.left).toFixed(0) + 'px');
          hoveredCard.style.setProperty('--my', (pointerY - hoveredRect.top).toFixed(0) + 'px');
        }
      });
    }, { passive: true });

    document.addEventListener('pointerleave', resetMosaicParallax, { passive: true });
    window.addEventListener('resize', function () {
      hoveredRect = null;
      if (window.innerWidth < 1024) resetMosaicParallax();
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Bootstrap & Single Delegated Event Architecture (Zero Duplicate Listeners)
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme(), false);
    setLanguage(getStoredLang(), false);
    initScrollReveal();
    initKineticBackground();
    initScrollParallax();
    initDesktopMotion();

    navigateTo(resolveViewFromHash(window.location.hash), false);
    requestAnimationFrame(function () {
      updateSwitchGliders(true);
      updateActiveFilterGlider(true);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        updateNavSlider(true);
        updateSwitchGliders(true);
        updateActiveFilterGlider(true);
        cacheParallaxMetrics();
      });
    }
    window.addEventListener('resize', function () {
      requestAnimationFrame(function () {
        updateNavSlider(true);
        updateSwitchGliders(true);
        updateActiveFilterGlider(true);
      });
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
        if (open) {
          requestAnimationFrame(function () { updateSwitchGliders(true); });
        }
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
        updateFilterGliderIn(expFilterBtn.closest('.filter-bar'), false);
        hydratedViews.experience = true;
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
        updateFilterGliderIn(prjFilterBtn.closest('.filter-bar'), false);
        hydratedViews.projects = true;
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
        updateFilterGliderIn(certFilterBtn.closest('.filter-bar'), false);
        hydratedViews.certificates = true;
        renderCertificatesView(true);
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
          hydratedViews.experience = true;
          renderExperienceView(false);
        } else if (view === 'projects' && jumpId) {
          prjState.filter = 'all';
          prjState.selectedId = jumpId;
          prjState.photoIdx = 0;
          document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-prj-filter') === 'all');
          });
          hydratedViews.projects = true;
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
