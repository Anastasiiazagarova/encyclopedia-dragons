const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const mapWrapper = document.getElementById('map-wrapper');
const mapContainer = document.getElementById('map-container');
const dragonMarkers = document.querySelectorAll('.dragon-marker');
const dragonInfo = document.getElementById('dragon-info');
const dragonName = document.getElementById('dragon-name');
const dragonDescription = document.getElementById('dragon-description');
const closeBtn = document.querySelector('.close-btn');

function showClouds(callback) {
  const clouds = document.getElementById('clouds');
  clouds.style.display = 'block';
  setTimeout(() => {
    clouds.style.display = 'none';
    if (callback) callback();
  }, 2000);
}

startButton.addEventListener('click', () => {
  showClouds(() => {
    startScreen.style.display = 'none';
    mapWrapper.style.display = 'block';
  });
});

let scale = 1;
mapWrapper.addEventListener('wheel', (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(0.5, scale), 3);
  mapContainer.style.transform = `scale(${scale})`;
  dragonMarkers.forEach(marker => {
    const newSize = scale < 1 ? 80 / scale : 80;
    marker.style.width = `${newSize}px`;
    marker.style.height = `${newSize}px`;
  });
});

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

mapWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
});

mapWrapper.addEventListener('mouseup', () => {
  isDragging = false;
});

mapWrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  mapContainer.style.left = `${currentX}px`;
  mapContainer.style.top = `${currentY}px`;
});

dragonMarkers.forEach(marker => {
  marker.addEventListener('click', () => {
    const name = marker.getAttribute('data-name');
    const desc = marker.getAttribute('data-description');
    dragonName.textContent = name;
    dragonDescription.textContent = desc;
    dragonInfo.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  dragonInfo.style.display = 'none';
});

function filterDragons(type) {
  const dragons = document.querySelectorAll('.dragon-marker');
  dragons.forEach(d => {
    if (type === 'all' || d.getAttribute('data-name').toLowerCase().includes(type)) {
      d.style.display = 'block';
    } else {
      d.style.display = 'none';
    }
  });
}
