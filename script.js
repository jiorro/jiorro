// Scroll reveal
const sections = document.querySelectorAll('.reveal');

function revealOnScroll() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Toggle info boxes + sound
function toggleInfo(id) {
  const allBoxes = document.querySelectorAll('.info-box');
  const sound = document.getElementById('clickSound');
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  allBoxes.forEach(box => {
    box.style.display = box.id === id
      ? (box.style.display === 'block' ? 'none' : 'block')
      : 'none';
  });
}

// Custom cursor
const cursor = document.getElementById('custom-cursor');
const picker = document.getElementById('colorPicker');

window.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

picker.addEventListener('input', e => {
  const color = e.target.value;
  cursor.style.backgroundColor = color;
  cursor.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
});
