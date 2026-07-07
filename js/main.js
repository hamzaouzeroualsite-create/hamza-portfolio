/**
 * Hamza Ouzeroual Portfolio — Main JavaScript
 */

(function () {
  'use strict';

  const THEME_KEY = 'hamza-portfolio-theme';

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColor(theme);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
      updateThemeColor(next);
    });
  }

  function updateThemeColor(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#fafafa');
    }
  }

  /* ---------- Navigation ---------- */
  function initNavigation() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = menu.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- Scroll Reveal ---------- */
  let revealObserver = null;

  function initReveal() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
    }

    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /* ---------- Skills Grid ---------- */
  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid || typeof skills === 'undefined') return;

    grid.innerHTML = skills
      .map(
        (skill) => `
        <div class="skill-card reveal" style="--level: ${skill.percent}%">
          <span class="skill-card__icon" aria-hidden="true">${skill.icon}</span>
          <span class="skill-card__name">${skill.name}</span>
          <span class="skill-card__level">${skill.level} · ${skill.percent}%</span>
          <span class="skill-card__bar"><span class="skill-card__bar-fill"></span></span>
        </div>`
      )
      .join('');
  }

  /* ---------- Projects Grid ---------- */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid || typeof projects === 'undefined') return;

    grid.innerHTML = projects
      .map(
        (project) => `
        <article class="project-card reveal">
          <div class="project-card__image">
            <img src="${project.image}" alt="${project.title} preview" loading="lazy" width="400" height="250">
            <div class="project-card__overlay"></div>
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tags">
              ${project.technologies.map((tech) => `<span class="project-card__tag">${tech}</span>`).join('')}
            </div>
            <div class="project-card__actions">
              <a href="${project.demoUrl}" class="btn btn--primary btn--small" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
              <a href="${project.githubUrl}" class="btn btn--ghost btn--small" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </article>`
      )
      .join('');
  }

  /* ---------- Footer Year ---------- */
  function initFooter() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Rotating Hero Roles ---------- */
  function initRoleRotator() {
    const container = document.getElementById('heroRoles');
    if (!container) return;

    const roles = [
      'Flutter Developer',
      'Mobile App Builder',
      'UI/UX Enthusiast',
      'Problem Solver',
    ];
    let index = 0;
    const el = container.querySelector('.hero__role');
    if (!el) return;

    setInterval(() => {
      index = (index + 1) % roles.length;
      el.classList.remove('is-active');
      window.setTimeout(() => {
        el.textContent = roles[index];
        el.classList.add('is-active');
      }, 350);
    }, 2600);
  }

  /* ---------- Animated Counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      if (prefersReduced) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ---------- Scroll Progress + Back to Top ---------- */
  function initScrollUI() {
    const bar = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ---------- Card Cursor Spotlight ---------- */
  function initSpotlight() {
    const selector = '.info-card, .skill-card, .project-card, .contact-card';
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest(selector);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  }

  /* ---------- 3D Tilt ---------- */
  function initTilt() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    /* Interactive tilt for content cards */
    const cardSelector = '.info-card, .skill-card, .project-card, .contact-card';
    const MAX = 9;
    let activeCard = null;

    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest(cardSelector);
      if (card !== activeCard) {
        if (activeCard) resetCard(activeCard);
        activeCard = card;
      }
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * 2 * MAX;
      const rx = -(py - 0.5) * 2 * MAX;
      card.style.transition = 'transform 0s';
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    });

    function resetCard(card) {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    /* Parallax tilt for hero profile card */
    const profile = document.querySelector('.profile-card');
    if (profile) {
      const wrap = profile.closest('.hero__visual') || profile;
      wrap.addEventListener('pointermove', (e) => {
        const rect = profile.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * 2 * 12;
        const rx = -(py - 0.5) * 2 * 12;
        profile.style.transition = 'transform 0s';
        profile.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      wrap.addEventListener('pointerleave', () => {
        profile.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        profile.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    renderSkills();
    renderProjects();
    initReveal();
    initFooter();
    initRoleRotator();
    initCounters();
    initScrollUI();
    initSpotlight();
    initTilt();
  });
})();
