// 모바일 메뉴 토글
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// 히어로 하단 통과 시 네비 라이트 스타일
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

function syncNavbarTheme() {
  if (!heroSection) return;
  const pastHero = heroSection.getBoundingClientRect().bottom < 72;
  navbar.classList.toggle('nav-scrolled', pastHero);
}

window.addEventListener('scroll', syncNavbarTheme, { passive: true });
syncNavbarTheme();

// 스크롤 스파이: 좌측 네비 활성 링크
const navLinks = document.querySelectorAll('.nav-link');

function updateNavActive() {
  const sections = [
    { id: 'hero', match: (href) => href === '#about' },
    { id: 'about', match: (href) => href === '#about' },
    { id: 'skills', match: (href) => href === '#skills' },
    { id: 'projects', match: (href) => href === '#projects' },
  ];

  const scrollY = window.scrollY + 120;
  let activeId = 'hero';

  ['hero', 'about', 'skills', 'projects', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) activeId = id;
  });

  if (activeId === 'contact') {
    navLinks.forEach((link) => link.classList.remove('active'));
    return;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const sec = sections.find((s) => s.id === activeId);
    const on = sec ? sec.match(href) : false;
    link.classList.toggle('active', on);
  });
}

window.addEventListener('scroll', updateNavActive, { passive: true });
window.addEventListener('resize', updateNavActive, { passive: true });
updateNavActive();

// 스크롤 페이드인 (IntersectionObserver)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-item').forEach((el) => observer.observe(el));

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 사이드바 ──
const sidebar = document.getElementById('curriculum-sidebar');
const closeBtn = document.getElementById('sidebar-close-btn');

closeBtn.addEventListener('click', () => {
  sidebar.classList.add('hidden');
});

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach((c) => {
      c.style.display = c.dataset.tab === tab ? 'block' : 'none';
    });
  });
});

document.querySelectorAll('.section-item').forEach((item) => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('[data-tab="intro"] .section-item').forEach((item) => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));
