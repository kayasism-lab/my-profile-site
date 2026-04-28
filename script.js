// 모바일 메뉴 토글
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// 네비게이션 스크롤 효과
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
});

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

document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── 사이드바 ──

// 닫기 버튼
const sidebar = document.getElementById('curriculum-sidebar');
const closeBtn = document.getElementById('sidebar-close-btn');

closeBtn.addEventListener('click', () => {
  sidebar.classList.add('hidden');
});

// 탭 전환
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(c => {
      c.style.display = c.dataset.tab === tab ? 'block' : 'none';
    });
  });
});

// 사이드바 항목 클릭 → 스크롤
document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// 섹션 추적 → 활성 항목 자동 업데이트
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      // "소개" 탭의 섹션 아이템만 추적
      document.querySelectorAll('[data-tab="intro"] .section-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
