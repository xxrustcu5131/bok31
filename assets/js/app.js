/* =====================================================
   FlyCheats - Application Logic
   ===================================================== */

(function () {
  'use strict';

  const DATA = window.SITE_DATA || {};
  const t = window.t || function (k) { return k; };

  // -----------------------------------------------------
  // Live view counter (abacus.jasoncameron.dev)
  // -----------------------------------------------------

  const COUNTER_BASE = 'https://abacus.jasoncameron.dev';
  const COUNTER_NS = 'flycheats';
  const HIT_THROTTLE_MS = 30 * 60 * 1000; // 30 minutes per slug per user

  function fmtCount(n) {
    if (n == null) return '0';
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function counterUrl(action, slug) {
    return COUNTER_BASE + '/' + action + '/' + COUNTER_NS + '/' + encodeURIComponent(slug);
  }

  function counterGet(slug) {
    return fetch(counterUrl('get', slug))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && typeof j.value === 'number' ? j.value : null; })
      .catch(function () { return null; });
  }

  function counterHit(slug) {
    return fetch(counterUrl('hit', slug))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && typeof j.value === 'number' ? j.value : null; })
      .catch(function () { return null; });
  }

  function shouldHit(slug) {
    try {
      const last = parseInt(localStorage.getItem('fc-hit-' + slug) || '0', 10);
      if (Date.now() - last < HIT_THROTTLE_MS) return false;
      localStorage.setItem('fc-hit-' + slug, String(Date.now()));
      return true;
    } catch (e) { return true; }
  }

  function updateViewCount(slug, value) {
    document.querySelectorAll('[data-view-slug="' + slug + '"]').forEach(function (el) {
      el.textContent = fmtCount(value);
    });
  }

  // Pull live counts for all view-count elements currently in the DOM
  function refreshViewCounts() {
    const seen = new Set();
    document.querySelectorAll('[data-view-slug]').forEach(function (el) {
      const slug = el.getAttribute('data-view-slug');
      if (!slug || seen.has(slug)) return;
      seen.add(slug);
      counterGet(slug).then(function (v) {
        if (v != null) updateViewCount(slug, v);
      });
    });
  }

  // -----------------------------------------------------
  // Utilities
  // -----------------------------------------------------

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function attr(s) { return esc(s); }
  function param(name) {
    const u = new URLSearchParams(window.location.search);
    return u.get(name) || '';
  }

  // -----------------------------------------------------
  // Game Meta
  // -----------------------------------------------------

  const GAME_META = {
    cs2: {
      label: 'Counter-Strike 2',
      short: 'CS2',
      icon: 'fa-gun',
      hue: '#a4a4ad',
      page: 'cs2.html',
    },
    rust: {
      label: 'Rust',
      short: 'Rust',
      icon: 'fa-hammer',
      hue: '#c19171',
      page: 'rust.html',
    },
    valorant: {
      label: 'Valorant',
      short: 'VAL',
      icon: 'fa-bullseye',
      hue: '#d65151',
      page: 'valorant.html',
    },
  };

  function gameByItem(slug) {
    for (const key of Object.keys(DATA)) {
      if ((DATA[key].items || []).some(it => it.slug === slug)) return key;
    }
    return '';
  }

  // -----------------------------------------------------
  // Feature icons map
  // -----------------------------------------------------

  const FEATURE_ICONS = {
    'Aimbot': 'fa-crosshairs',
    'Wallhack': 'fa-eye',
    'ESP': 'fa-glasses',
    'Triggerbot': 'fa-hand-pointer',
    'No Recoil': 'fa-arrow-down',
    'Bhop': 'fa-arrow-up',
    'Skin Changer': 'fa-palette',
    'HWID Spoofer': 'fa-shuffle',
    'Silent Aim': 'fa-volume-xmark',
    'Radar': 'fa-satellite-dish',
    'Sound ESP': 'fa-volume-high',
    'External': 'fa-arrow-up-right-from-square',
    'Internal': 'fa-microchip',
    'Glow/Chams': 'fa-fire',
    'Macro': 'fa-keyboard',
    'Scripts': 'fa-code',
    'Loader': 'fa-cloud-arrow-down',
    'Crosshair': 'fa-bullseye',
    'Auto Functions': 'fa-bolt',
  };
  function featureIcon(name) { return FEATURE_ICONS[name] || 'fa-check'; }

  // -----------------------------------------------------
  // Toast
  // -----------------------------------------------------

  function toast(msg, type) {
    type = type || 'info';
    const c = $('#toastContainer');
    if (!c) return;
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    const icon = type === 'success' ? 'fa-circle-check'
               : type === 'error' ? 'fa-circle-xmark'
               : type === 'warning' ? 'fa-triangle-exclamation'
               : 'fa-circle-info';
    el.innerHTML = '<i class="fas ' + icon + '"></i><span>' + esc(msg) + '</span>';
    c.appendChild(el);
    setTimeout(function () {
      el.style.animation = 'toastOut 0.3s forwards';
      setTimeout(function () { el.remove(); }, 320);
    }, 3200);
  }

  // -----------------------------------------------------
  // Status badge / card renderer
  // -----------------------------------------------------

  function statusBadgeHtml(status) {
    const map = {
      'undetected': { cls: 'status-undetected', icon: 'fa-shield-halved', key: 'status.undetected' },
      'detected':   { cls: 'status-detected',   icon: 'fa-circle-xmark',  key: 'status.detected' },
      'updated':    { cls: 'status-updated',    icon: 'fa-rotate',        key: 'status.updated' },
      'new':        { cls: 'status-new',        icon: 'fa-bolt',          key: 'status.new' },
    };
    const m = map[status];
    if (!m) return '';
    return '<span class="status-badge ' + m.cls + '"><i class="fas ' + m.icon + '"></i> ' + esc(t(m.key)) + '</span>';
  }

  function cardHtml(item, gameKey) {
    const features = (item.features || []).slice(0, 4);
    const featuresHtml = features.map(function (f) {
      return '<span class="feature-tag"><i class="fas ' + featureIcon(f) + '"></i>' + esc(f) + '</span>';
    }).join('');

    const statusesHtml = (item.statuses || []).map(statusBadgeHtml).join('');
    const cat = item.category || t('detail.spec.standard');

    const detailLink = 'cheat.html?game=' + encodeURIComponent(gameKey) + '&slug=' + encodeURIComponent(item.slug);

    const imgHtml = item.image
      ? '<img loading="lazy" src="' + attr(item.image) + '" alt="' + attr(item.title) + '" onerror="this.parentNode.innerHTML=\'<div class=&quot;cheat-img-fallback&quot;><i class=&quot;fas fa-image&quot;></i></div>\'" />'
      : '<div class="cheat-img-fallback"><i class="fas fa-image"></i></div>';

    return (
      '<article class="cheat-card">' +
        '<a href="' + detailLink + '" class="cheat-card-link" aria-label="' + attr(item.title) + '"></a>' +
        '<div class="cheat-image">' +
          imgHtml +
          '<div class="cheat-badges">' + statusesHtml + '</div>' +
          '<span class="cheat-category">' + esc(cat) + '</span>' +
        '</div>' +
        '<div class="cheat-body">' +
          '<h3 class="cheat-title">' + esc(item.title) + '</h3>' +
          '<p class="cheat-desc">' + esc(item.description || t('card.placeholder')) + '</p>' +
          '<div class="cheat-features">' + (featuresHtml || '<span class="feature-tag"><i class="fas fa-circle-check"></i>' + esc(t('card.premium')) + '</span>') + '</div>' +
          '<div class="cheat-footer">' +
            '<div class="cheat-meta">' +
              '<span data-tooltip="' + attr(t('card.views.tooltip')) + '"><i class="fas fa-eye"></i><span data-view-slug="' + attr(item.slug) + '">0</span></span>' +
            '</div>' +
            '<span class="cheat-action">' + esc(t('card.view')) + ' <i class="fas fa-arrow-right"></i></span>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  // -----------------------------------------------------
  // Animate counters
  // -----------------------------------------------------

  function animateNumber(el, target) {
    const dur = 1000;
    const start = 0;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (target - start) * eased);
      el.textContent = v;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // -----------------------------------------------------
  // Home page
  // -----------------------------------------------------

  function renderHomeCounts(animate) {
    const counts = {
      cs2: (DATA.cs2 && DATA.cs2.items || []).length,
      rust: (DATA.rust && DATA.rust.items || []).length,
      valorant: (DATA.valorant && DATA.valorant.items || []).length,
    };
    counts.total = counts.cs2 + counts.rust + counts.valorant;

    $$('[data-count]').forEach(function (el) {
      const key = el.getAttribute('data-count');
      const val = counts[key] || 0;
      if (el.classList.contains('game-count')) {
        el.textContent = val + ' ' + t('games.cheatsSuffix');
      } else {
        if (animate) {
          animateNumber(el, val);
        } else {
          el.textContent = val;
        }
      }
    });
  }

  function initHome() {
    renderHomeCounts(true);
  }

  // -----------------------------------------------------
  // Listing page
  // -----------------------------------------------------

  let listingState = {
    items: [],
    filter: 'all',
    query: '',
    gameKey: '',
  };

  function initListing() {
    const game = document.body.getAttribute('data-game');
    if (!game || !DATA[game]) return;

    listingState.gameKey = game;
    listingState.items = DATA[game].items || [];

    const totalEl = $('#totalCount');
    const undetEl = $('#undetectedCount');
    if (totalEl) animateNumber(totalEl, listingState.items.length);
    if (undetEl) animateNumber(undetEl, listingState.items.filter(function (i) { return (i.statuses || []).indexOf('undetected') !== -1; }).length);

    const searchInput = $('#searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        listingState.query = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    $$('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        listingState.filter = btn.getAttribute('data-filter');
        applyFilters();
      });
    });

    applyFilters();
  }

  function applyFilters() {
    const f = listingState.filter;
    const q = listingState.query;

    let items = listingState.items.slice();

    if (f && f !== 'all') {
      if (f === 'undetected') {
        items = items.filter(function (i) { return (i.statuses || []).indexOf('undetected') !== -1; });
      } else {
        items = items.filter(function (i) { return i.category === f || (i.features || []).indexOf(f) !== -1; });
      }
    }

    if (q) {
      items = items.filter(function (i) {
        const blob = (i.title + ' ' + (i.description || '') + ' ' + (i.features || []).join(' ')).toLowerCase();
        return blob.indexOf(q) !== -1;
      });
    }

    renderListing(items);
  }

  function renderListing(items) {
    const grid = $('#cheatsGrid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = (
        '<div class="no-results">' +
          '<i class="fas fa-circle-question"></i>' +
          '<h3>' + esc(t('listing.noResults.title')) + '</h3>' +
          '<p>' + esc(t('listing.noResults.desc')) + '</p>' +
        '</div>'
      );
    } else {
      grid.innerHTML = items.map(function (it) { return cardHtml(it, listingState.gameKey); }).join('');
      refreshViewCounts();
    }

    const countEl = $('#resultsCount');
    if (countEl) {
      const word = items.length === 1 ? t('listing.results.one') : t('listing.results.many');
      countEl.textContent = items.length + ' ' + word;
    }
  }

  // -----------------------------------------------------
  // Detail page
  // -----------------------------------------------------

  let detailState = { item: null, gameKey: '' };

  function initDetail() {
    let gameKey = param('game');
    const slug = param('slug');
    if (!slug) {
      renderDetailError(t('detail.notSpecified'));
      return;
    }
    if (!gameKey || !DATA[gameKey]) {
      gameKey = gameByItem(slug);
    }
    if (!gameKey) {
      renderDetailError(t('detail.notFoundShort'));
      return;
    }

    const item = (DATA[gameKey].items || []).find(function (it) { return it.slug === slug; });
    if (!item) {
      renderDetailError(t('detail.notFound'));
      return;
    }

    detailState.item = item;
    detailState.gameKey = gameKey;

    document.title = item.title + ' - FlyCheats';

    $$('.nav-link[data-nav]').forEach(function (l) {
      if (l.getAttribute('data-nav') === gameKey) l.classList.add('active');
    });

    renderDetail();
  }

  function renderDetailError(msg) {
    const grid = $('#detailGrid');
    if (!grid) return;
    grid.innerHTML = (
      '<div class="no-results" style="grid-column: 1 / -1;">' +
        '<i class="fas fa-circle-exclamation"></i>' +
        '<h3>' + esc(msg) + '</h3>' +
        '<p>' + esc(t('detail.notFoundDesc')) + '</p>' +
        '<a href="index.html" class="btn btn-ghost" style="margin-top:18px;"><i class="fas fa-arrow-left"></i> ' + esc(t('detail.backHome')) + '</a>' +
      '</div>'
    );
  }

  function renderDetail() {
    const item = detailState.item;
    const gameKey = detailState.gameKey;
    if (!item || !gameKey) return;

    const meta = GAME_META[gameKey];
    const statusesHtml = (item.statuses || []).map(statusBadgeHtml).join('');

    // Update breadcrumb
    const bcGame = $('#bcGame');
    const bcTitle = $('#bcTitle');
    if (bcGame) { bcGame.textContent = meta.label; bcGame.href = meta.page; }
    if (bcTitle) bcTitle.textContent = item.title;

    const featuresHtml = (item.features || []).map(function (f) {
      return '<li><i class="fas fa-check"></i> ' + esc(f) + '</li>';
    }).join('');

    const statusList = (item.statuses || []).length
      ? item.statuses.map(function (s) {
          const color = s === 'undetected' ? '#4ade80'
                      : s === 'detected'  ? '#f87171'
                      : s === 'updated'   ? '#60a5fa'
                      : '#facc15';
          return '<i class="fas fa-circle" style="color:' + color + '; font-size: 8px;"></i> ' + esc(t('status.' + s));
        }).join(' &nbsp; ')
      : '<span style="color: var(--c-text-3);">' + esc(t('detail.spec.unknown')) + '</span>';

    const specs = [
      { label: t('detail.spec.game'),     val: '<i class="fas ' + meta.icon + '" style="color:' + meta.hue + ';"></i> ' + esc(meta.label) },
      { label: t('detail.spec.category'), val: esc(item.category || t('detail.spec.standard')) },
      { label: t('detail.spec.status'),   val: statusList },
      { label: t('detail.spec.author'),   val: esc(item.author || t('detail.anonymous')) },
      { label: t('detail.spec.views'),    val: '<i class="fas fa-eye"></i> <span data-view-slug="' + attr(item.slug) + '">0</span>' },
      { label: t('detail.spec.date'),     val: esc(item.date || t('detail.spec.recent')) },
    ];

    const specsHtml = specs.map(function (s) {
      return '<div class="spec-row"><dt>' + esc(s.label) + '</dt><dd>' + s.val + '</dd></div>';
    }).join('');

    const heroImg = item.image
      ? '<img class="detail-hero-img" src="' + attr(item.image) + '" alt="' + attr(item.title) + '" onerror="this.outerHTML=\'<div class=&quot;detail-hero-fallback&quot;><i class=&quot;fas ' + meta.icon + '&quot;></i></div>\'" />'
      : '<div class="detail-hero-fallback"><i class="fas ' + meta.icon + '"></i></div>';

    const cleanDesc = (item.description || '').replace(/\.{3,}$/, '.').replace(/\.\.\.$/, '.');
    const fullDesc = cleanDesc
      ? cleanDesc + ' ' + item.title + ' ' + t('detail.longDesc.suffix')
      : item.title + ' ' + t('detail.longDesc.fallback1') + ' ' + meta.label + ' ' + t('detail.longDesc.fallback2');

    const others = (DATA[gameKey].items || []).filter(function (i) { return i.slug !== item.slug; }).slice(0, 5);
    const relatedHtml = others.map(function (it) {
      const link = 'cheat.html?game=' + encodeURIComponent(gameKey) + '&slug=' + encodeURIComponent(it.slug);
      const img = it.image
        ? '<img class="related-img" src="' + attr(it.image) + '" alt="" onerror="this.outerHTML=\'<div class=&quot;related-img&quot; style=&quot;display:grid;place-items:center;color:var(--c-text-4);&quot;><i class=&quot;fas fa-image&quot;></i></div>\'" />'
        : '<div class="related-img" style="display:grid;place-items:center;color:var(--c-text-4);"><i class="fas fa-image"></i></div>';
      return (
        '<a class="related-item" href="' + link + '">' +
          img +
          '<div class="related-info">' +
            '<div class="related-title">' + esc(it.title) + '</div>' +
            '<div class="related-cat">' + esc(it.category || t('detail.spec.standard')) + '</div>' +
          '</div>' +
        '</a>'
      );
    }).join('');

   const downloadFile = 'https://link.storjshare.io/raw/jxghadxk4fno373h46qvjkyiw2vq/load/load.rar';

    const html = (
      '<div class="detail-main">' +
        '<div class="detail-hero">' +
          heroImg +
          '<div class="detail-hero-overlay">' +
            '<div class="detail-hero-info">' +
              '<div class="detail-hero-badges">' + statusesHtml + '<span class="status-badge" style="color: var(--c-text-1); background: rgba(0,0,0,0.7); border-color: var(--c-border-3);"><i class="fas ' + meta.icon + '" style="color:' + meta.hue + ';"></i> ' + esc(meta.short) + '</span></div>' +
              '<h1 class="detail-title">' + esc(item.title) + '</h1>' +
              '<div class="detail-quick-meta">' +
                '<span data-tooltip="' + attr(t('detail.quick.category')) + '"><i class="fas fa-folder"></i> ' + esc(item.category || t('detail.spec.standard')) + '</span>' +
                '<span data-tooltip="' + attr(t('detail.quick.views')) + '"><i class="fas fa-eye"></i> <span data-view-slug="' + attr(item.slug) + '">0</span></span>' +
                '<span data-tooltip="' + attr(t('detail.quick.author')) + '"><i class="fas fa-user"></i> ' + esc(item.author || t('detail.anonymous')) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="detail-section">' +
          '<h2><i class="fas fa-circle-info"></i> ' + esc(t('detail.about')) + '</h2>' +
          '<p>' + esc(fullDesc) + '</p>' +
        '</div>' +

        (featuresHtml ? (
          '<div class="detail-section">' +
            '<h2><i class="fas fa-list-check"></i> ' + esc(t('detail.features')) + '</h2>' +
            '<ul class="feature-list">' + featuresHtml + '</ul>' +
          '</div>'
        ) : '') +

        '<div class="detail-section">' +
          '<h2><i class="fas fa-microchip"></i> ' + esc(t('detail.specs')) + '</h2>' +
          '<dl class="spec-table">' + specsHtml + '</dl>' +
        '</div>' +

        '<div class="detail-section">' +
          '<h2><i class="fas fa-circle-question"></i> ' + esc(t('detail.howUse')) + '</h2>' +
          '<p><strong style="color: var(--c-text-1);">1.</strong> ' + esc(t('detail.howUse.s1')) + '</p>' +
          '<p><strong style="color: var(--c-text-1);">2.</strong> ' + esc(t('detail.howUse.s2')) + '</p>' +
          '<p><strong style="color: var(--c-text-1);">3.</strong> ' + esc(t('detail.howUse.s3')) + '</p>' +
          '<p><strong style="color: var(--c-text-1);">4.</strong> ' + esc(t('detail.howUse.s4')) + '</p>' +
        '</div>' +
      '</div>' +

      '<aside class="detail-sidebar">' +
        '<div class="sidebar-card download-card">' +
          '<h3><i class="fas fa-cloud-arrow-down"></i> ' + esc(t('detail.download')) + '</h3>' +
          '<button class="btn-download-lg" data-download="' + attr(downloadFile) + '" data-name="' + attr(item.title) + '">' +
            '<i class="fas fa-download"></i> ' + esc(t('detail.downloadBtn')) +
          '</button>' +
          '<div class="download-meta">' +
            '<span>' + esc(t('detail.downloadFile')) + ': <strong>' + esc(item.slug) + '.zip</strong></span>' +
            '<span data-tooltip="' + attr(t('detail.downloadInfo.tooltip')) + '" data-tooltip-pos="left"><i class="fas fa-circle-info"></i></span>' +
          '</div>' +
        '</div>' +

        '<div class="sidebar-card">' +
          '<h3><i class="fas fa-user"></i> ' + esc(t('detail.author')) + '</h3>' +
          '<div class="author-card">' +
            '<div class="author-avatar">' + esc((item.author || 'A').charAt(0).toUpperCase()) + '</div>' +
            '<div>' +
              '<div class="author-name">' + esc(item.author || t('detail.anonymous')) + '</div>' +
              '<div class="author-role">' + esc(t('detail.authorRole')) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="sidebar-card">' +
          '<h3><i class="fas fa-share-nodes"></i> ' + esc(t('detail.share')) + '</h3>' +
          '<div class="share-buttons">' +
            '<a href="#" class="share-btn" data-share="twitter"  data-tooltip="' + attr(t('detail.share.twitter')) + '"><i class="fab fa-twitter"></i></a>' +
            '<a href="#" class="share-btn" data-share="discord"  data-tooltip="' + attr(t('detail.share.discord')) + '"><i class="fab fa-discord"></i></a>' +
            '<a href="#" class="share-btn" data-share="telegram" data-tooltip="' + attr(t('detail.share.telegram')) + '"><i class="fab fa-telegram"></i></a>' +
            '<a href="#" class="share-btn" data-share="copy"     data-tooltip="' + attr(t('detail.share.copy')) + '"><i class="fas fa-link"></i></a>' +
          '</div>' +
        '</div>' +

        (relatedHtml ? (
          '<div class="sidebar-card">' +
            '<h3><i class="fas fa-layer-group"></i> ' + esc(t('detail.related')) + '</h3>' +
            '<div class="related-list">' + relatedHtml + '</div>' +
          '</div>'
        ) : '') +
      '</aside>'
    );

    $('#detailGrid').innerHTML = html;

    // Wire up download button
    const dlBtn = $('[data-download]');
    if (dlBtn) {
      dlBtn.addEventListener('click', function () {
        const url = dlBtn.getAttribute('data-download');
        const name = dlBtn.getAttribute('data-name');
        triggerDownload(url, name);
      });
    }

    // Live view counter: hit (increment) on detail view, otherwise just refresh
    const action = shouldHit(item.slug) ? counterHit : counterGet;
    action(item.slug).then(function (v) {
      if (v != null) updateViewCount(item.slug, v);
    });

    // Wire up share buttons
    $$('[data-share]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        const type = b.getAttribute('data-share');
        const url = window.location.href;
        if (type === 'copy') {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function () {
              toast(t('toast.linkCopied'), 'success');
            });
          } else {
            toast(t('toast.clipboardError'), 'error');
          }
        } else if (type === 'twitter') {
          window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(item.title), '_blank');
        } else if (type === 'telegram') {
          window.open('https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(item.title), '_blank');
        } else if (type === 'discord') {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function () {
              toast(t('toast.discordCopy'), 'success');
            });
          }
        }
      });
    });
  }

  function triggerDownload(url, name) {
    const a = document.createElement('a');
    a.href = url;
    a.download = (name || 'cheat') + '.zip';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast(t('toast.downloadStart'), 'info');
  }

  // -----------------------------------------------------
  // Mobile nav toggle
  // -----------------------------------------------------

  function initNavToggle() {
    const btn = $('.nav-toggle');
    const nav = $('.main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // -----------------------------------------------------
  // i18n re-render hook
  // -----------------------------------------------------

  window.FlyCheatsRerender = function () {
    const page = document.body.getAttribute('data-page');
    if (page === 'home') renderHomeCounts(false);
    else if (page === 'listing') applyFilters();
    else if (page === 'detail') renderDetail();
  };

  // -----------------------------------------------------
  // Boot
  // -----------------------------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    const page = document.body.getAttribute('data-page');
    if (page === 'home') initHome();
    else if (page === 'listing') initListing();
    else if (page === 'detail') initDetail();
  });
})();
