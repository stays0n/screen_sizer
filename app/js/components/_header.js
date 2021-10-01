// _header.js start
const header = document.body.querySelector('.header');
const headerWrap = header.querySelector('.header__wrap');
const headerNavigation = header.querySelector('.header__navigation');
const content = document.getElementById('content');
const modal = document.getElementById('modal');

// добавляет/убирает активный класс для блока header
const headerToggleActive = () => {
  if (header.classList.contains('header--active')) {
    header.classList.remove('header--active');
    enableScroll();
  } else {
    header.classList.add('header--active');
    disableScroll();
  }
};

// отключает возможность прокрутки страницы
const disableScroll = () => {
  if (document.disableScroll) return;
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.disableScroll = true;
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
};

// возвращает возможность прокрутки страницы
function enableScroll() {
  document.disableScroll = false;
  document.body.style.cssText = ``;
  window.scroll({
    top: document.body.dbScrollY,
  });
}

// изменяет высоту блока content при изменении размеров области просмотра или высоты header
// размещает содержимое блока content по-центру
function contentResize() {
  content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
}

// если область просмотра меньше по высоте чем высота модального окна, то задаёт
// модальному окну 'flex-start' => позволяя скролить модальное окно
function toggleStickModalToTop() {
  if (modal.children.item('modal__content').offsetHeight >= document.documentElement.clientHeight) {
    modal.style.alignItems = 'flex-start';
  } else {
    modal.style.alignItems = '';
  }
}

// создаёт модальное окно
function renderModal(obj, attr) {
  const modalContent = document.createElement('div');
  modalContent.className = 'modal__content';
  modalContent.innerHTML = obj[attr];
  const modalClose = document.createElement('button');
  modalClose.className = 'modal__burger burger';
  modalClose.type = 'button';
  const modalLine = document.createElement('span');
  modalLine.className = 'burger__line';
  modalContent.append(modalClose);
  modalClose.append(modalLine);

  modal.append(modalContent);
  toggleStickModalToTop();
}

// убирает модальное окно через 200мс, ждёт пока отработает анимация
function removeModal() {
  if (modal.classList.contains('modal--active')) {
    modal.classList.remove('modal--active');
    setTimeout(() => {
      modal.children.item('.modalContent').remove();
    }, 200);
  }
}

window.addEventListener('load', () => {
  contentResize();
});

window.addEventListener('resize', (e) => {
  contentResize();

  if (header.classList.contains('header--active') && e.target.innerWidth > 768) {
    headerToggleActive();
  }

  if (modal.children.item('modal__content')) toggleStickModalToTop();
});

header.addEventListener('click', (e) => {
  const { target } = e;
  if (target.closest('.header__burger') || target.closest('.header__overlay')) {
    headerToggleActive();
  }
  // if (target.closest('.header__link')) headerToggleActive();
  if (
    !header.matches('.header--active') &&
    modal.matches('.modal--active') &&
    window.innerWidth <= 768
  ) {
    // headerToggleActive();
    removeModal();
  }
  // .hasAttribute('data-info')
  if (
    target.closest('.header__link') &&
    target.closest('.header__link').hasAttribute('data-info')
  ) {
    e.preventDefault();
    const headerLinkAttribute = target.closest('.header__link').getAttribute('data-info');
    renderModal(modalData, headerLinkAttribute);
    modal.classList.add('modal--active');
    setTimeout(() => disableScroll(), 200);
  }
});

modal.addEventListener('click', (e) => {
  const { target } = e;
  if (target.closest('.burger') || target.matches('.modal')) {
    removeModal();
    enableScroll();
  }
});

const modalData = {
  pixels: `
  <h3 class="modal__title">Pixels</h3>
    <p>
    It is the smallest unit of a raster image produced by graphics display systems. A pixel is an indivisible rectangular or circular object characterized by a specific color. A computer raster image consists of pixels in rows and columns.
  </p>
  <p>
    The more pixels per unit area an image contains, the more detailed it is. The maximum detail of the raster image is set at its creation and cannot be increased. If the image is zoomed in, the pixels turn into coarse grains. The jaggies can be smoothed by interpolation.
  </p>
  <p>
    The device resolution is determined by the horizontal and vertical dimensions of the displayed image in pixels.
  </p>
    `,
  dpippi: `
  <h3 class="modal__title">DPI/PPI</h3>
  <p>
    The terms Dots Per Inch (DPI) and Pixels Per Inch (PPI) are used to define the resolution of an image. These terms mean more than one thing and the same, and there are significant differences between these two terms:
  </p>
  <ul>
    <li>
      DPI refers to the number of dots contained in one inch of an image printed by a printer on paper.
    </li>
    <li>
      PPI refers to the number of pixels contained in one inch of an image displayed on a computer monitor.
    </li>
  </ul>
  <p>
    Both PPI and DPI are units of measurement used to determine the resolution of an image displayed on screen (PPI) or printed on paper (DPI). If you divide the image size (the total number of pixels of a digital image) by the output resolution, you can determine the size of the image displayed on the screen or printed on paper.
  </p>
  `,
  remem: `
  <h3 class="modal__title">REM/EM</h3>
  <p>
    Rem is the unit of typography used, equal to the root (base) font-size.
  </p>
  <p>
    EM is a relative unit of measurement equal to the root font size in the parent element.
  </p>
  `,
  app: `
  <h3 class="modal__title--green">
    <svg>
      <use xlink:href="images/sprite.svg#android_app"></use>
    </svg>
    <span>Android app</span>
  </h3>
  <a class="modal__link modal__link--accent" href="#">
    Download from AppGallery
  </a>
  <a class="modal__link modal__link--amazon" href="https://www.amazon.com/dp/B09D9TD85J/ref=apps_sf_sta">
    Install from Amazon AppStore
  </a>
  <a class="modal__link" href="./rls/screen_sizer_0.001.apk" download="">
    Install .apk file
  </a>
  <a class="modal__link" href="./policy.html">
    Privacy policy
  </a>
  <span class="modal__ver">
    Ver 0.001
  </span>
  `,
};
// console.log('_header.js');
// _header.js end
