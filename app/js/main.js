const headerTop = document.body.querySelector('.header__top');
const headerMenu = headerTop.querySelector('.header__menu');
const headerNavigation = headerTop.querySelector('.header__navigation');

const headerContent = document.body.querySelector('.header__content');

const modal = document.body.querySelector('.modal');

const dimensionsWidth = document.querySelector('#dimensions_width');
const dimensionsHeight = document.querySelector('#dimensions_height');
const browserName = document.querySelector('#browser_name');
const workSpace = document.querySelector('#work_space');
const pixelRatio = document.querySelector('#pixel_ratio');
const displayBit = document.querySelector('#display_bit');

function headerToggleActive() {
  if (headerTop.classList.contains('header__top--active')) {
    headerTop.classList.remove('header__top--active');
    enableScroll();
  } else {
    headerTop.classList.add('header__top--active');
    disableScroll();
  }
}

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

function enableScroll() {
  document.disableScroll = false;
  document.body.style.cssText = ``;
  window.scroll({
    top: document.body.dbScrollY,
  });
}

function clientResize() {
  // изменяет высоту блока header__content при изменении размеров header__top
  headerContent.style.height = document.documentElement.clientHeight - headerTop.offsetHeight + 'px';
}

function setMenuHeight() {
  if (innerWidth < 769) {
    headerMenu.style.cssText = `
    bottom: -${headerMenu.offsetHeight}px;
    padding-bottom: ${headerNavigation.querySelector('.header__more').offsetHeight + 26}px;
  `;
  } else {
    headerMenu.style = '';
  }
}

function setDimensionsWidth() {
  // dimensionsWidth.textContent = screen.width * devicePixelRatio.toFixed(1);
  dimensionsWidth.textContent = screen.width;
}

function setDimensionsHeight() {
  // dimensionsHeight.textContent = screen.height * devicePixelRatio.toFixed(1);
  dimensionsHeight.textContent = screen.height;
}

function setWorkSpace() {
  workSpace.textContent = `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`;
}

function setPixelRatio() {
  pixelRatio.textContent = devicePixelRatio.toFixed(1);
}

function setDisplayBit() {
  displayBit.textContent = window.screen.pixelDepth;
}

function toggleStickModalToTop() {
  if (modal.children.item('modal__content').offsetHeight >= document.documentElement.clientHeight) {
    modal.style.alignItems = 'flex-start';
  } else {
    modal.style.alignItems = '';
  }
}

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

function removeModal() {
  if (modal.classList.contains('modal--active')) {
    modal.classList.remove('modal--active');
    setTimeout(() => {
      modal.children.item('.modalContent').remove();
    }, 200);
  }
}

let browserNameIndex = '';
if (navigator.userAgent.search(/Safari/) > 0) {
  browserNameIndex = 'Safari';
}
if (navigator.userAgent.search(/Firefox/) > 0) {
  browserNameIndex = 'Firefox';
}
if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {
  browserNameIndex = 'Explorer';
}
if (navigator.userAgent.search(/Chrome/) > 0) {
  browserNameIndex = 'Chrome';
}
if (navigator.userAgent.search(/YaBrowser/) > 0) {
  browserNameIndex = 'Yandex';
}
if (navigator.userAgent.search(/OPR/) > 0) {
  browserNameIndex = 'Opera';
}
if (navigator.userAgent.search(/Konqueror/) > 0) {
  browserNameIndex = 'Konqueror';
}
if (navigator.userAgent.search(/Iceweasel/) > 0) {
  browserNameIndex = 'Iceweasel';
}
if (navigator.userAgent.search(/SeaMonkey/) > 0) {
  browserNameIndex = 'SeaMonkey';
}
if (navigator.userAgent.search(/Edge/) > 0) {
  browserNameIndex = 'Edge';
}
browserName.textContent = browserNameIndex;

window.addEventListener('load', () => {
  clientResize();
  setDimensionsWidth();
  setDimensionsHeight();
  setWorkSpace();
  setPixelRatio();
  setDisplayBit();

  setMenuHeight();
});

window.addEventListener('resize', (e) => {
  clientResize();
  setDimensionsWidth();
  setDimensionsHeight();
  setWorkSpace();
  setPixelRatio();
  setDisplayBit();

  if (headerTop.classList.contains('header__top--active') && e.target.innerWidth > 768) {
    headerToggleActive();
  }

  setMenuHeight();

  if (modal.children.item('modal__content')) toggleStickModalToTop();
});

headerTop.addEventListener('click', (e) => {
  const { target } = e;
  if (target.closest('.header__burger')) headerToggleActive();
  // if (target.closest('.header__link')) headerToggleActive();
  if (!headerTop.matches('.header__top--active') && modal.matches('.modal--active') && window.innerWidth < 768) {
    // headerToggleActive();
    removeModal();
  }
  if (target.closest('.header__overlay')) headerToggleActive();
  if (target.closest('.header__link')) {
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
  <span class="modal__ver">
    Ver 0.001
  </span>
  `,
};
