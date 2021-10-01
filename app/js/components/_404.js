// _404.js start
const page404Wrapper = document.querySelector('.page404__wrapper');

const toggleStickContentToTop = () => {
  if (page404Wrapper.offsetHeight + 200 > window.innerHeight) {
    page404Wrapper.closest('.page404').style.alignItems = 'flex-start';
  } else {
    page404Wrapper.closest('.page404').style.alignItems = '';
  }
};

window.addEventListener('load', () => {
  toggleStickContentToTop();
});

window.addEventListener('resize', () => {
  toggleStickContentToTop();
});

setTimeout(() => {
  window.location.replace('index.html');
}, 8000);

// console.log('_404.js');
// _404.js end
