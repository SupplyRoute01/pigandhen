const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navLinks = [...navigation.querySelectorAll('a')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
  navigation.classList.remove('is-open');
  document.body.style.overflow = '';
};

const toggleMenu = () => {
  const opening = menuButton.getAttribute('aria-expanded') === 'false';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('.sr-only').textContent = opening ? '메뉴 닫기' : '메뉴 열기';
  navigation.classList.toggle('is-open', opening);
  document.body.style.overflow = opening ? 'hidden' : '';
};

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.toggleAttribute('aria-current', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const catalogItems = [...document.querySelectorAll('.catalog-item')];
const loadMoreButton = document.querySelector('[data-load-more]');
const catalogStatus = document.querySelector('#catalog-status');
const catalogPageSize = 24;
let visibleProductCount = Math.min(catalogPageSize, catalogItems.length);

const updateCatalog = () => {
  catalogItems.forEach((item, index) => { item.hidden = index >= visibleProductCount; });
  const complete = visibleProductCount >= catalogItems.length;
  catalogStatus.textContent = complete
    ? `전체 ${catalogItems.length}개 상품을 표시했습니다.`
    : `${visibleProductCount}개 표시 중 · 전체 ${catalogItems.length}개`;
  loadMoreButton.hidden = complete;
  if (!complete) {
    const nextCount = Math.min(catalogPageSize, catalogItems.length - visibleProductCount);
    loadMoreButton.querySelector('span').textContent = `+${nextCount}`;
  }
};

const showMoreProducts = () => {
  visibleProductCount = Math.min(visibleProductCount + catalogPageSize, catalogItems.length);
  updateCatalog();
};

updateCatalog();

window.toggleMenu = toggleMenu;
window.showMoreProducts = showMoreProducts;

document.querySelector('[data-year]').textContent = new Date().getFullYear();
