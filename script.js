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

// Toggle info boxes + click sound (volume abbassato)
function toggleInfo(id) {
  const allBoxes = document.querySelectorAll('.info-box');
  const sound = document.getElementById('clickSound');
  if (sound) {
    sound.volume = 0.2; // 🔉 volume ridotto
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

// 🎵 Jiorro Soundpack controller con mute e volume
const musicTracks = [
  document.getElementById('track1'),
  document.getElementById('track2'),
  document.getElementById('track3')
];

let currentTrack = 0;
let isMuted = false;
let musicStarted = false;

// Imposta volume iniziale e prepara le tracce
musicTracks.forEach(track => {
  track.volume = 0.3;
  track.pause();
});

// Avvia musica al primo click
document.body.addEventListener('click', () => {
  if (!musicStarted) {
    musicTracks[currentTrack].play();
    musicStarted = true;
  }
});

// Cambio traccia ogni 90 secondi
setInterval(() => {
  if (musicStarted) {
    musicTracks[currentTrack].pause();
    currentTrack = (currentTrack + 1) % musicTracks.length;
    musicTracks[currentTrack].play();
  }
}, 90000);

// 🎚️ Controlli volume e mute
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  musicTracks.forEach(track => (track.muted = isMuted));
  muteBtn.textContent = isMuted ? '🔈 Audio' : '🔇 Muto';
});

volumeSlider.addEventListener('input', e => {
  const vol = parseFloat(e.target.value);
  musicTracks.forEach(track => {
    track.volume = vol;
    track.muted = false;
  });
});
