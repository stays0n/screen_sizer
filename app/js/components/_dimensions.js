// _dimensions.js start
const dimensionsWidth = document.getElementById('dimensions_width');
const dimensionsHeight = document.getElementById('dimensions_height');
const browserName = document.getElementById('browser_name');
const workSpace = document.getElementById('work_space');
const pixelRatio = document.getElementById('pixel_ratio');
const displayBit = document.getElementById('display_bit');

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

let browserNameIndex = '';
if (navigator.userAgent.search(/Safari/) > -1) {
  browserNameIndex = 'Safari';
}
if (navigator.userAgent.search(/Firefox/) > -1) {
  browserNameIndex = 'Firefox';
}
if (navigator.userAgent.search(/MSIE/) > -1 || navigator.userAgent.search(/NET CLR /) > -1) {
  browserNameIndex = 'Explorer';
}
if (navigator.userAgent.search(/Chrome/) > -1) {
  browserNameIndex = 'Chrome';
}
if (navigator.userAgent.search(/YaBrowser/) > -1) {
  browserNameIndex = 'Yandex';
}
if (navigator.userAgent.search(/OPR/) > -1) {
  browserNameIndex = 'Opera';
}
if (navigator.userAgent.search(/Konqueror/) > -1) {
  browserNameIndex = 'Konqueror';
}
if (navigator.userAgent.search(/SamsungBrowser/) > -1) {
  browserNameIndex = 'Samsung Browser';
}
if (navigator.userAgent.search(/Edg/) > -1) {
  browserNameIndex = 'Edge';
}
if (navigator.userAgent.search(/Iceweasel/) > -1) {
  browserNameIndex = 'Iceweasel';
}
if (navigator.userAgent.search(/SeaMonkey/) > -1) {
  browserNameIndex = 'SeaMonkey';
}
browserName.textContent = browserNameIndex;

window.addEventListener('load', () => {
  setDimensionsWidth();
  setDimensionsHeight();
  setWorkSpace();
  setPixelRatio();
  setDisplayBit();
});

window.addEventListener('resize', () => {
  setDimensionsWidth();
  setDimensionsHeight();
  setWorkSpace();
  setPixelRatio();
  setDisplayBit();
});

console.log('_dimensions.js');
// _dimensions.js end