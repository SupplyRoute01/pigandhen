const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navLinks = [...navigation.querySelectorAll(':scope > a, :scope > .nav-products > a')];
const productMenu = document.querySelector('[data-product-menu]');
const productMenuTrigger = document.querySelector('[data-product-menu-trigger]');
const mobileViewport = window.matchMedia('(max-width: 760px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setProductMenuOpen = (open) => {
  productMenu.classList.toggle('is-open', open);
  productMenuTrigger.setAttribute('aria-expanded', String(open));
};

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
  navigation.classList.remove('is-open');
  productMenu.classList.add('is-dismissed');
  setProductMenuOpen(false);
  document.body.style.overflow = '';
};

const toggleMenu = () => {
  const opening = menuButton.getAttribute('aria-expanded') === 'false';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('.sr-only').textContent = opening ? '메뉴 닫기' : '메뉴 열기';
  navigation.classList.toggle('is-open', opening);
  document.body.style.overflow = opening ? 'hidden' : '';
  if (!opening) setProductMenuOpen(false);
};

navLinks.forEach((link) => link.addEventListener('click', (event) => {
  if (link === productMenuTrigger && mobileViewport.matches) {
    event.preventDefault();
    productMenu.classList.remove('is-dismissed');
    setProductMenuOpen(!productMenu.classList.contains('is-open'));
    return;
  }
  closeMenu();
}));

productMenu.addEventListener('mouseenter', () => {
  if (mobileViewport.matches) return;
  productMenu.classList.remove('is-dismissed');
  setProductMenuOpen(true);
});
productMenu.addEventListener('mouseleave', () => {
  if (mobileViewport.matches) return;
  productMenu.classList.remove('is-dismissed');
  setProductMenuOpen(false);
});
productMenu.addEventListener('focusin', () => {
  if (!mobileViewport.matches && !productMenu.classList.contains('is-dismissed')) setProductMenuOpen(true);
});
productMenu.addEventListener('focusout', (event) => {
  if (productMenu.contains(event.relatedTarget)) return;
  productMenu.classList.remove('is-dismissed');
  if (!mobileViewport.matches) setProductMenuOpen(false);
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (productMenu.classList.contains('is-open') || productMenu.contains(document.activeElement)) {
    productMenu.classList.add('is-dismissed');
    setProductMenuOpen(false);
    productMenuTrigger.focus();
    return;
  }
  if (navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

mobileViewport.addEventListener('change', () => {
  productMenu.classList.remove('is-dismissed');
  setProductMenuOpen(false);
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
const catalogFilters = [...document.querySelectorAll('[data-catalog-filter]')];
const categoryLinks = [...document.querySelectorAll('[data-product-category]')];
const loadMoreButton = document.querySelector('[data-load-more]');
const catalogStatus = document.querySelector('#catalog-status');
const collectionTitle = document.querySelector('[data-collection-title]');
const productCount = document.querySelector('[data-product-count]');
const catalogPageSize = 24;
const categoryLabels = {
  all: '전체 컬렉션',
  signature: '시그니처 컬렉션',
  rope: '로프 팔찌',
  beads_chain: '비즈 & 체인 팔찌',
  bangle: '뱅글 팔찌',
  women: '여성 팔찌',
  jewelry: '주얼리 & 샤클 컬렉션',
};
let activeCategory = 'all';
let visibleProductCount = Math.min(catalogPageSize, catalogItems.length);

const getActiveCatalogItems = () => {
  const matchedItems = catalogItems.filter((item) => (
    activeCategory === 'all' || item.dataset.categories.split(' ').includes(activeCategory)
  ));
  if (activeCategory === 'all' || activeCategory === 'signature') return matchedItems;
  return matchedItems.sort((a, b) => Number(b.dataset.signature === 'true') - Number(a.dataset.signature === 'true'));
};

const updateCatalog = () => {
  const activeItems = getActiveCatalogItems();
  catalogItems.forEach((item) => {
    const activeIndex = activeItems.indexOf(item);
    item.style.order = activeIndex;
    item.hidden = activeIndex < 0 || activeIndex >= visibleProductCount;
  });

  const shownCount = Math.min(visibleProductCount, activeItems.length);
  const complete = shownCount >= activeItems.length;
  collectionTitle.textContent = categoryLabels[activeCategory];
  productCount.textContent = `${activeItems.length} PRODUCTS`;
  catalogStatus.textContent = complete
    ? `전체 ${activeItems.length}개 상품을 표시했습니다.`
    : `${shownCount}개 표시 중 · 전체 ${activeItems.length}개`;
  loadMoreButton.hidden = complete;
  if (!complete) {
    const nextCount = Math.min(catalogPageSize, activeItems.length - shownCount);
    loadMoreButton.querySelector('span').textContent = `+${nextCount}`;
  }
  catalogFilters.forEach((button) => {
    const selected = button.dataset.catalogFilter === activeCategory;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
};

const selectProductCategory = (category) => {
  if (!(category in categoryLabels)) return;
  activeCategory = category;
  visibleProductCount = catalogPageSize;
  updateCatalog();
};

categoryLinks.forEach((link) => link.addEventListener('click', () => {
  selectProductCategory(link.dataset.productCategory);
  if (navigation.contains(link)) closeMenu();
}));

const showMoreProducts = () => {
  visibleProductCount = Math.min(visibleProductCount + catalogPageSize, getActiveCatalogItems().length);
  updateCatalog();
};

updateCatalog();

window.toggleMenu = toggleMenu;
window.selectProductCategory = selectProductCategory;
window.showMoreProducts = showMoreProducts;

document.querySelector('[data-year]').textContent = new Date().getFullYear();
