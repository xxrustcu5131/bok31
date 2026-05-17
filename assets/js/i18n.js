/* =====================================================
   FlyCheats - i18n (EN + TR)
   ===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'flycheats-lang';

  const I18N = {
    en: {
      // Nav / Header
      'nav.home': 'Home',
      'nav.cs2': 'CS2',
      'nav.rust': 'Rust',
      'nav.valorant': 'Valorant',
      'nav.openMenu': 'Open menu',
      'lang.tooltip': 'Switch language',
      'lang.en': 'EN',
      'lang.tr': 'TR',

      // Hero
      'hero.badge': 'Undetected & Updated',
      'hero.badge.tooltip': 'Frequently updated archive',
      'hero.title.html': 'The finest <span class="grad-text">premium cheats</span><br />now just one click away.',
      'hero.desc': 'A meticulously curated and tested collection of cheat software for Counter-Strike 2, Rust and Valorant. All versions, features and details live in the FlyCheats archive.',
      'hero.stats.cs2.tooltip': 'Active CS2 cheats',
      'hero.stats.rust.tooltip': 'Active Rust cheats',
      'hero.stats.valorant.tooltip': 'Active Valorant cheats',
      'hero.stats.total.tooltip': 'Total cheats in the archive',
      'hero.stats.cs2': 'CS2',
      'hero.stats.rust': 'Rust',
      'hero.stats.valorant': 'Valorant',
      'hero.stats.total': 'Total',
      'hero.cta.explore': 'Explore Cheats',
      'hero.cta.how': 'How It Works',

      // Games section
      'games.title': 'Supported Games',
      'games.desc': 'Elite cheat collections for the biggest competitive titles around.',
      'games.cs2.badge': 'Trending',
      'games.cs2.sub': 'Aimbot, Wallhack, ESP, TriggerBot, Skin Changer and more',
      'games.rust.badge': 'Stable',
      'games.rust.sub': 'No Recoil, ESP, Aimbot, Cave Finder, Loot ESP and more',
      'games.valorant.badge': 'Hot',
      'games.valorant.sub': 'Vanguard Bypass, Aimbot, ESP, Spinbot, Triggerbot and more',
      'games.cheatsSuffix': 'cheats',

      // Features section
      'features.title': 'Why FlyCheats?',
      'features.desc': 'Quality software, a clean process and a constantly maintained archive.',
      'features.undetected.tooltip': 'Every cheat is screened thoroughly',
      'features.undetected.title': 'Undetected',
      'features.undetected.desc': 'All cheats are tested in-house and only undetected builds are published to the archive.',
      'features.updated.tooltip': 'Stay current with every patch',
      'features.updated.title': 'Always Updated',
      'features.updated.desc': 'When a game updates, cheats follow. You will always find the latest builds in our archive.',
      'features.detail.tooltip': 'Every detail on one page',
      'features.detail.title': 'Detailed Info',
      'features.detail.desc': 'Every cheat ships with a full breakdown of features, versions, OS support and more.',
      'features.easy.tooltip': 'Quick and simple download flow',
      'features.easy.title': 'Easy Download',
      'features.easy.desc': 'No complicated steps. Pick a cheat, hit download and you are ready to go in seconds.',

      // How section
      'how.title': 'How It Works',
      'how.desc': 'Three simple steps to get your cheat up and running.',
      'how.step1.title': 'Pick a Cheat',
      'how.step1.desc': 'Browse the archive and choose the cheat that fits your game and playstyle.',
      'how.step2.title': 'Download',
      'how.step2.desc': 'Hit the download button on the detail page and grab the file instantly.',
      'how.step3.title': 'Run It',
      'how.step3.desc': 'Follow the included instructions, launch the loader and jump into the game.',

      // Footer
      'footer.brand.desc': 'A trusted archive of premium game cheats. The software competitive communities trust, all in one place.',
      'footer.games': 'Games',
      'footer.info': 'Information',
      'footer.features': 'Features',
      'footer.how': 'How It Works',
      'footer.contact': 'Contact',
      'footer.copyright': '© 2026 FlyCheats. All rights reserved.',
      'footer.legal': 'This site is provided for informational purposes only. Usage is the sole responsibility of the user.',

      // Breadcrumb / Listing
      'breadcrumb.home': 'Home',
      'listing.stats.cheats': 'Cheats',
      'listing.stats.undetected': 'Undetected',
      'listing.stats.total.tooltip': 'Total cheats',
      'listing.stats.undetected.tooltip': 'Undetected builds',
      'listing.filter.all': 'All',
      'listing.filter.external': 'External',
      'listing.filter.internal': 'Internal',
      'listing.filter.spoofer': 'Spoofer',
      'listing.filter.macro': 'Macros',
      'listing.filter.undetected': 'Undetected',
      'listing.filter.all.tooltip': 'Show every cheat',
      'listing.filter.external.tooltip': 'External cheats only',
      'listing.filter.internal.tooltip': 'Internal cheats only',
      'listing.filter.spoofer.tooltip': 'HWID spoofers only',
      'listing.filter.macro.tooltip': 'Macros only',
      'listing.filter.undetected.tooltip': 'Undetected only',
      'listing.results.one': 'result',
      'listing.results.many': 'results',
      'listing.noResults.title': 'No cheats matched your filters',
      'listing.noResults.desc': 'Try a different keyword or clear the filters.',

      // CS2 page
      'cs2.title': 'Counter-Strike 2 Cheats',
      'cs2.desc': 'Aimbot, Wallhack, ESP, TriggerBot, Bhop, SkinChanger and other premium Counter-Strike 2 cheats and hacks. All builds are tested and kept up to date.',
      'cs2.search': 'Search by cheat name or feature (e.g. aimbot, esp)...',

      // Rust page
      'rust.title': 'Rust Cheats',
      'rust.desc': 'Aimbot, Wallhack, ESP, No Recoil, Loot ESP, Cave Finder and more. Every Rust build is tested for EAC compatibility before joining the archive.',
      'rust.search': 'Search by cheat name or feature (e.g. recoil, esp)...',

      // Valorant page
      'valorant.title': 'Valorant Cheats',
      'valorant.desc': 'Aimbot, Wallhack, ESP, Triggerbot, Spinbot, Vanguard Bypass and more. All Valorant builds pass our internal QA before release.',
      'valorant.search': 'Search by cheat name or feature (e.g. aimbot, esp)...',

      // Card UI
      'card.view': 'View',
      'card.premium': 'Premium',
      'card.placeholder': 'Premium cheat from the FlyCheats archive.',
      'card.views.tooltip': 'Views',
      'card.comments.tooltip': 'Comments',

      // Detail page
      'detail.about': 'About This Cheat',
      'detail.features': 'Features',
      'detail.specs': 'Specifications',
      'detail.howUse': 'How To Use',
      'detail.howUse.s1': 'Download the file using the button on the right.',
      'detail.howUse.s2': 'Disable Windows Defender or add the cheat folder to exclusions.',
      'detail.howUse.s3': 'Extract the archive and launch the loader as administrator.',
      'detail.howUse.s4': 'Once injection completes, start the game and enjoy.',
      'detail.download': 'Download',
      'detail.downloadBtn': 'Download Cheat',
      'detail.downloadFile': 'File',
      'detail.downloadInfo.tooltip': 'Always test in offline mode first',
      'detail.author': 'Author',
      'detail.authorRole': 'FlyCheats Contributor',
      'detail.share': 'Share',
      'detail.share.twitter': 'Share on Twitter',
      'detail.share.discord': 'Share on Discord',
      'detail.share.telegram': 'Share on Telegram',
      'detail.share.copy': 'Copy link',
      'detail.related': 'Related',
      'detail.spec.game': 'Game',
      'detail.spec.category': 'Category',
      'detail.spec.status': 'Status',
      'detail.spec.author': 'Author',
      'detail.spec.views': 'Views',
      'detail.spec.comments': 'Comments',
      'detail.spec.date': 'Date',
      'detail.spec.unknown': 'Unknown',
      'detail.spec.recent': 'Recent',
      'detail.spec.standard': 'Standard',
      'detail.quick.category': 'Category',
      'detail.quick.views': 'Views',
      'detail.quick.comments': 'Comments',
      'detail.quick.author': 'Author',
      'detail.notFound': 'Cheat not found in archive.',
      'detail.notSpecified': 'Cheat not specified.',
      'detail.notFoundShort': 'Cheat not found.',
      'detail.notFoundDesc': 'Return to the home page and pick another cheat.',
      'detail.backHome': 'Back to Home',
      'detail.anonymous': 'Anonymous',
      'detail.longDesc.suffix': 'is one of the most reliable picks in the FlyCheats archive, built with stability and performance in mind. Every build is monitored for anti-cheat updates and refreshed regularly.',
      'detail.longDesc.fallback1': 'is a premium',
      'detail.longDesc.fallback2': 'cheat in the FlyCheats archive, designed for stable performance and a smooth in-game experience. Every build is reviewed and refreshed as anti-cheat systems evolve.',

      // Status labels
      'status.undetected': 'Undetected',
      'status.detected': 'Detected',
      'status.updated': 'Updated',
      'status.new': 'New',

      // Toasts
      'toast.linkCopied': 'Link copied to clipboard.',
      'toast.clipboardError': 'Could not access clipboard.',
      'toast.discordCopy': 'Link copied. Paste it into Discord.',
      'toast.downloadStart': 'Download starting. If nothing happens, the file may not be uploaded yet.',
    },

    tr: {
      // Nav / Header
      'nav.home': 'Ana Sayfa',
      'nav.cs2': 'CS2',
      'nav.rust': 'Rust',
      'nav.valorant': 'Valorant',
      'nav.openMenu': 'Menüyü aç',
      'lang.tooltip': 'Dil değiştir',
      'lang.en': 'EN',
      'lang.tr': 'TR',

      // Hero
      'hero.badge': 'Tespit Edilmez & Güncel',
      'hero.badge.tooltip': 'Sürekli güncellenen arşiv',
      'hero.title.html': 'En iyi <span class="grad-text">premium hilelere</span><br />artık tek tıkla ulaş.',
      'hero.desc': 'Counter-Strike 2, Rust ve Valorant için titizlikle seçilmiş ve test edilmiş hile yazılımları. Tüm sürümler, özellikler ve detaylar FlyCheats arşivinde.',
      'hero.stats.cs2.tooltip': 'Aktif CS2 hileleri',
      'hero.stats.rust.tooltip': 'Aktif Rust hileleri',
      'hero.stats.valorant.tooltip': 'Aktif Valorant hileleri',
      'hero.stats.total.tooltip': 'Arşivdeki toplam hile sayısı',
      'hero.stats.cs2': 'CS2',
      'hero.stats.rust': 'Rust',
      'hero.stats.valorant': 'Valorant',
      'hero.stats.total': 'Toplam',
      'hero.cta.explore': 'Hileleri Keşfet',
      'hero.cta.how': 'Nasıl Çalışır?',

      // Games section
      'games.title': 'Desteklenen Oyunlar',
      'games.desc': 'En büyük rekabetçi oyunlar için seçkin hile koleksiyonu.',
      'games.cs2.badge': 'Trend',
      'games.cs2.sub': 'Aimbot, Duvar Hilesi, ESP, TriggerBot, Skin Changer ve daha fazlası',
      'games.rust.badge': 'Stabil',
      'games.rust.sub': 'No Recoil, ESP, Aimbot, Mağara Bulucu, Loot ESP ve daha fazlası',
      'games.valorant.badge': 'Popüler',
      'games.valorant.sub': 'Vanguard Bypass, Aimbot, ESP, Spinbot, Triggerbot ve daha fazlası',
      'games.cheatsSuffix': 'hile',

      // Features section
      'features.title': 'Neden FlyCheats?',
      'features.desc': 'Kaliteli yazılım, temiz süreç ve sürekli güncellenen arşiv.',
      'features.undetected.tooltip': 'Her hile titizlikle test edilir',
      'features.undetected.title': 'Tespit Edilmez',
      'features.undetected.desc': 'Tüm hileler kendi ekibimizce test edilir, yalnızca tespit edilmeyen sürümler arşive eklenir.',
      'features.updated.tooltip': 'Her güncellemede taze kal',
      'features.updated.title': 'Daima Güncel',
      'features.updated.desc': 'Oyun güncellendiğinde hileler de güncellenir. Arşivimizde her zaman en son sürümleri bulursun.',
      'features.detail.tooltip': 'Her detay tek sayfada',
      'features.detail.title': 'Detaylı Bilgi',
      'features.detail.desc': 'Her hile için tüm özellikler, sürümler, OS desteği ve daha fazlası listelenmiştir.',
      'features.easy.tooltip': 'Hızlı ve sade indirme akışı',
      'features.easy.title': 'Kolay İndirme',
      'features.easy.desc': 'Karmaşık adımlar yok. Hileyi seç, indir butonuna bas ve birkaç saniyede hazır ol.',

      // How section
      'how.title': 'Nasıl Çalışır?',
      'how.desc': 'Hileyi çalıştırmak için üç basit adım.',
      'how.step1.title': 'Hileyi Seç',
      'how.step1.desc': 'Arşivde gez ve oyununa, oyun stiline uygun hileyi seç.',
      'how.step2.title': 'İndir',
      'how.step2.desc': 'Detay sayfasındaki indirme butonuna bas, dosyayı anında al.',
      'how.step3.title': 'Çalıştır',
      'how.step3.desc': 'Birlikte gelen talimatları izle, loader’ı başlat ve oyuna gir.',

      // Footer
      'footer.brand.desc': 'Premium oyun hilelerinin güvenilir arşivi. Rekabetçi toplulukların güvendiği yazılımlar tek bir yerde.',
      'footer.games': 'Oyunlar',
      'footer.info': 'Bilgi',
      'footer.features': 'Özellikler',
      'footer.how': 'Nasıl Çalışır?',
      'footer.contact': 'İletişim',
      'footer.copyright': '© 2026 FlyCheats. Tüm hakları saklıdır.',
      'footer.legal': 'Bu site yalnızca bilgilendirme amaçlıdır. Kullanım tamamen kullanıcının sorumluluğundadır.',

      // Breadcrumb / Listing
      'breadcrumb.home': 'Ana Sayfa',
      'listing.stats.cheats': 'Hile',
      'listing.stats.undetected': 'Tespit Edilmez',
      'listing.stats.total.tooltip': 'Toplam hile',
      'listing.stats.undetected.tooltip': 'Tespit edilmez sürümler',
      'listing.filter.all': 'Tümü',
      'listing.filter.external': 'Harici',
      'listing.filter.internal': 'Dahili',
      'listing.filter.spoofer': 'Spoofer',
      'listing.filter.macro': 'Makrolar',
      'listing.filter.undetected': 'Tespit Edilmez',
      'listing.filter.all.tooltip': 'Tüm hileleri göster',
      'listing.filter.external.tooltip': 'Sadece harici hileler',
      'listing.filter.internal.tooltip': 'Sadece dahili hileler',
      'listing.filter.spoofer.tooltip': 'Sadece HWID spoofer',
      'listing.filter.macro.tooltip': 'Sadece makrolar',
      'listing.filter.undetected.tooltip': 'Sadece tespit edilmeyenler',
      'listing.results.one': 'sonuç',
      'listing.results.many': 'sonuç',
      'listing.noResults.title': 'Filtrelerinize uyan hile bulunamadı',
      'listing.noResults.desc': 'Farklı bir kelime dene ya da filtreyi temizle.',

      // CS2 page
      'cs2.title': 'Counter-Strike 2 Hileleri',
      'cs2.desc': 'Aimbot, Duvar Hilesi, ESP, TriggerBot, Bhop, SkinChanger ve diğer premium Counter-Strike 2 hileleri. Tüm sürümler test edilmiş ve güncel tutulmaktadır.',
      'cs2.search': 'Hile adı veya özelliğe göre ara (örn. aimbot, esp)...',

      // Rust page
      'rust.title': 'Rust Hileleri',
      'rust.desc': 'Aimbot, Duvar Hilesi, ESP, No Recoil, Loot ESP, Mağara Bulucu ve daha fazlası. Her Rust sürümü EAC uyumluluğu için arşive girmeden önce test edilir.',
      'rust.search': 'Hile adı veya özelliğe göre ara (örn. recoil, esp)...',

      // Valorant page
      'valorant.title': 'Valorant Hileleri',
      'valorant.desc': 'Aimbot, Duvar Hilesi, ESP, Triggerbot, Spinbot, Vanguard Bypass ve daha fazlası. Tüm Valorant sürümleri yayın öncesi iç kalite kontrolünden geçer.',
      'valorant.search': 'Hile adı veya özelliğe göre ara (örn. aimbot, esp)...',

      // Card UI
      'card.view': 'Görüntüle',
      'card.premium': 'Premium',
      'card.placeholder': 'FlyCheats arşivinden premium hile.',
      'card.views.tooltip': 'Görüntülenme',
      'card.comments.tooltip': 'Yorum',

      // Detail page
      'detail.about': 'Bu Hile Hakkında',
      'detail.features': 'Özellikler',
      'detail.specs': 'Teknik Bilgiler',
      'detail.howUse': 'Nasıl Kullanılır?',
      'detail.howUse.s1': 'Sağdaki butonu kullanarak dosyayı indir.',
      'detail.howUse.s2': 'Windows Defender’ı devre dışı bırak veya hile klasörünü istisnalara ekle.',
      'detail.howUse.s3': 'Arşivi çıkar ve loader’ı yönetici olarak başlat.',
      'detail.howUse.s4': 'Enjeksiyon tamamlandığında oyunu başlat ve oynamaya başla.',
      'detail.download': 'İndir',
      'detail.downloadBtn': 'Hileyi İndir',
      'detail.downloadFile': 'Dosya',
      'detail.downloadInfo.tooltip': 'Önce offline modda test et',
      'detail.author': 'Yazar',
      'detail.authorRole': 'FlyCheats Katkıda Bulunanı',
      'detail.share': 'Paylaş',
      'detail.share.twitter': 'Twitter’da paylaş',
      'detail.share.discord': 'Discord’da paylaş',
      'detail.share.telegram': 'Telegram’da paylaş',
      'detail.share.copy': 'Linki kopyala',
      'detail.related': 'İlgili',
      'detail.spec.game': 'Oyun',
      'detail.spec.category': 'Kategori',
      'detail.spec.status': 'Durum',
      'detail.spec.author': 'Yazar',
      'detail.spec.views': 'Görüntülenme',
      'detail.spec.comments': 'Yorum',
      'detail.spec.date': 'Tarih',
      'detail.spec.unknown': 'Bilinmiyor',
      'detail.spec.recent': 'Yakın zaman',
      'detail.spec.standard': 'Standart',
      'detail.quick.category': 'Kategori',
      'detail.quick.views': 'Görüntülenme',
      'detail.quick.comments': 'Yorum',
      'detail.quick.author': 'Yazar',
      'detail.notFound': 'Hile arşivde bulunamadı.',
      'detail.notSpecified': 'Hile belirtilmedi.',
      'detail.notFoundShort': 'Hile bulunamadı.',
      'detail.notFoundDesc': 'Ana sayfaya dön ve başka bir hile seç.',
      'detail.backHome': 'Ana Sayfaya Dön',
      'detail.anonymous': 'Anonim',
      'detail.longDesc.suffix': 'FlyCheats arşivindeki en güvenilir seçimlerden biridir, stabilite ve performans odaklı geliştirilmiştir. Her sürüm anti-cheat güncellemeleri için izlenir ve düzenli olarak yenilenir.',
      'detail.longDesc.fallback1': 'arşivinde premium bir',
      'detail.longDesc.fallback2': 'hilesidir; stabil performans ve sorunsuz oyun deneyimi için tasarlanmıştır. Her sürüm anti-cheat sistemleri geliştikçe gözden geçirilir ve yenilenir.',

      // Status labels
      'status.undetected': 'Tespit Edilmez',
      'status.detected': 'Tespit Edildi',
      'status.updated': 'Güncellendi',
      'status.new': 'Yeni',

      // Toasts
      'toast.linkCopied': 'Link panoya kopyalandı.',
      'toast.clipboardError': 'Panoya erişilemedi.',
      'toast.discordCopy': 'Link kopyalandı. Discord’a yapıştırabilirsin.',
      'toast.downloadStart': 'İndirme başlıyor. Bir şey olmadıysa dosya henüz yüklenmemiş olabilir.',
    },
  };

  // -----------------------------------------------------
  // API
  // -----------------------------------------------------

  function detectLang() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored && I18N[stored]) return stored;
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (browserLang.indexOf('tr') === 0) return 'tr';
    return 'en';
  }

  let currentLang = detectLang();

  function t(key) {
    const dict = I18N[currentLang] || I18N.en;
    if (dict[key] != null) return dict[key];
    if (I18N.en[key] != null) return I18N.en[key];
    return key;
  }

  function getLang() { return currentLang; }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    // textContent / innerHTML
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const v = t(key);
      const html = el.hasAttribute('data-i18n-html') || key.endsWith('.html');
      if (html) {
        el.innerHTML = v;
      } else {
        el.textContent = v;
      }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    // tooltip data attr
    document.querySelectorAll('[data-i18n-tooltip]').forEach(function (el) {
      el.setAttribute('data-tooltip', t(el.getAttribute('data-i18n-tooltip')));
    });

    // aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // title attr
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });

    // Toggle UI active state
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === currentLang);
    });

    // Notify listeners (cards / detail page need to re-render dynamic content)
    if (typeof window.FlyCheatsRerender === 'function') {
      window.FlyCheatsRerender();
    }
  }

  function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations();
  }

  // Wire the toggle buttons
  function wireToggle() {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = el.getAttribute('data-lang');
        setLang(lang);
      });
    });
  }

  // Expose API
  window.t = t;
  window.setLang = setLang;
  window.getLang = getLang;
  window.I18N = I18N;

  // Boot
  document.addEventListener('DOMContentLoaded', function () {
    wireToggle();
    applyTranslations();
  });
})();
