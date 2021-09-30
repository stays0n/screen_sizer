// _resolutions.js start
const resolutionsWrapper = document.body.querySelector('.resolutions__wrapper');
const resolutionsButtons = resolutionsWrapper.querySelectorAll('.resolutions__button');
const resolutionsTable = document.getElementById('resolutions_table');
const resolutionsData = {
  android: [
    { device: 'Google Pixel XL', resolution: '1440 x 2560' },
    { device: 'Google Pixel 2', resolution: '1080 x 1920' },
    { device: 'Google Pixel 2 XL', resolution: '1440 x 2880' },
    { device: 'Google Pixel 3', resolution: '1080 x 2160' },
    { device: 'Google Pixel 3a', resolution: '1080 x 2220' },
    { device: 'Google Pixel 3 XL', resolution: '1440 x 2960' },
    { device: 'Google Pixel 4a', resolution: '1080 x 2280' },
    { device: 'Google Pixel 5', resolution: '1080 x 2340' },
    { device: 'Google Pixel 5a', resolution: '1080 x 2400' },
  ],
  apple: [
    { device: 'iPhone 3GS', resolution: '320 × 480' },
    { device: 'iPhone 4S', resolution: '640 × 960' },
    { device: 'iPhone 8', resolution: '750 × 1334' },
    { device: 'iPhone 8 Plus', resolution: '1080 × 1920' },
    { device: 'iPhone SE', resolution: '640 × 1136' },
    { device: 'iPhone X', resolution: '1125 × 2436' },
    { device: 'iPhone XR', resolution: '828 × 1792' },
    { device: 'iPhone 11 Pro', resolution: '1125 × 2436' },
    { device: 'iPhone 11 Pro Max', resolution: '1242 × 2688' },
    { device: 'iPhone 12 mini', resolution: '1080 × 2340' },
    { device: 'iPhone 12 Pro', resolution: '1170 × 2532' },
    { device: 'iPhone 12 Pro Max', resolution: '1284 × 2778' },
  ],
};

const toggleHeightResolutionsWrapper = () => {
  if (resolutionsWrapper.offsetHeight + 100 > window.innerHeight) {
    resolutionsWrapper.closest('.resolutions').style.alignItems = 'flex-start';

  } else {
    resolutionsWrapper.closest('.resolutions').style.alignItems = '';
  }
};

// table: [тег table, туда будет рендер],
// data: [данные из resolutionsData],
// attr: [атрибут для поиска по data; например apple или android]
const renderTBody = (table, data, attr) => {
  const tbody = document.createElement('tbody');
  tbody.className = 'resolutions__tbody';
  const tableContent = data[attr].map((item) => {
    const tr = document.createElement('tr');
    const device = document.createElement('td');
    device.textContent = item.device + ':';
    const resolution = document.createElement('td');
    resolution.textContent = item.resolution;
    tr.append(device, resolution);
    return tr;
  });
  tableContent.forEach((item) => {
    tbody.append(item);
  });

  table.append(tbody);
};

// очищает контент в table
const removeTBody = (table) => {
  table.textContent = '';
};

for (let btn of resolutionsButtons) {
  btn.addEventListener('click', () => {
    resolutionsButtons.forEach((item) => {
      item.classList.remove('resolutions__button--active');
    });
    btn.classList.add('resolutions__button--active');

    const btnAttr = btn.getAttribute('data-device');
    removeTBody(resolutionsTable);
    renderTBody(resolutionsTable, resolutionsData, btnAttr);
  });
}

window.addEventListener('load', () => {
  renderTBody(resolutionsTable, resolutionsData, Object.keys(resolutionsData)[0]);
  toggleHeightResolutionsWrapper();
});

window.addEventListener('resize', (e) => {
  toggleHeightResolutionsWrapper();
  if (window.innerWidth > 768) {
  }

  // contentResize();
  // if (header.classList.contains('header--active') && e.target.innerWidth > 768) {
  //   headerToggleActive();
  // }
  // if (modal.children.item('modal__content')) toggleStickModalToTop();
});

console.log('_resolutions.js');
// _resolutions.js ens
