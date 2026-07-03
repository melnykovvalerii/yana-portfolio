/* ============================================================
   YANAFIL — motion + interactions
   ============================================================ */
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------- i18n */
  const I18N = {
    en: {
      'nav.work': 'Work', 'nav.expertise': 'Expertise', 'nav.about': 'About',
      'nav.contact': 'Contact', 'nav.cta': 'Let’s talk',
      'hero.available': 'Available for freelance & contract work',
      'hero.title1': 'Data that', 'hero.title2': 'makes decisions', 'hero.title3': 'obvious.',
      'hero.lead': 'I’m Yana — a data visualization & BI designer. I turn messy, raw numbers into executive dashboards, annual reports and market analytics that leaders actually read.',
      'hero.ctaWork': 'View selected work', 'hero.ctaContact': 'Start a project',
      'hero.stat1': 'Selected works', 'hero.stat2': 'Core tools', 'hero.stat3': 'Focus on data',
      'hero.scroll': 'Scroll',
      'work.title': 'Selected&nbsp;Work', 'work.sub': 'Dashboards & reports built to be understood in seconds.',
      'work.view': 'View', 'work.tag.dashboard': 'Dashboard', 'work.tag.infographic': 'Infographic', 'work.tag.analytics': 'Analytics',
      'p0.title': 'Executive Agro Operations Dashboard',
      'p0.short': 'Real-time control of open positions across sunflower, soybean & grain markets.',
      'p1.title': 'Ukraine Agri Export — Annual Report 2025',
      'p1.short': 'A premium annual performance review: KPIs, product mix shift & strategic recommendations.',
      'p2.title': 'Sales Markets Analysis',
      'p2.short': 'Revenue & volume by country and crop, growth zones and price-potential mapping.',
      'p3.title': 'AI Market Growth Analytics',
      'p3.short': 'Automated insights: top markets, gap analysis, price potential & white-space finder.',
      'exp.title': 'What I do', 'exp.sub': 'From raw spreadsheets to boardroom-ready visuals.',
      'exp.1.t': 'Executive Dashboards', 'exp.1.d': 'Interactive Power BI dashboards that turn operations data into one clear source of truth.',
      'exp.2.t': 'Annual & Performance Reports', 'exp.2.d': 'Premium report infographics with strong hierarchy, KPIs and a narrative that reads itself.',
      'exp.3.t': 'Market & Sales Analytics', 'exp.3.d': 'Revenue, volume and growth-zone analysis across markets, crops and product lines.',
      'exp.4.t': 'AI-Powered Insights', 'exp.4.d': 'Python & DAX pipelines that surface gaps, price potential and white-space automatically.',
      'about.title': 'About', 'about.lead': 'I design the layer between <em>data</em> and <em>decisions</em>.',
      'about.p1': 'My name is Yana Filosofova. I specialise in transforming complex, messy datasets into clear visual stories — executive dashboards, annual reports and market analytics that people can read in seconds and act on with confidence.',
      'about.p2': 'I work at the intersection of analytics and design: Power BI and DAX for the logic, Python (pandas, matplotlib) for the heavy lifting, and a strong sense of visual hierarchy for the part that actually convinces stakeholders.',
      'about.stackLabel': 'Toolbox',
      'contact.t1': 'Have data', 'contact.t2': 'worth showing?',
      'contact.sub': 'Tell me about your project — I usually reply within a day.',
      'footer.role': 'Data Visualization Designer', 'footer.top': 'Back to top ↑',
    },
    ua: {
      'nav.work': 'Роботи', 'nav.expertise': 'Послуги', 'nav.about': 'Про мене',
      'nav.contact': 'Контакти', 'nav.cta': 'Обговорити',
      'hero.available': 'Відкрита до фрилансу та контрактної роботи',
      'hero.title1': 'Дані, що роблять', 'hero.title2': 'рішення', 'hero.title3': 'очевидними.',
      'hero.lead': 'Я Яна — дизайнерка візуалізації даних та BI. Перетворюю сирі, розрізнені числа на executive-дашборди, річні звіти й ринкову аналітику, які керівники справді читають.',
      'hero.ctaWork': 'Переглянути роботи', 'hero.ctaContact': 'Почати проєкт',
      'hero.stat1': 'Обрані роботи', 'hero.stat2': 'Ключові інструменти', 'hero.stat3': 'Фокус на даних',
      'hero.scroll': 'Гортати',
      'work.title': 'Обрані&nbsp;роботи', 'work.sub': 'Дашборди та звіти, зрозумілі за секунди.',
      'work.view': 'Дивитись', 'work.tag.dashboard': 'Дашборд', 'work.tag.infographic': 'Інфографіка', 'work.tag.analytics': 'Аналітика',
      'p0.title': 'Executive-дашборд агрооперацій',
      'p0.short': 'Контроль відкритих позицій по соняшнику, соєвих та зернових у реальному часі.',
      'p1.title': 'Аграрний експорт України — Річний звіт 2025',
      'p1.short': 'Преміальний річний огляд: KPI, зсув продуктового міксу та стратегічні рекомендації.',
      'p2.title': 'Аналіз ринків збуту',
      'p2.short': 'Виручка й обсяг по країнах і культурах, зони зростання та потенціал ціни.',
      'p3.title': 'AI-аналітика зростання ринків',
      'p3.short': 'Автоматичні інсайти: топ-ринки, gap-аналіз, потенціал ціни та пошук white-space.',
      'exp.title': 'Що я роблю', 'exp.sub': 'Від сирих таблиць — до візуалів рівня ради директорів.',
      'exp.1.t': 'Executive-дашборди', 'exp.1.d': 'Інтерактивні Power BI дашборди, що перетворюють операційні дані на єдине джерело правди.',
      'exp.2.t': 'Річні звіти та звіти ефективності', 'exp.2.d': 'Преміальна звітна інфографіка з чіткою ієрархією, KPI та наративом, що читається сам.',
      'exp.3.t': 'Ринкова та збутова аналітика', 'exp.3.d': 'Аналіз виручки, обсягу та зон зростання по ринках, культурах і продуктових лініях.',
      'exp.4.t': 'AI-інсайти', 'exp.4.d': 'Пайплайни на Python та DAX, що автоматично виявляють розриви, потенціал ціни й white-space.',
      'about.title': 'Про мене', 'about.lead': 'Я проєктую шар між <em>даними</em> та <em>рішеннями</em>.',
      'about.p1': 'Мене звати Яна Філософова. Спеціалізуюся на перетворенні складних, розрізнених наборів даних на зрозумілі візуальні історії — executive-дашборди, річні звіти та ринкову аналітику, які читаються за секунди й дають упевненість діяти.',
      'about.p2': 'Працюю на перетині аналітики та дизайну: Power BI і DAX — для логіки, Python (pandas, matplotlib) — для важкої обробки, і чітка візуальна ієрархія — для тієї частини, що справді переконує стейкхолдерів.',
      'about.stackLabel': 'Інструменти',
      'contact.t1': 'Є дані, які', 'contact.t2': 'варто показати?',
      'contact.sub': 'Розкажіть про проєкт — зазвичай відповідаю протягом дня.',
      'footer.role': 'Дизайнерка візуалізації даних', 'footer.top': 'Нагору ↑',
    },
  };

  function applyLang(lang) {
    const dict = I18N[lang];
    if (!dict) return;
    document.documentElement.setAttribute('lang', lang === 'ua' ? 'uk' : 'en');
    document.documentElement.setAttribute('data-lang', lang);
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    $$('[data-lang-opt]').forEach(o => o.classList.toggle('is-active', o.getAttribute('data-lang-opt') === lang));
    try { localStorage.setItem('yf-lang', lang); } catch (e) {}
  }

  let curLang = 'ua';
  try { curLang = localStorage.getItem('yf-lang') || 'ua'; } catch (e) {}
  applyLang(curLang);

  $('[data-lang-toggle]')?.addEventListener('click', () => {
    curLang = curLang === 'en' ? 'ua' : 'en';
    applyLang(curLang);
  });

  /* -------------------------------------------------- year */
  $('[data-year]') && ($('[data-year]').textContent = '2026');

  /* -------------------------------------------------- preloader */
  const loader = $('[data-loader]');
  function runLoader(done) {
    if (!loader) return done();
    const bar = $('[data-loader-bar]'), count = $('[data-loader-count]');
    let p = 0;
    const tick = () => {
      p += Math.max(1, (100 - p) * 0.12);
      if (p >= 100) p = 100;
      if (bar) bar.style.width = p + '%';
      if (count) count.textContent = Math.round(p);
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => {
        loader.style.transition = 'opacity .6s ease, visibility .6s';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        done();
      }, 180);
    };
    requestAnimationFrame(tick);
  }

  /* -------------------------------------------------- custom cursor */
  (function cursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = $('.cursor__dot'), ring = $('.cursor__ring');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    loop();
    const hoverSel = '[data-cursor-hover], a, button, .card, [data-magnetic]';
    $$('[data-cursor-view]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
    });
    $$(hoverSel).forEach(el => {
      if (el.matches('[data-cursor-view]')) return;
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  })();

  /* -------------------------------------------------- magnetic */
  function magnetic(el, strength = 0.35) {
    let bx = 0, by = 0, tx = 0, ty = 0, raf;
    const move = e => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const render = () => {
      bx += (tx - bx) * 0.2; by += (ty - by) * 0.2;
      el.style.transform = `translate(${bx}px,${by}px)`;
      if (Math.abs(tx - bx) > 0.1 || Math.abs(ty - by) > 0.1) raf = requestAnimationFrame(render);
      else raf = null;
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(render); });
  }
  if (!prefersReduced && !window.matchMedia('(hover: none)').matches) {
    $$('[data-magnetic]').forEach(el => magnetic(el));
  }

  /* -------------------------------------------------- pointer glow (expertise) */
  $$('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* -------------------------------------------------- nav scroll state */
  const nav = $('[data-nav]');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* -------------------------------------------------- lightbox */
  (function lightbox() {
    const lb = $('[data-lightbox]');
    if (!lb) return;
    const img = $('[data-lb-img]'), title = $('[data-lb-title]'), desc = $('[data-lb-desc]');
    const cards = $$('.card');
    const data = cards.map(c => ({
      src: $('img', c).getAttribute('src'),
      pid: c.getAttribute('data-project'),
    }));
    let idx = 0;
    const open = i => {
      idx = (i + data.length) % data.length;
      const d = data[idx], dict = I18N[curLang];
      img.setAttribute('src', d.src);
      title.textContent = dict[`p${d.pid}.title`] || '';
      desc.textContent = dict[`p${d.pid}.short`] || '';
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    cards.forEach((c, i) => c.addEventListener('click', () => open(i)));
    $('[data-lb-close]').addEventListener('click', close);
    $('[data-lb-next]').addEventListener('click', () => open(idx + 1));
    $('[data-lb-prev]').addEventListener('click', () => open(idx - 1));
    lb.addEventListener('click', e => { if (e.target === lb || e.target === $('.lb__stage')) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') open(idx + 1);
      if (e.key === 'ArrowLeft') open(idx - 1);
    });
  })();

  /* -------------------------------------------------- smooth scroll anchors (fallback + lenis) */
  let lenis = null;

  /* -------------------------------------------------- main init after load */
  function init() {
    const hasGSAP = window.gsap && window.ScrollTrigger;

    // Lenis smooth scroll
    if (window.Lenis && !prefersReduced) {
      lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      if (hasGSAP) { lenis.on('scroll', ScrollTrigger.update); }
    }

    // anchor links
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t, { offset: -70, duration: 1.2 });
        else t.scrollIntoView({ behavior: 'smooth' });
      });
    });

    if (!hasGSAP) { $$('.reveal, .reveal-title, .reveal-line').forEach(el => el.classList.add('is-inview')); return; }

    gsap.registerPlugin(ScrollTrigger);

    // hero intro timeline
    const heroTitles = $$('.hero__title .line > span');
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    gsap.set(heroTitles, { yPercent: 110 });
    gsap.set('.hero__tagline', { opacity: 0, y: 14 });
    gsap.set(['.hero__lead', '.hero__actions', '.hero__stats'], { opacity: 0, y: 24 });
    tl.to('.hero__tagline', { opacity: 1, y: 0, duration: .7 })
      .to(heroTitles, { yPercent: 0, duration: 1.1, stagger: .1 }, '-=.3')
      .to('.hero__lead', { opacity: 1, y: 0, duration: .8 }, '-=.6')
      .to('.hero__actions', { opacity: 1, y: 0, duration: .7 }, '-=.55')
      .to('.hero__stats', { opacity: 1, y: 0, duration: .7 }, '-=.5');

    // hero grid parallax
    gsap.to('.hero__grid', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // count-up stats
    $$('[data-count]').forEach(el => {
      const end = +el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top bottom', once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; } }),
      });
    });

    // generic reveals
    $$('.reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // section titles — line clip reveal
    $$('.reveal-title').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }, {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // work cards stagger
    gsap.utils.toArray('.work__grid .card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: (i % 2) * 0.08,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
      // subtle image parallax inside card
      const im = $('img', card);
      if (im) gsap.to(im, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // expertise cards
    gsap.utils.toArray('.exp__card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: (i % 2) * 0.06,
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
      });
    });

    // marquee loop
    const track = $('[data-marquee]');
    if (track) {
      const w = track.scrollWidth / 2;
      gsap.to(track, { x: -w, duration: 22, ease: 'none', repeat: -1, modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % w) } });
    }

    ScrollTrigger.refresh();
  }

  // boot
  if (prefersReduced) { runLoader(() => {}); $$('.reveal, .reveal-title, .reveal-line').forEach(el => el.classList.add('is-inview')); init(); }
  else { window.addEventListener('load', () => runLoader(init)); }
})();
