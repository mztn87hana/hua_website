// select placeholder color (grays out until a real option is chosen)
document.querySelectorAll('.form-group select').forEach(select => {
  const updateState = () => select.classList.toggle('placeholder-active', select.value === '');
  updateState();
  select.addEventListener('change', updateState);
});

// hamburger drawer
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
const navBackdrop = document.getElementById('nav-backdrop');
const closeBtn = document.getElementById('close-btn');

function openDrawer() {
  navMobile.classList.add('open');
  navBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navMobile.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && navMobile && closeBtn) {
  hamburger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  navBackdrop.addEventListener('click', closeDrawer);
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// service dropdown
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const trigger = dropdown.querySelector('.nav-trigger');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
  });
});

// accordion (FAQ)
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// past works modal (front/side swipe pairs)
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');
const pairItems = document.querySelectorAll('.pair-item');

if (modal && pairItems.length) {
  let images = [];
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    modalImg.src = images[currentIndex];
  }

  function openModal(item) {
    images = [item.dataset.front, item.dataset.side];
    showImage(0);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  pairItems.forEach(item => item.addEventListener('click', () => openModal(item)));
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.getElementById('modal-prev')?.addEventListener('click', () => showImage(currentIndex - 1));
  document.getElementById('modal-next')?.addEventListener('click', () => showImage(currentIndex + 1));

  let touchStartX = null;
  const modalContent = modal.querySelector('.modal-content');
  modalContent.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  modalContent.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta < -40) showImage(currentIndex + 1);
    else if (delta > 40) showImage(currentIndex - 1);
    touchStartX = null;
  });
}

// product modal (KNIT ITEMS)
const productModal = document.getElementById('product-modal');
const productCards = document.querySelectorAll('.knit-card');

if (productModal && productCards.length) {
  const imgWrap = document.getElementById('product-modal-img-wrap');
  const nameEl = document.getElementById('product-modal-name');
  const priceEl = document.getElementById('product-modal-price');
  const descEl = document.getElementById('product-modal-desc');
  const materialEl = document.getElementById('product-modal-material');
  const sizeEl = document.getElementById('product-modal-size');
  const colorEl = document.getElementById('product-modal-color');
  const orderNoteEl = document.getElementById('product-modal-order-note');
  const buyBtn = document.getElementById('product-modal-buy');
  const closeBtn2 = document.getElementById('product-modal-close');

  function openProductModal(card) {
    const img = card.dataset.img;
    imgWrap.innerHTML = img
      ? `<img src="${img}" alt="${card.dataset.name}">`
      : `<div class="img-placeholder">coming soon...</div>`;

    nameEl.textContent = card.dataset.name;

    const isSold = card.dataset.sold === 'true';
    priceEl.textContent = isSold ? 'SOLD' : card.dataset.price;
    priceEl.classList.toggle('sold', isSold);

    descEl.textContent = card.dataset.desc || '';
    materialEl.textContent = card.dataset.material || '';
    sizeEl.textContent = card.dataset.size || '';
    colorEl.textContent = card.dataset.color || '';

    orderNoteEl.textContent = `ご注文希望の"${card.dataset.name}"を、インスタグラムDMでお送りください`;
    orderNoteEl.style.display = isSold ? 'none' : 'block';
    buyBtn.style.display = isSold ? 'none' : 'inline-block';

    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    productModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  productCards.forEach(card => card.addEventListener('click', () => openProductModal(card)));
  closeBtn2.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', e => { if (e.target === productModal) closeProductModal(); });
}

// works grid photo modal (COSTUME/GIFT/MEMORY WORKS sections)
const worksModal = document.getElementById('works-modal');

if (worksModal) {
  const worksModalImg = document.getElementById('works-modal-img');
  const worksModalClose = document.getElementById('works-modal-close');
  const worksImgs = [...document.querySelectorAll('.work-thumb img')];
  let worksIndex = 0;

  function showWorksImage(i) {
    worksIndex = (i + worksImgs.length) % worksImgs.length;
    worksModalImg.src = worksImgs[worksIndex].src;
  }

  function openWorksModal(i) {
    showWorksImage(i);
    worksModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeWorksModal() {
    worksModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  worksImgs.forEach((img, i) => img.closest('.work-thumb').addEventListener('click', () => openWorksModal(i)));
  worksModalClose.addEventListener('click', closeWorksModal);
  worksModal.addEventListener('click', e => { if (e.target === worksModal) closeWorksModal(); });
  document.getElementById('works-modal-prev')?.addEventListener('click', () => showWorksImage(worksIndex - 1));
  document.getElementById('works-modal-next')?.addEventListener('click', () => showWorksImage(worksIndex + 1));
}
